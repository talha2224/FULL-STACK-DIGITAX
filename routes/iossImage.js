const iossImageModel = require('../model/iossImageModel')
const router = require('express').Router()
const {ref,getDownloadURL,uploadBytes} = require('@firebase/storage')
const {upload,storage} = require('../firebase.config')

router.post('/ioss/image',upload.single('image'),async(req,res)=>{
    try {
        let { role,question,answer } = req.body;
        const dateTime = Date.now();
        const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
        const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const createabout = await iossImageModel.create({image: downloadURL,role:role,question:question,answer:answer });
        res.status(200).json(createabout);
    } 
      catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Image upload failed.' });
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

router.put('/ioss/image/question/:id',upload.single('image'),async(req,res)=>{
    try {
        let { role,question,answer } = req.body;        
        let {id} = req.params
        if(req?.file){
            const dateTime = Date.now();
            const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
            const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updateAbout = await iossImageModel.findByIdAndUpdate(id,{role:role,question:question,answer:answer,image: downloadURL },{new:true})
            res.status(200).json(updateAbout)
        }
        else{
            const updateAbout = await serviceModel.findByIdAndUpdate(id,{ role:role,question:question,answer:answer },{new:true})
            res.status(200).json(updateAbout)
        }
    } 
    catch (error) {
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