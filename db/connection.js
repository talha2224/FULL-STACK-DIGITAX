const mongoose = require('mongoose');

const dbConnection = async()=>{
   let connection = await mongoose.connect(`mongodb+srv://talhahaider074:nyPd1ehqbCxRcVu9@cluster0.iv6y2ri.mongodb.net/`)
   if(connection){
    console.log(`connected`)
   }
   else{
    console.log(`not connected`)
   }
}

module.exports = dbConnection
