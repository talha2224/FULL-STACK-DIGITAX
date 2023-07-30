const aboutModel = require('../model/aboutModel')
const { uploadImage } = require('../multer/setup')

const router = require('express').Router()

router.post('/about',uploadImage.single('image'),async(req,res)=>{
    let image= req.file.filename
    let {paragraph} = req.body
    let create = await aboutModel.create({image:image,paragraph:paragraph})
    if (create){
        res.status(200).json(create)
    }
})

router.get('/about',async(req,res)=>{
    let find = await aboutModel.find({})
    if (find.length>0){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"NO ABOUT US DATA FOUND"})
    }
})

router.get('/about/:id',async(req,res)=>{
    let {id} = req.params
    let find = await aboutModel.findById(id)
    if (find){
        res.status(200).json(find)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.put('/about/:id',uploadImage.single('image'),async(req,res)=>{
    let {id} = req.params
    let image= req?.file?.filename
    let {paragraph} = req?.body
    let update = await aboutModel.findByIdAndUpdate(id,{$set:{
        paragraph:paragraph,
        image:image
    }},{new:true})
    if (update){
        res.status(200).json(update)
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})

router.delete('/about/:id',async(req,res)=>{
    let {id} = req.params
    let deleteId = await aboutModel.findByIdAndDelete(id)
    if (deleteId){
        res.status(200).json({msg:"deleted"})
    }
    else{
        res.status(404).json({msg:"WRONG ID PASSED"})
    }
})
module.exports = router