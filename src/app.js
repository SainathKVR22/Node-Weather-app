const express = require('express');
const path = require('path');
const hbs=require('hbs');
const weather = require('./utils/weatherData');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 2000

// console.log(__dirname);
// Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// console.log(publicDirectoryPath);

// Setup handlebar engines and views location 
// View engines
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
// Here we are replacing this instead of app.get home below one, similarly we replace others
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Sai'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'KVSNR'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name : 'Venky',
        helpText : 'For any further assistance you can contact admin'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error : 'You must send some address to get Info'
        })
    }

    geocode(req.query.address,(error,data)=>
    {
        if(error)
        {
            return res.send({error});
        }
        weather(data.latitude,data.longitude,(error,forecastData)=>
        {
            if(error)
            {
                return res.send({error});
            }
        
            res.send({
                address : req.query.address,
                location : data.location,
                details : forecastData
            })
        })
    // console.log(req.query.address);

    // res.send({
    //     forecast : 'It is Raining',
    //     location : 'New York',
    //     address : req.query.address
    // })
    })
})

app.get('/products',(req,res)=>{
    // console.log(req.query);
    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Sai',
        error : '404 Error Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Sai',
        error : '404 Error page not found'
    })
})





app.listen(port,()=>{
    console.log('Server is running on '+port);
})