const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dibyanshu Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dibyanshu Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dibyanshu Singh'
    })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please Provide an address",
    });
  }
  // property short hand syntax 👇
    geoCode(req.query.address, (error, { latitude, longitude, location }={}) =>{
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, location, (error, response) => {
        if (error) {
          return res.send({error});
        } 
        res.send({
           response
        });
            
      });
    
  });
//   res.send({
//     forecast: "It is snowing",
//     location: "Philadelphia",
//     address: req.query.address,
//   });
})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
          error: "Please Provide Search Term",
        });
    }
    console.log(req.query);
    res.send({
        products:[]
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dibyanshu Singh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dibyanshu Singh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})