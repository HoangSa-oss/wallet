import mongoose from 'mongoose';

const {Schema,model} = mongoose;


const profileSchema = new Schema({
    year:Number,
    title:String,
    grandprix:String,
    date:String,
    winner:String,
    winnerShort:String,
    car:String,
    laps:Number,
    time:String,
    pos:String,
    driver:String,
    driverShort:String,
    nationality:String,
    pts:Number,
    team:String,
}, { versionKey: false })
export default model('all',profileSchema);
