import { Block } from "./block"
interface IBlockchain {
    chain:any[]
}
export class Blockchain implements IBlockchain {
    chain: any[]
    constructor(){
        this.chain = [Block.genesis]
    }           
    addBlock({data}:{data:any}){
        const newBlock = Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock)

    }
}