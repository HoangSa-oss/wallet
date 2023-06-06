import * as redis from 'redis';

const CHANNELS = {
    TEST:"TEST",
    BLOCKCHAIN:"BLOCKCHAIN"
}
class PubSub {
    publisher: any
    subscriber: any
    constructor(){
        this.publisher = redis.createClient()
        this.subscriber = redis.createClient()
        this.publisher.connect()
        this.subscriber.connect()
        this.subscriber.subscribe(CHANNELS.TEST,(channel:any,message:any)=>this.handleMessage(channel,message))
    }
    handleMessage(channel:any,message:any){
        console.log(`Message:${channel}.${message}`)
    }
}
const testPubSub = new PubSub()
setTimeout(()=>{testPubSub.publisher.publish(CHANNELS.TEST,"concac")},1000)
