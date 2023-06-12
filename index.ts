import express, { response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import apiRaces from './router/races'
import apiDrivers from './router/drivers'
import apiTeams from './router/teams'
import apiDhl from './router/dhl'
const app = express()
const DEFAULT_PORT = 3000

app.use(bodyParser.json())
app.use('/races',apiRaces)
app.use('/drivers',apiDrivers)
app.use('/teams',apiTeams)
app.use('/dhl',apiDhl)


const PORT = DEFAULT_PORT
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
    mongoose.connect("mongodb://127.0.0.1:27017/f1")
})
