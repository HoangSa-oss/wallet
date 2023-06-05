import Blockchain from './blockchain'
import { Block } from './block'

describe('Blockchain',()=>{
const blockchain = new BlockChain()
    it('contains a chain Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })
    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0].toEqual(Block.genesis()))
    })
    it('adds a new blocl to the chain',()=>{
        const newData = 'foo bar'
        blockchain.addBlock({data:newData})
        expect(blockchain.chain[blockchain.chain.length-1]).toEqual(newData)
    })
    describe('isValidChain()',()=>{
        describe('when the cahin does not start with the genesis block',()=>{
            it('return false',()=>{
                blockchain.chain[0] = {data:'fake-genesis'}
                expect(blockchain.isValidChain(blockchain.chian)).toBe(false)
            })
        })
        describe('when the chain starts waith the genesios block and has multiple',()=>{
            describe('and a lastHash refrence has changed',()=>{
                it('returns false',()=>{

                })
            })
            describe('and the chain contains a block with a invalid field',()=>{
                it('returns false',()=>{
                    
                })
            })
            describe('and the chain does not contain any invalid bocks',()=>{
                it('returns true',()=>{
                    
                })
            })
        })
    })
    
})