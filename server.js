const express = require("express");
const cors = require("cors");
const app = express();
const axios = require('axios')
const cheerio = require('cheerio')
const XLSX = require('xlsx')
// set port, listen for requests
const PORT = process.env.PORT || 3000;


function getassetdata(){
  var title = document.getElementById('title').value;
  //console.log(assetnumber);
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/getdata/"+title,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache"
      }
    }}


var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { findById } = require("./app/models/gpsdata");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
 
});
require("./app/routes/vehicle.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



//web scraping

const url = 'http://localhost:4200/vehicles'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('#divf', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    url
                })
                //excel sheet generation
                const workSheet = XLSX.utils.json_to_sheet(articles);
                const workBook = XLSX.utils.book_new();
            
                XLSX.utils.book_append_sheet(workBook, workSheet, "articles")
                // Generate buffer
                XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
            
                // Binary string
                XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
            
                XLSX.writeFile(workBook, "articles.xlsx")
                
            })
            res.json(articles)
        }).catch(err => console.log(err))

        

})


//mqtt
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com')

client.on('connect', function () {
  client.subscribe('testnewlatone', function (err) {})
  client.subscribe('testnewlonone', function (err) {})
  client.subscribe('testnewdis', function (err) {})
  client.subscribe('testnewlat2', function (err) {})
  client.subscribe('testnewlon2', function (err) {})
  client.subscribe('testnewassetno', function (err) {})
    // if (!err) {
    //   client.publish('presence/new', 'Hello mqtt')
    // }
 
  client.on('message', function (topic, message,packet) {
    // message is Buffer
    console.log(message.toString())

   
      
      
      
      
     
        if (topic === 'testnewassetno'){
         
          db.vehicles.create( {title: message.toString()}, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");

            
          
          }); }

          
   
    
    
   
    if (topic === 'testnewlatone'){

      
      
      
      var newvalues = { $set: {latitude: message.toString()}
    };
  
    
      
      db.vehicles.findOne().sort({_id:-1}).updateOne( newvalues, function(err, res) {
        
          if (err) throw err;
          console.log("1 document updated");
        
        }); }

        
    if (topic === 'testnewlonone'){
      var newvalues = { $set: {longitude: message.toString(), }};
      db.vehicles.updateOne( newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        
        }); }

        if (topic === 'testnewlat2'){
          var newvalues = { $set: {latitudet: message.toString(), }};
          
          db.vehicles.updateOne( newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            
            }); }
    
            
        if (topic === 'testnewlon2'){
          var newvalues = { $set: {longitudet: message.toString(), }};
          db.vehicles.updateOne( newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            
            }); }

        if (topic === 'testnewdis'){
          var newvalues = { $set: {description: message.toString(), }};
          db.vehicles.updateOne( newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            
            }); }
    
  })
  
})









