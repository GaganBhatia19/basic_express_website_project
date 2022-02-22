const express = require('express');
const app = express();
const port = 80;

// Express related configurations
app.use(express.urlencoded()); // using url encoder middleware
app.use('/static',express.static('static'));// for serving static files

// pug related configurations
app.set('view engine','pug'); // setting pug as view template engine
app.set('views', './views'); // setting pug directory path

// page routing and serving configurations
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact',(req,res)=>{
    // send data to database
    console.log(req.body);
    res.status(200).render('formSubmitSuccess.pug');
})
// starting server
app.listen(port,()=>{
    console.log('running on local host');
})