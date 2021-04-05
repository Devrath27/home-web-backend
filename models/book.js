const mongoose =require('mongoose')
const book=new mongoose.Schema({
    problem:{
        type:String
    },
    email:{
        type:String
    },
    location:{
        type:String
    },
    image:{
        type:String
    },
    serviceType:{
        type:String
    },
   latitude :{
        type:String
    },
    longitude :{
        type:String
    },
    date :{
        type: String
    },
    cust_id:{
        type: String
    },
    worker_id:{
        type: String
    },
    status:{
        type: Number
    }
});

// const schema=mongoose.Schema;
// const WishSchema= Schema({
//     wish:Object
// });
module.exports= Book=mongoose.model("book",book);