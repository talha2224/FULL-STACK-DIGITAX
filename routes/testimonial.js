const router = require('express').Router()
const {ref,getDownloadURL,uploadBytes} = require('@firebase/storage')
const {upload,storage} = require('../firebase.config')
const testimonialModel = require('../model/testimonial')

router.post('/testimonial',upload.single('image'),async(req,res)=>{
    try {
        let { message,name } = req.body;
        const dateTime = Date.now();
        const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
        const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const createabout = await testimonialModel.create({ message: message,name:name, image: downloadURL });
        res.status(200).json(createabout);
    } 
      catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Image upload failed.' });
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

router.put('/testimonial/:id',upload.single('image'),async(req,res)=>{
    try {
        let { message,name } = req.body;
        let {id} = req.params
        if(req?.file){
            const dateTime = Date.now();
            const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
            const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updateAbout = await testimonialModel.findByIdAndUpdate(id,{ message: message,name:name, image: downloadURL },{new:true})
            res.status(200).json(updateAbout)
        }
        else{
            const updateAbout = await serviceModel.findByIdAndUpdate(id,{ message: message,name:name },{new:true})
            res.status(200).json(updateAbout)
        }
    } 
    catch (error) {
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