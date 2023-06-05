import { GENEIS_DATA, MINE_RATE } from "./config"
import { cryptoHash } from "./crypto-hash"

interface IBlock {
    timestamp :any
    lastHash :string
    hash? :string
    nonce:any,
    difficulty:any,
    data :any[]
}
class Block implements IBlock{
    timestamp: any
    lastHash: string
    hash?: string
    data: any[]
    nonce: any
    difficulty: any
    constructor({timestamp,lastHash,hash,data,nonce,difficulty}:IBlock){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty
    }

    static genesis(){
        return new this(GENEIS_DATA)
    }
    static mineBlock({lastBlock,data}:{lastBlock:any,data:any}){
        let hash,timestamp
        // const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const {difficulty} = lastBlock
        let nonce = 0  
        do {
            nonce++
            timestamp=Date.now()
            hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty)
        } while (hash.substring(0,difficulty)!=='0'.repeat(difficulty));
        return new this({
            timestamp,
            lastHash,
            data,
            hash:cryptoHash(timestamp,lastHash,data,difficulty,nonce),
            difficulty,
            nonce
        })
    }
    static adjustDifficulty({originalBlock,timestamp}:any){
        const {difficulty} = originalBlock
        const difference = timestamp - originalBlock.timestamp
        if(difference>MINE_RATE) return difficulty -1 
        return difficulty+1
    }
 
}
export {Block,IBlock}
