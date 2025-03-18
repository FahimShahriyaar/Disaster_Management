const mongoose = require('mongoose');

//inventory Schema
const donationSchema=new mongoose.Schema({
    donation_id:String,
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true, unique:true},
    transaction_id:{type:String, required:true, unique:true},
    payment_method:{type:String, required:true},
    donation_type:{type:String, required:true},
    amount:{type:Number,default:0},
    address:{type:String,require:true},
}, {timestamps:true})

const donationModel=mongoose.models.donation || mongoose.model('donation',donationSchema);

//Crisis Schema
const crisisSchema=new mongoose.Schema({
    crisis_id:String,
    title:{type:String, required:true},
    location:{type:String, required:true},
    description:{type:String, required:true},
    severity:{type:String, enum:['severe','moderate','critical'], required:true},
    status:{type:String, enum:['pending','unresolved','resolving','resolved'], default:'pending'},
    population:{type:Number,default:0},
    affected:{type:Number,default:0},
    date:{type:String, required:true},
    // image:{type:String,required:true}
}, {timestamps:true})

const crisisModel=mongoose.models.crisi || mongoose.model('crisi',crisisSchema);


//Account Schema
const accountSchema=new mongoose.Schema({
    account_id:String,
    name:{type:String, required:true},
    age:{type:Number},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    gender:{type:String, enum:['male','female'], required:true},
    password:{type:String, required:true},
    role:{type:String,enum:['admin','volunteer','user'],required:true},
    volunteer_info:{
        status:{type:String, enum:['unavailable','available','assigned'],default:'available'},
        task:{type:String, ref:'crisi',default:null}
    }

}, {timestamps:true})

const accountModel=mongoose.models.account || mongoose.model('account',accountSchema);



//inventory Schema
const inventorySchema=new mongoose.Schema({
    product_id:String,
    product_name:{type:String, required:true},
    inventory_type:{type:String, enum:['donated','purchased'], required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    total:{type:Number,required:true},
}, {timestamps:true})

const inventoryModel=mongoose.models.inventorys || mongoose.model('inventorys',inventorySchema);


module.exports={donationModel,inventoryModel,crisisModel,accountModel};