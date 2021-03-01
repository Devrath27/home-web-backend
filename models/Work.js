const mongoose =require('mongoose')
const user=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    cityName:{
        type:String
    },
    contact:{
        type:String
    },
    serviceType:{
        type:String
    },
   password :{
        type:String
    },
   latitude :{
        type:String
    },
    longitude:{
        type:String
    }
});

// const schema=mongoose.Schema;
// const WishSchema= Schema({
//     wish:Object
// });
module.exports= User=mongoose.model("user",user);