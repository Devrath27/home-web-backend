const mongoose=require('mongoose');

const uri="mongodb+srv://devrath27:Parveen@123@cluster0.ek7qz.mongodb.net/service?retryWrites=true&w=majority"

const connectDB=async()=>{
   await mongoose.connect(uri,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    });
    console.log("connect");
    };
    module.exports=connectDB;