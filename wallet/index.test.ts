import {Wallet} from './index'
import {verifySignature} from '../util/index'
import { Transaction } from './transaction'
describe('Wallet',()=>{
    let wallet:any
    beforeEach(()=>{
        wallet = new Wallet
    })
    it('has a balance',()=>{
        expect(wallet).toHaveProperty('balance')
    })
    it('has a publicKey',()=>{
        expect(wallet).toHaveProperty('publicKey')
    })
    describe('signing data',()=>{
        const data = 'foobar'
        it('verifies a signature',()=>{
            expect(verifySignature({
                publicKey:wallet.publicKey,
                data,
                signature:wallet.sign(data)
            })).toBe(true)
        })
        it('dont verifies a signature',()=>{
            expect(verifySignature({
                publicKey:wallet.publicKey,
                data,
                signature: new Wallet().sign(data)
            })).toBe(false)
        })
    })
    describe( 'createTransaction()',()=>{
        describe('and the amount exceeds the balance',()=>{
            it('throws an error',()=>{
                expect(()=>wallet.createTransaction({amount:99999,recipient:"foo-recipient"}))
                    .toThrow('Amount exceeds balance')
            })
        })
        describe('and the amount valid',()=>{
            let transaction:any,amount:any,recipient:any
            beforeEach(()=>{
                amount = 50
                recipient = 'foo-recipient'
                transaction = wallet.createTransaction({amount,recipient })
            })
            it('creates an instance of Transaction',()=>{
                expect(transaction instanceof Transaction).toBe(true)
            })
            it('matches the transaction input with the wallet',()=>{
                expect(transaction.input.address).toEqual(wallet.publicKey)
            })
            it('outputs the amount tyhe recipient',()=>{
                expect(transaction.outputMap[recipient]).toEqual(amount)
            })
        })
    })

}
)