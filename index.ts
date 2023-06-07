import express, { response } from 'express'
import { Blockchain } from './blockchain/index'
import bodyParser from 'body-parser'
import { PubSub } from './app/pubsub'
import request from 'request' 

const app = express()
const DEFAULT_PORT = 3000
const blockchain = new Blockchain()
const pubsub = new PubSub({blockchain})
const ROOT_NOODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

app.use(bodyParser.json())
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})
app.post('/api/mine',(req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    res.redirect('/api/blocks')

})
const syncChains = ()=>{
    request({url:`${ROOT_NOODE_ADDRESS}/api/blocks`},(error:any,response:any,body:any)=>{
        if(!error && response.statusCode ==200){
            const rootChain = JSON.parse(body)
            blockchain.replaceChain(rootChain)
        }
    })
}
let PEER_PORT
if(process.env.GENERATE_PEER_PORT=='true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000)
}
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT,()=>{
    if(PORT!==DEFAULT_PORT){
        syncChains()

    }
    console.log(`listening ${PORT}`)
})
