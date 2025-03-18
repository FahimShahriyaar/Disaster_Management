var express = require('express');
var bcrypt=require('bcrypt');
var multer = require('multer');
const {donationModel,crisisModel,accountModel,inventoryModel} = require('./model');
var api = express.Router();

// file upload configuration...................
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
// file upload configuration...................

// get total funds
api.get('/fund',async function (req,res) {
  donationModel.aggregate([
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ]).then(result => {
    res.json({success:true,data:(result[0]?.totalAmount || 0)});
  }).catch(err => res.json({success:false}));
})

/* GET donations */
api.get('/donation/page/:page/limit/:limit', async function(req, res, next) {
  try{
    let page=req.params.page
    let limit=req.params.limit
    let skip = (page - 1) * limit;

    const data=await donationModel.find().skip(skip).limit(limit)
    const totalDoc=await donationModel.countDocuments()
    const totalPages=Math.ceil(totalDoc / limit)

    res.json({success:true,data,totalPages})
  }
  catch{
    res.json({success:false,msg:'Error'})
  }
});

// donation creating
api.post('/donation', async function(req, res, next) {

  const donation_data={...req.body}
  try{
    let lastID=await donationModel.findOne().sort({ _id: -1 })
    if(lastID==null) lastID='DON-1'
    else lastID='DON-'+(Number(lastID['donation_id'].split('-')[1])+1).toString()

    donation_data['donation_id']=lastID
    const data=await donationModel.create(donation_data)
    res.json({success:true,data})
  }
  catch{
    res.json({success:false,msg:'error'})
  }
});

// crisis creating
api.post('/crisis', upload.single('image'), async function(req, res, next) {

  const crisis_data={...req.body}
  const image = req.file ? req.file.filename : null;

  if (crisis_data.length==0) {
    return res.status(400).json({ message: 'All fields are required!' });
  }
  try{
    let lastID=await crisisModel.findOne().sort({ _id: -1 })
    if(lastID==null) lastID='CRS-1'
    else lastID='CRS-'+(Number(lastID['crisis_id'].split('-')[1])+1).toString()

    crisis_data['crisis_id']=lastID
    // crisis_data.image=image
    const data=await crisisModel.create(crisis_data)
    res.json({success:true,data})
  }
  catch(e){
    res.json({success:false,msg:e})
  }
});


/* crisis partial*/
api.get('/crisis/page/:page/limit/:limit', async function(req, res, next) {
  try{
    let page=req.params.page
    let limit=req.params.limit
    let skip = (page - 1) * limit;
    let {filter}=req.query
    let query={}
    if(['severe','moderate','critical'].includes(filter)){
      query.severity=filter
    }
    else if(['pending','unresolved','resolving','resolved'].includes(filter)){
      query.status=filter
    }
    console.log(query)
    const data=await crisisModel.find(query).skip(skip).limit(limit)
    const totalDoc=await crisisModel.countDocuments(query)
    const totalPages=Math.ceil(totalDoc / limit)

    res.json({success:true,data,totalPages,totalDoc})
  }
  catch{
    res.json({success:false,msg:'Error'})
  }
});

// crisis updating
api.put('/crisis', async function(req, res, next) {
  const {_id,...crisis_data}=req.body
  console.log(crisis_data)
  try{
    let data=await crisisModel.findByIdAndUpdate(_id,crisis_data,{new:true,runValidators:true})
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'error'})
  }
});

// crisis deleting
api.delete('/crisis/:id', async function(req, res, next) {
  try{
    let data=await crisisModel.findByIdAndDelete(req.params.id)
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'error'})
  }
});

/* GET volunteer */
api.get('/volunteer/page/:page/limit/:limit', async function(req, res, next) {
  try{
    let page=req.params.page
    let limit=req.params.limit
    let skip = (page - 1) * limit;

    let query={role:'volunteer'}
    if(req.query.filter) query['volunteer_info.status']=req.query.filter

    console.log(query)
    const data=await accountModel.find(query).skip(skip).limit(limit)
    const totalDoc=await accountModel.countDocuments(query)
    const totalPages=Math.ceil(totalDoc / limit)

    res.json({success:true,data,totalPages,totalDoc})
  }
  catch{
    res.json({success:false,msg:'Error'})
  }
});

// volunteer update
api.put('/volunteer', async function(req, res, next) {
  const {_id,crisis_id}=req.body
  console.log(_id,crisis_id)
  let query={'volunteer_info.status':'assigned','volunteer_info.task':crisis_id}
  try{
    let data=await accountModel.findByIdAndUpdate(_id,query,{new:true,runValidators:true})
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'error'})
  }
});

api.post('/account/signup', async function(req, res, next) {
  
   //hashing user password
  //  const salt=await bcrypt.genSalt(10)
  //  const password=await bcrypt.hash(req.body.password,salt)

   const account_data={...req.body}

  try{
    let lastID=await accountModel.findOne().sort({ _id: -1 })
    if(lastID==null) lastID='ACC-1'
    else lastID='ACC-'+(Number(lastID['account_id'].split('-')[1])+1).toString()

    account_data['account_id']=lastID
    const data=await accountModel.create(account_data)
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'Error'})
  }
});

api.post('/account/login', async function(req, res, next) {
  try{
    const data=await accountModel.find({email:req.body.email})
    if(data.length==1){
      if(data[0].role===req.body.role) res.json({success:true}) //await bcrypt.compare(data[0].password,req.body.password) && 
      else res.json({success:false,msg:'wrong credentials'})
    }
    else res.json({success:false,msg:'account not found'})   
  }
  catch{
    res.json({success:false,msg:'Error'})
  }
});






// inventory data fetch
api.get('/inventory/page/:page/limit/:limit', async function(req, res, next) {
  try{
    let page=req.params.page
    let limit=req.params.limit
    let skip = (page - 1) * limit;

    let query={}
    if(req.query.filter) query['inventory_type']=req.query.filter

    const data=await inventoryModel.find(query).skip(skip).limit(limit)
    const totalDoc=await inventoryModel.countDocuments()
    const totalPages=Math.ceil(totalDoc / limit)
    console.log(data)
    res.json({success:true,data,totalPages})
  }
  catch{
    res.json({success:false,msg:'Error'})
  }
});

// inventory creating
api.post('/inventory', async function(req, res, next) {

  const inventory_data={...req.body}
  console.log(inventory_data)
  try{
    let lastID=await inventoryModel.findOne().sort({ _id: -1 })
    console.log(lastID)
    if(lastID==null) lastID='INV-1'
    else lastID='INV-'+(Number(lastID['product_id'].split('-')[1])+1).toString()

    inventory_data['product_id']=lastID
    inventory_data['total']=req.body.price*req.body.quantity
    const data=await inventoryModel.create(inventory_data)
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:e})
  }
});

// inventory updating
api.put('/inventory', async function(req, res, next) {
  const {_id,...inventory_data}=req.body
  try{
    if(req.body.price || req.body.quantity){
      inventory_data['total']=req.body.price * req.body.quantity
    }
    let data=await inventoryModel.findByIdAndUpdate(_id,inventory_data,{new:true,runValidators:true})
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'error'})
  }
});

// inventory deleting
api.delete('/inventory/:id', async function(req, res, next) {
  try{
    let data=await inventoryModel.findByIdAndDelete(req.params.id)
    res.json({success:true,data})
  }
  catch(e){
    console.log(e)
    res.json({success:false,msg:'error'})
  }
});


module.exports = api;
