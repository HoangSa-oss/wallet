import {Transaction} from './transaction'
import { Wallet } from './index'
import { verify } from 'crypto'
import { verifySignature } from '../util'
describe('Transaction',()=>{
    let transaction:any,senderWallet:any,recipient:any,amount:any
    beforeEach(()=>{
        senderWallet = new Wallet()
        recipient =  'recipient-public-key'
        amount = 50
        transaction = new Transaction({senderWallet,recipient,amount})
    })
    it('has an id',()=>{
        expect(transaction).toHaveProperty('id')
    })
    describe('outputMap',()=>{
        it('has an id',()=>{
            expect(transaction).toHaveProperty('outputMap')
        })
        it('has an id2',()=>{
            expect(transaction.outputMap[recipient]).toEqual(amount)
        })
        it('has an id3',()=>{
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance-amount)
        })
    })
    describe('input',()=>{
        it('has an input',()=>{
            expect(transaction).toHaveProperty('input')
        })
        it('has a timestamp in the input',()=>{
            expect(transaction.input).toHaveProperty
        })
        it('sets the amount to the senderWallet balance',()=>{
            expect(transaction.input.amount).toEqual(senderWallet.balance)
        })
        it('set the address to the senderWallet publicKey',()=>{
            expect(transaction.input.address).toEqual(senderWallet.publicKey)
        })
        it('sign the input',()=>{
            expect(verifySignature({
                publicKey:senderWallet.publicKey,
                data:transaction.outputMap,
                signature:transaction.input.signature
            })).toBe(true)
        })
    })
    describe('validTransaction(',()=>{
        let errorMock:any
        beforeEach(()=>{
            errorMock = jest.fn()
            global.console.log = errorMock
        })
        describe('when the transction is valid',()=>{
            it('return true',()=>{
                expect(Transaction.validTransaction(transaction)).toBe(true)
            })
        })
        describe('when the transction is invalid',()=>{
            describe('and a transction outputMap invalid',()=>{
                it('return false',()=>{
                    transaction.outputMap[senderWallet.publicKey] = 9999
                    expect(Transaction.validTransaction(transaction)).toBe(false)
                    expect(errorMock).toHaveBeenCalled()
                })
            })
            describe('and a transction input signature is invalid',()=>{
                it('return false',()=>{
                    transaction.input.signature = new Wallet().sign('data')
                    expect(Transaction.validTransaction(transaction)).toBe(false)
                })
            })  
        })
        describe('update()',()=>{
            let originalSignature:any,originalSenderOutput:any,nextRecipient:any,nextAmount:any
            beforeEach(()=>{
                originalSignature = transaction.input.signature
                originalSenderOutput = transaction.outputMap[senderWallet.publicKey]
                nextRecipient = 'next-recipient'
                nextAmount = 50
                transaction.update({senderWallet,recipient:nextRecipient,amount:nextAmount})
            })
            it('output the amount to the next recipient',()=>{
                expect(transaction.outputMap[nextRecipient]).toEqual(nextAmount)
            })
            it('subtracts the amount from the original sender output amount',()=>{
                expect(transaction.outputMap [senderWallet.publicKey]).toEqual(originalSenderOutput - nextAmount)
            })
            it('maintains a total output that matches the input amount',()=>{
                expect(Object.values(transaction.outputMap)
                    .reduce((total:any,outputAmount:any)=>total+outputAmount)).toEqual(transaction.input.amount)
            })
            it('re-signs the transaction',()=>{
                expect(transaction.input.signature).not.toEqual(originalSignature)
            })

        })
    })
    
})