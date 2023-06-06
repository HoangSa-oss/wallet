import express from 'express'
import { Blockchain } from './block-chain'
import bodyParser from 'body-parser'
import { PubSub } from './pubsub'
const app = express()

const blockchain = new Blockchain()
const pubsub = new PubSub({blockchain})
setTimeout(()=>pubsub.broadcastChain(),1000)
app.use(bodyParser.json())
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})
app.post('/api/mine',(req,res)=>{
    const {data} = req.body
    blockchain.addBlock({data})
    res.redirect('/api/blocks')

})
app.listen(3000,()=>{
    console.log('listening 3000')
})
