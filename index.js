const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  
});
app.post("/", function (req, res) {
    
    
const unit = "metric";
const query =req.body.cityName;
const apiKey = "59a7c5693041ec16bfda9df6c4352951";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;


https.get(url, function (response) {
     console.log(response.statusCode);
     response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const weatherTemp = weatherData.main.temp
        console.log(weatherTemp); 
        const weatherDescription = weatherData.weather[0].description
        console.log(weatherDescription);
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon +  "@2x.png";
     
         res.write("<p>the current weather discription is " +  icon + " cloud</p>")
         res.write("<h1>the current weather in " + query + " is " + weatherTemp + " degree celcius</h1> " )
         res.write( "<img src= " + imageURL + ">");
         res.write("<h2>" + weatherDescription + "</h2>")
        
         res.send();
        
     })
  
 });

 
    
});




app.listen(3000, function () {

    console.log("server is running on port 3000");
    
})