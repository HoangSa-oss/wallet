import mongoose from 'mongoose';

const {Schema,model} = mongoose;


const profileSchema = new Schema({
    year:Number,
    title:String,
    driver:String,
    grandprix:String,
    date:String,
    car:String,
    racePosition:String,
    pts:Number
}, { versionKey: false })
export default model('drivers',profileSchema);
