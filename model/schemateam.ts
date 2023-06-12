import mongoose from 'mongoose';


const {Schema,model} = mongoose;


const profileSchema = new Schema({
    year:Number,
    title:String,
    nameTeam:String,
    grandprix:String,
    date:String,
    pts:Number
}, { versionKey: false })
export default model('team',profileSchema);
