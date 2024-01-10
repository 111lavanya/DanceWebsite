// Using PUG 
const express = require("express");
const { Server } = require("http");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) // for serving static files
app.use(express.urlencoded());

// PUG RELATED STUFF
app.set('view engine','pug')  // set the template engine as pug
app.set('views',path.join(__dirname,'views')) // set the views directory
// konsi directory se read karna chahte hain saari ki saari files

// END POINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render("home.pug",params);
});

app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render("contact.pug",params);
});

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });//returns a promise
    // res.status(200).render("contact.pug");
});
// home.pug hi ab hoga Serve

// START THE SERVER
app.listen(port,()=>{ 
    console.log(`The application has successfully started at the Port : ${port}`)
}); // call back here too 