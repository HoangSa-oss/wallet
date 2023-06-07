import { STARTING_BALANCE } from "../config";
import { ec } from "../util";
import { cryptoHash } from "../util/crypto-hash";
import { verifySignature } from "../util";
import { Transaction } from "./transaction";
export class Wallet {
    balance: number
    publicKey: any
    keyPair:any
    constructor(){
        this.balance = STARTING_BALANCE
        this.keyPair = ec.genKeyPair()
        this.publicKey = this.keyPair.getPublic()
    }
    sign(data:any){
        return this.keyPair.sign(cryptoHash(data))
    }
    createTransaction({recipient,amount}:any){
        if(amount > this.balance){
            throw new Error("Amount exceeds balance")
        }
        return new Transaction({senderWallet:this,recipient,amount})
    }
}