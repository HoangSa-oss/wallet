import mongoose from 'mongoose';

const {Schema,model} = mongoose;


const profileSchema = new Schema({
    year:Number,
    title:String,
    country:String,
    pos:String,
    no:Schema.Types.Mixed,
    driver:String,
    driverShort:String,
    car:String,
    laps:Schema.Types.Mixed,
    timeretired:String,
    pts:Schema.Types.Mixed
}, { versionKey: false })
export default model('races',profileSchema);
