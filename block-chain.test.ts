import {Blockchain} from './block-chain'
import { Block } from './block'
import { cryptoHash } from './crypto-hash';

describe('Blockchain',()=>{
    let blockchain:any, newChain: Blockchain, originalChain: any, errorMock;
    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain
    });

    it('contains a chain Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true)    
    })
    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })
    it('adds a new blocl to the chain',()=>{
        const newData = 'foo bar'
        blockchain.addBlock({data:newData})
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData)
    })
    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
          it('returns false', () => {
            blockchain.chain[0] = { data: 'fake-genesis' };
    
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });
    })
    describe('when the chain starts with the genesis block and has multiple blocks', () => {
        beforeEach(() => {
          blockchain.addBlock({ data: 'Bears' });
          blockchain.addBlock({ data: 'Beets' });
          blockchain.addBlock({ data: 'Battlestar Galactica' });
        });
  
        describe('and a lastHash reference has changed', () => {
          it('returns false', () => {
            blockchain.chain[2].lastHash = 'broken-lastHash';
  
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });
  
        describe('and the chain contains a block with an invalid field', () => {
          it('returns false', () => {
            blockchain.chain[2].data = 'some-bad-and-evil-data';
  
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
          });
        });
        describe('and the chain contains a block with a jump difficulty',()=>{
            it('return false',()=>{
                const lastBlock = blockchain.chain[blockchain.chain.length-1]
                const lastHash = lastBlock.hash
                const timestamp = Date.now()
                const nonce = 0
                const data: any[] = []
                const difficulty = lastBlock.difficulty-3
                const hash = cryptoHash(timestamp,lastHash,difficulty,nonce,data)
                const badBlock = new Block({
                    timestamp,lastHash,hash,nonce,difficulty,data
                })
                blockchain.chain.push(badBlock)
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })
      })
      describe('replaceChain()',()=>{
            let errorMock: jest.Mock<any, any, any>,logMock: jest.Mock<any, any, any>
            beforeEach(()=>{
                errorMock = jest.fn()
                logMock = jest.fn()
                global.console.error = errorMock
                global.console.log = logMock
            })
            describe('when the new chain is not longer',()=>{
                beforeEach(()=>{
                    newChain.chain[0] = {new:'chain'}
                    blockchain.replaceChain(newChain.chain)
                })
                it('does not replace the chain',()=>{
                    expect(blockchain.chain).toEqual(originalChain)
                })
                it('logs an error',()=>{
                    expect(logMock).toHaveBeenCalled()
                })
            })
            describe('when the new chain is longer',()=>{
                beforeEach(() => {
                    newChain.addBlock({ data: 'Bears' });
                    newChain.addBlock({ data: 'Beets' });
                    newChain.addBlock({ data: 'Battlestar Galactica' });
                });
                describe('and the chain is invalid',()=>{
                    beforeEach(()=>{
                        newChain.chain[2].hash = 'some-fake-hash'
                        blockchain.replaceChain(newChain.chain)
                    })
                    it('does not replace the chain',()=>{
                        expect(blockchain.chain).toEqual(originalChain)
                    })
                    it('logs an error',()=>{
                        expect(logMock).toHaveBeenCalled()
                    })
                })
              
                describe('and the chain is valid',()=>{
                    beforeEach(()=>{
                        blockchain.replaceChain(newChain.chain)
                    })
                    it('replace the chain',()=>{
                     
                        expect(blockchain.chain).toEqual(newChain.chain)
              
                    })
                    it('logs an replace chain',()=>{
                        expect(logMock).toHaveBeenCalled()
                    })
                })
            })
      })
    

    
})