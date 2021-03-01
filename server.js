const { json } = require('express')
const express = require('express')
const { join } = require('path')
const cors=require('cors')
const mongoose=require('mongoose')
const nodemailer = require('nodemailer');

const bodyParser=require('body-parser')
const connectDB=require('./keys')
const User=require("./models/Work");
const Cust =require("./models/cust");
const Book=require('./models/book')
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())
app.use(bodyParser.json());
connectDB();
app.post('/Signupworker',async(req,res)=>{
  
  var name = req.body.signupworker.name
  var email = req.body.signupworker.email
  var cityName = req.body.signupworker.cityName
  var contact = req.body.signupworker.contact
  var serviceType=req.body.signupworker.serviceType
  var password = req.body.signupworker.password
  var latitude=req.body.signupworker.latitude
  var longitude=req.body.signupworker.longitude
  await User.find({email :email}).then(result =>
    {  console.log(result.length);
      if(result.length!==0)
      {
        console.log("you are already resister please login***");
        res.send({mes:false,prof:"you are already resistred"});
      }
      else{
        let user={};
        user.name=name;
        user.email=email;
        user.cityName=cityName;
        user.contact=contact;
        user.serviceType=serviceType;
        user.password=password;
        user.latitude=latitude;
        user.longitude=longitude;
        let userModel=new User(user);
          userModel.save();
         console.log("saved");
         
   
         res.send({mes:true,prof:userModel.email});
         
         };
  });
  
});



app.post('/Loginworker',async(req,res)=>{
  
  
  var email = req.body.loginworker.email
 
  var password = req.body.loginworker.password

  await User.find({email :email}).then(result =>
    {  
      if(result.length!==0)
      {   
        if(result[0].password===password)
        {   
          console.log("you are successfully logdin");
          res.send({mes:true,prof:result[0].email});
        }
        else{
          console.log("your password is wrong");
          res.send({mes:false,prof:"your password is wrong"});
        }
       
      }
      
      else{
        res.json({mes:false, prof:"you are not resistred"});
         
         };
  });
  
});



app.post('/Signupcust',async(req,res)=>{
  
  var name = req.body.signupcust.name
  var email = req.body.signupcust.email
  var cityName = req.body.signupcust.cityName
  var contact = req.body.signupcust.contact
  var password = req.body.signupcust.password

  await Cust.find({email :email}).then(result =>
    {  console.log(result.length);
      if(result.length!==0)
      {
        res.send({mes:false,prof:"you are already resistred"});
      }
      else{
        let cust={};
        cust.name=name;
        cust.email=email;
        cust.cityName=cityName;
        cust.contact=contact;
        cust.password=password;
        let custModel=new Cust(cust);
          custModel.save();
         console.log("saved");
         //res.json(userModel);
         res.send({mes:true,prof:custModel.email});
         
         
         };
  });
  
});

app.post('/Logincust',async(req,res)=>{
  
  
  var email = req.body.logincust.email
  var password = req.body.logincust.password

  await Cust.find({email :email}).then(result =>
    {  
      if(result.length!==0)
      {   
        if(result[0].password===password)
        {   
          console.log("you are successfully logdin");
          res.send({mes:true,prof:result[0].email});
        }
        else{
          console.log("your password is wrong");
          res.send({mes:false,prof:"your password is wrong"});
        }
       
      }
      
      else{
        res.json({mes:false, prof:"you are not resistred"});
         
         };
  });
  
});

app.post('/Profile',async(req,res)=>{
  var email=req.body.profile.email;
  var stat=req.body.profile.stat;
if(stat==="custm")
{
  await Cust.find({email :email}).then(result =>
    {  
      res.json({profile:result[0]});
  });
}
else{
  await User.find({email :email}).then(result =>
    {  
      res.json({profile:result[0]});
  });
}
})



app.post('/get_service',async(req,res)=>{
  console.log(req.body);
  var problem = req.body.mybook.problem
  var email = req.body.mybook.email
  var location = req.body.mybook.location
  var image = req.body.mybook.image
  var serviceType=req.body.mybook.serviceType
  var latitude=req.body.mybook.latitude
  var longitude=req.body.mybook.longitude
 

  let book={};
        book.problem=problem;
        book.email=email;
        book.location=location;
        book.image=image;
        book.serviceType=serviceType;
        book.latitude=latitude;
        book.longitude=longitude;

        let bookModel=new Book(book);
         await bookModel.save();
         console.log("saved");

   User.find({serviceType:serviceType}).then(result =>
    {  console.log(result);
     var emailw=result[0].email;
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'royalking1012000@gmail.com',
          pass: '9352030310'
        }
      });
      
      var mailOptions = {
        from: 'royalking1012000@gmail.com',
        to: emailw,
        subject: 'Sending Email using Node.js',
        text: 'you have a new booking from '+location+ ' & email of customer is: ' +email
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      
      
      
      
      
      
      console.log(result.length);
      res.json({respond:"successfully booked",bookboy:result[0].name,bookmob:result[0].contact});
  });
  
});



app.listen(8080);