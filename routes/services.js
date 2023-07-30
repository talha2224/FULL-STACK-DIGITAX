const router = require('express').Router()
const serviceModel = require('../model/services')
const { uploadImage } = require('../multer/setup')

router.post('/service',uploadImage.single('image'),async(req,res)=>{
    let image= req.file.filename
    let {heading,paragraph} = req.body
    let create = await serviceModel.create({image:image,paragraph:paragraph,heading:heading})
    if (create){
        res.status(200).json(create)
    }
})

router.get('/service',async(req,res)=>{
    let find = await serviceModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/service/:id',async(req,res)=>{
    let {id} = req.params
    let find = await serviceModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/service/:id',uploadImage.single('image'),async(req,res)=>{
    let {id} = req.params
    let image= req?.file?.filename
    let {heading,paragraph} = req.body
    let update = await serviceModel.findByIdAndUpdate(id,{$set:{
        image:image,paragraph:paragraph,heading:heading
    }},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/service/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await serviceModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router