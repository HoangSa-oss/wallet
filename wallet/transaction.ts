import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../util';

export class Transaction{
    id: string;
    outputMap: {};
    input: any;
    constructor({senderWallet,recipient,amount}:any){
        this.id = uuidv4()
        this.outputMap = this.createOutputMap({senderWallet,recipient,amount})
        this.input = this.createInput({senderWallet,outputMap:this.outputMap})
    }
    createOutputMap({senderWallet,recipient,amount}:any){
        const outputMap:any ={}
        outputMap[recipient] = amount
        outputMap[senderWallet.publicKey] = senderWallet.balance-amount 
        return outputMap
    }
    createInput({senderWallet,outputMap}:any){
        return {
            timestamp:Date.now(),
            amount:senderWallet.balance,
            address:senderWallet.publicKey,
            signature:senderWallet.sign(outputMap)
        }
    }
    static validTransaction(transaction:any){
        const {input,outputMap} = transaction
        const {address,amount,signature} = input 
        const outputTotal = Object.values(outputMap)
            .reduce((total:any,outputAmount:any)=> total + outputAmount)
        if(amount!==outputTotal){
            console.log('Invalid transaction from',address)
            return false
        }
        if(!verifySignature({publicKey:address,data:outputMap,signature})){
            console.log(`Invalid signature from ${address}`)
            return false
        }
        return true
    }
}