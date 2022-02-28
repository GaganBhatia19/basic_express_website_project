const express = require('express');
const app = express();
const port = process.env.PORT || 80; // process.env.PORT will be the port address provided by Heroku --- Dynamic Port address

// importing mongoose
const mongoose = require('mongoose');
//path to database
// connecting to heroku app dynamic database
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/xyzprogramminghubDatabase').then(() => console.log('connected to database successfully')).catch(() => console.log("can't connect to database"));// promise

module.exports = {mongoose};

// Express related configurations
app.use(express.urlencoded()); // using url encoder middleware
app.use('/static', express.static('static'));// for serving static files

// pug related configurations
app.set('view engine', 'pug'); // setting pug as view template engine
app.set('views', './views'); // setting pug directory path

// page routing and serving configurations
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})

// configure schema
const contactSchema = new mongoose.Schema({
    userName:String,
    phoneNo:String,
    emailId:String,
    address:String,
    desc:String
})

// Creating model from schema
const ContactModel = new mongoose.model('ContactCollection',contactSchema);

//by post request save document to database
app.post('/contact', (req, res) => {
    // send data to database
    let newContact = ContactModel(req.body);

    newContact.save().then(()=>{
        // promise resolved
        res.status(200).render('formSubmitSuccess.pug');
        console.log('inserted in database successfully');
    }).catch(()=>{
        // promise rejected
        res.status(400).send("An error occured while sending your data to database");
        console.log("can't insert data in database");
    }); // promise

    // if any error comes then status is set to 400.
    // if we send any message or render any pug template then we send using status 200 so by callback if any error comes then the error in server will also come.
    // so don't change status over here change inside the callback
})

// "services" page and "about us" page 
app.get('/about',(req,res)=>{
    res.status(200).render('underConstructTemplate.pug',{'pageName':'About'});
})
app.get('/services',(req,res)=>{
    res.status(200).render('underConstructTemplate.pug',{'pageName':'Services'});
})
// starting server
app.listen(port, () => {
    console.log('running on local host');
})