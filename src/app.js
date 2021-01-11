//core modules
const path =require('path')
const hbs = require('hbs')
const geoCode= require('./utils/geoCode')
const forecast= require('./utils/weather')

const express = require('express')
const geocode = require('./utils/geoCode')
const weather = require('./utils/weather')
const { Console } = require('console')

//values from main wrapper function
console.log(__dirname)
console.log(__filename)
//console.log(path.join(__dirname, '../public/'))

const app = express()
const port = process.env.PORT || 3000

//app.com
//app.com/help
//app.com/about

//customizing the server and making default opening public directory containing index.html

const publicDir=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')
//assigns static directory
app.set('view engine', 'hbs')
//custom view path
app.set('views' , viewsPath)
//using hbs
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))


//when get requests come
app.get('',( req , res )=>{

    console.log('default mappings')
    res.render('index',{

        title: 'Weather app',
        name: 'Manish'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{

        title: 'about me',
        name:'Manu'
    })

})
app.get('/help',(req,res)=>{

    res.render('help', [{
        name:'Manish',
        age:28
    },{
        name:'Mrinal',
        age:25
    }

])

})



app.get('/weather',(req,res)=>{

    if(!req.query.address){

        return res.send({
            error: 'Please send some address to search'

        })
    }
    geocode(req.query.address,(error, { latitude, longitude, location } = {} )=>{

        if(error){
            return res.send({error})
        }

        weather(latitude,longitude , (error, forecastData)=>{

            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

    

})

//404 handling
app.get('*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: 'Manish Mrinal',
        errorMessage: 'Page not found.'
    })
})
//port
app.listen(port,()=>{

    console.log('server is up')
})
