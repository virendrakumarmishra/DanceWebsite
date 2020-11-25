const express= require("express");
const path=require("path");

const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=80;

// Define Mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
  })
  const Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'));
app.use(express.urlencoded());

//set the template engine as pug 
app.set('view engine','pug');

//set the views directory
app.set('views',path.join(__dirname,'views'))

//our pug demo endpoint
//app.get('/',(req,res)=>{
  //  res.status(200).render('index.pug');
//})
app.get('/',(req,res)=>{
   
    const param={}
    res.status(200).render('home.pug',param);
})

app.get('/contact',(req,res)=>{
   
    const param={}
    res.status(200).render('contact.pug',param);
})

app.post('/contact',(req,res)=>{
   

  var myData= new Contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to database")
    }).catch(()=>{
      res.status(400).send("Item was not saved in database")
    })

  //res.status(200).render('contact.pug');
})


app.listen(port,()=>{
    console.log(`The application run on 80 port ${port}`);
})