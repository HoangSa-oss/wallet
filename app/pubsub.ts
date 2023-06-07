import * as redis from 'redis';

const CHANNELS = {
    TEST:"TEST",
    BLOCKCHAIN:"BLOCKCHAIN"
}
export class PubSub {
    publisher: any
    subscriber: any
    blockchain:any
    constructor({blockchain}:any){
        this.blockchain = blockchain
        this.publisher = redis.createClient({
            url: 'redis://localhost:6379'})
        this.subscriber = redis.createClient()
        this.publisher.connect()
        this.subscriber.connect()
        this.subscribeToChannel()
    }
    handleMessage(channel:any,message:any){
        console.log(message)
        const parsedMessage = JSON.parse(message)
        if(channel === CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parsedMessage)
        }
    }
    subscribeToChannel(){
        Object.values(CHANNELS).forEach(channel=>{
            this.subscriber.subscribe(channel,(message:any)=>this.handleMessage(channel,message))
        })
    }
    publish({channel,message}:any){
        this.subscriber.unsubscribe(channel,()=>{
            this.publisher.publish(channel,message,()=>{
                this.subscriber.subscribe(channel)
            }) 
        })
    }
    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        })
    }
}
