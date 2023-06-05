import  {Block} from "./block"
import { GENEIS_DATA } from "./config"
import { cryptoHash } from "./crypto-hash"

describe('Block',()=>{
    const timestamp = 'a-date'
    const lastHash = 'foo-hash'
    const hash = 'bar-hash'
    const data = ['blockchain','data']
 
    const block = new Block({timestamp,lastHash,hash,data})
    it('has as timestamp, lastHash, hash, and data property',()=>{
        expect(block.timestamp).toEqual(timestamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.hash).toEqual(hash)
        expect(block.data).toEqual(data)
    })
    describe('genesis()',()=>{
        const genesisBlock = Block.genesis()
        it('returns a Block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true)
        })
        it('returns the genesis data',()=>{
            expect(genesisBlock).toEqual(GENEIS_DATA)
        })
    })
    describe('mineBlock',()=>{
        const lastBlock = Block.genesis()
        const data = 'mined block'
        const mineBlock = Block.mineBlock({lastBlock,data})
        it('returns a Block instance',()=>{
            expect(mineBlock instanceof Block).toBe(true)
        })
        it('set the lastHash to be the hash of the lastBlock',()=>{
            expect(mineBlock.lastHash).toEqual(lastBlock.hash)
        })
        it('set the data',()=>{
            expect(mineBlock.data).toEqual(data)
        })
        it('set a timestamp',()=>{
            expect(mineBlock.timestamp).not.toEqual(undefined)
        })
        it('creates a SHA-256 hash based on the proper inputs',()=>{
            expect(mineBlock.hash).toEqual(cryptoHash(mineBlock.timestamp,lastBlock.hash,data))
        })
    })
    

})