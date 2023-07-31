const aboutModel = require('../model/aboutModel')
const router = require('express').Router()
const {ref,getDownloadURL,uploadBytes} = require('firebase/storage')
const {upload,storage} = require('../firebase.config')


router.post('/about', upload.single('image'), async (req, res) => {
    try {
        let { paragraph } = req.body;
        const dateTime = Date.now();
        const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
        const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const createabout = await aboutModel.create({ paragraph: paragraph, image: downloadURL });
        res.status(200).json(createabout);
      } 
      catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Image upload failed.' });
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

router.put('/about/:id',upload.single('image'),async(req,res)=>{
    try {
        let {paragraph} = req.body
        let {id} = req.params
        if(req?.file){
            const dateTime = Date.now();
            const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);
            const snapshot = await uploadBytes(storageRef, req?.file?.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const updateAbout = await aboutModel.findByIdAndUpdate(id,{ paragraph: paragraph, image: downloadURL },{new:true})
            res.status(200).json(updateAbout)
        }
        else{
            const updateAbout = await aboutModel.findByIdAndUpdate(id,{ paragraph: paragraph },{new:true})
            res.status(200).json(updateAbout)
        }
    } 
    catch (error) {
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