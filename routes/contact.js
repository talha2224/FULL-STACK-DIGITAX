const router = require('express').Router()
const ContactModel = require('../model/contectModel')


router.post('/contact',async(req,res)=>{   
    let create = await ContactModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/contact',async(req,res)=>{
    let find = await ContactModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/contact/:id',async(req,res)=>{
    let {id} = req.params
    let find = await ContactModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/contact/:id',async(req,res)=>{
    let {id} = req.params
    let update = await ContactModel.findByIdAndUpdate(id,{
        $set:req.body
    },{new:true});
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/contact/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await ContactModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router