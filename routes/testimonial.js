const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const testimonialModel = require('../model/testimonial')

router.post('/testimonial',async(req,res)=>{
    let image = req.files.image;
    let {message,name} = req.body
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
            let createabout = await testimonialModel.create({ message:message , name:name, image: about.url });
            res.status(200).json(createabout);
        } else {
            res.status(500).json({ error: 'Failed to upload image.' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
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

router.put('/testimonial/:id',async(req,res)=>{
    try {
        let {id} = req.params
        let image = req?.files?.image
        let {message,name} =req.body
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
                let createabout = await testimonialModel.findByIdAndUpdate(id,{ message: message ,name:name, image: about.url },{new:true});
                res.status(200).json(createabout);
            } 
            else {
                res.status(500).json({ error: 'Failed to upload image.' });
            }
        }

        else{
            let updateAbout = await testimonialModel.findByIdAndUpdate(id,{message: message ,name:name},{new:true})
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