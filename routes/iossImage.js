const iossImageModel = require('../model/iossImageModel')
const router = require('express').Router()
const { uploadImage } = require('../multer/setup')

router.post('/ioss/image',uploadImage.single('image'),async(req,res)=>{
    let image = req?.file?.filename
    let {question,answer,role} = req.body
    let create = await iossImageModel.create({image:image,question:question,answer:answer,role:role})
    if (create){
        res.status(200).json(create)
    }
})

router.get('/ioss/image/:role',async(req,res)=>{
    let find = await iossImageModel.find({role:req.params.role})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/ioss/image/question/:id',async(req,res)=>{
    let {id} = req.params
    let find = await iossImageModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/ioss/image/question/:id',uploadImage.single('image'),async(req,res)=>{
    let {id} = req.params
    let image = req?.file?.filename
    let {question,answer} = req?.body
    let update = await iossImageModel.findByIdAndUpdate(id,{$set:{image:image,question:question,answer:answer}},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/ioss/image/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await iossImageModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

module.exports = router