const express = require('express');
const cors = require('cors');
const  dbConnection = require('./db/connection');
const dotenv =  require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
const port = process.env.PORT || 4000
const path = require('path')
dbConnection()

app.use("/api/v1",require('./routes/account'))
app.use("/api/v1",require('./routes/about'))
app.use("/api/v1",require('./routes/home'))
app.use("/api/v1",require('./routes/services'))
app.use("/api/v1",require('./routes/testimonial'))
app.use("/api/v1",require('./routes/work'))
app.use("/api/v1",require('./routes/contact'))
app.use("/api/v1",require('./routes/faqs'))
app.use("/api/v1",require('./routes/iossTop'))
app.use("/api/v1",require('./routes/iossText'))
app.use("/api/v1",require('./routes/iossImage'))
app.use('/images',express.static('./images'))
app.use(express.static(path.join(__dirname,'./frontend/dist')))
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,'./frontend/dist/index.html'),function(e){
        res.status(500).send(e)
        console.log(e,"index.html file not found")
    })
})



app.listen(port,()=>console.log(`server is running on port ${port}`))
