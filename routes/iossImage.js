const iossImageModel = require('../model/iossImageModel')
const router = require('express').Router()
const cloudinary = require('cloudinary').v2

router.post('/ioss/image',async(req,res)=>{
    let {question,answer,role} = req.body
    let image = req.files.image;
    try {
        let about = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image.tempFilePath, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        if (about && about.url) {
            let createabout = await iossImageModel.create({ question:question,answer:answer,role:role, image: about.url });
            res.status(200).json(createabout);
        } else {
            res.status(500).json({ error: 'Failed to upload image.' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
        console.log(error)
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

router.put('/ioss/image/question/:id',async(req,res)=>{
    try {
        let {id} = req.params
        let image = req?.files?.image
        let {question,answer} = req?.body
        if (image){
            let about = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(image.tempFilePath, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            if (about && about.url) {
                console.log(about?.url)
                let createabout = await iossImageModel.findByIdAndUpdate(id,{image: about.url,question:question,answer:answer },{new:true});
                res.status(200).json(createabout);
            } 
            else {
                res.status(500).json({ error: 'Failed to upload image.' });
            }
        }

        else{
            let updateAbout = await iossImageModel.findByIdAndUpdate(id,{question:question,answer:answer},{new:true})
            if (updateAbout){
                res.status(200).json(updateAbout);
            }
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
        console.log(error)
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