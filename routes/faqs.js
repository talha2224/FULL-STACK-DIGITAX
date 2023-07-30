const router = require('express').Router()
const faqModel = require('../model/faqsModel')

router.post('/faq',async(req,res)=>{
    let create = await faqModel.create(req.body)
    if (create){
        res.status(200).json(create)
    }
})

router.get('/faq',async(req,res)=>{
    let find = await faqModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/faq/title/:title',async(req,res)=>{
    let {title} = req.params
    let find = await faqModel.find({title:title})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})


router.get('/faq/:id',async(req,res)=>{
    let {id} = req.params
    let find = await faqModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/faq/:id',async(req,res)=>{
    let {id} = req.params
    let update = await faqModel.findByIdAndUpdate(id,{$set:req.body},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/faq/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await faqModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router