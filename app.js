const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const appID= "844e25a59dcf84f0fb68bd06bf58a3c7";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid="+appID+"&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            const weather= JSON.parse(data);
            const temp=weather.main.temp;
            // console.log(temp);
            const weatherDescription=weather.weather[0].description;
            const icon=weather.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius</h1><h3>The weather Description is "+weatherDescription+"</h3>");
            res.write("<img src="+imageURL+"></img>");
            res.send();
        })
    });

})




app.listen(3000, function() {console.log("Server is running on port 3000")});