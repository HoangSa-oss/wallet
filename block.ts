import { GENEIS_DATA } from "./config"
import { cryptoHash } from "./crypto-hash"

interface IBlock {
    timestamp :any
    lastHash :string
    hash? :string
    data :any[]
}
class Block implements IBlock{
    timestamp: any
    lastHash: string
    hash?: string
    data: any[]
    constructor({timestamp,lastHash,hash,data}:IBlock){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }
    static genesis(){
        return new this(GENEIS_DATA)
    }
    static mineBlock({lastBlock,data}:{lastBlock:any,data:any}){
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        return new this({
            timestamp,
            lastHash,
            data,
            hash:cryptoHash(timestamp,lastHash,data)

        })
    }
 
}
export {Block,IBlock}
