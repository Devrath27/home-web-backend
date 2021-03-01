const mongoose =require('mongoose')
const cust=new mongoose.Schema({
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
   password :{
        type:String
    }
});

// const schema=mongoose.Schema;
// const WishSchema= Schema({
//     wish:Object
// });
module.exports= Cust=mongoose.model("cust",cust);