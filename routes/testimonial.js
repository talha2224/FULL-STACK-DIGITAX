const router = require('express').Router()
const testimonialModel = require('../model/testimonial')
const { uploadImage } = require('../multer/setup')

router.post('/testimonial',uploadImage.single('image'),async(req,res)=>{
    let image= req.file.filename
    let {message,name} = req.body
    let create = await testimonialModel.create({image:image,message:message,name:name})
    if (create){
        res.status(200).json(create)
    }
})

router.get('/testimonial',async(req,res)=>{
    let find = await testimonialModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/testimonial/:id',async(req,res)=>{
    let {id} = req.params
    let find = await testimonialModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/testimonial/:id',uploadImage.single('image'),async(req,res)=>{
    let {id} = req.params
    let image= req?.file?.filename
    let {message,name} = req?.body
    let update = await testimonialModel.findByIdAndUpdate(id,{$set:{
        image:image,
        message:message,
        name:name
    }},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/testimonial/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await testimonialModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router