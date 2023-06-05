import { Block } from "./block"
import { cryptoHash } from "./crypto-hash"
interface IBlockchain {
    chain:any[]
}
export class Blockchain implements IBlockchain {
    chain: any[]
    constructor(){
        this.chain = [Block.genesis()]
    }           
    addBlock({data}:{data:any}){
        const newBlock = Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock)

    }
    replaceChain(chain:any){
        if(chain.length <= this.chain.length){
            console.log('chain longer')
            return
        }
        if(!Blockchain.isValidChain(chain)){
            console.log('chain valid')
            return
        }
        console.log('replace',chain)
        this.chain = chain
    }
    static isValidChain(chain: string | any[]) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
          return false
        };
    
        for (let i=1; i<chain.length; i++) {
          const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
          const actualLastHash = chain[i-1].hash;
          if (lastHash !== actualLastHash) return false;
          const validatedHash = cryptoHash(timestamp, lastHash, data,nonce,difficulty);
    
          if (hash !== validatedHash) return false;
            }
    
        return true;
      }
}