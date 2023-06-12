import mongoose from 'mongoose';

const {Schema,model} = mongoose;


const profileSchema = new Schema({
    year:Number,
    title:String,
    grandprix:String,
    driver:String,
    driverShort:String,
    car:String,
    time:String
}, { versionKey: false })
export default model('dhl',profileSchema);
