const aboutModel = require('../model/aboutModel')
const cloudinary = require('cloudinary').v2
const router = require('express').Router()


router.post('/about', async (req, res) => {
    let image = req.files.image;
    let { paragraph } = req.body;

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
            let createabout = await aboutModel.create({ paragraph: paragraph, image: about.url });
            res.status(200).json(createabout);
        } else {
            res.status(500).json({ error: 'Failed to upload image.' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});


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

router.put('/about/:id',async(req,res)=>{
    try {
        let {id} = req.params
        let image = req?.files?.image
        let {paragraph} =req.body
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
                let createabout = await aboutModel.findByIdAndUpdate(id,{ paragraph: paragraph, image: about.url },{new:true});
                res.status(200).json(createabout);
            } 
            else {
                res.status(500).json({ error: 'Failed to upload image.' });
            }
        }
        else{
            let updateAbout = await aboutModel.findByIdAndUpdate(id,{paragraph:paragraph},{new:true})
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