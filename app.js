const express = require("express");
const https = require("https");
const app = express();


app.get("/", function(req,res){

    const url="https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=844e25a59dcf84f0fb68bd06bf58a3c7&units=metric";
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
            res.write("<h1>The temperature in Paris is "+temp+" degree Celcius</h1><h3>The weather Description is "+weatherDescription+"</h3>");
            res.write("The weather icon is <img src="+imageURL+"></img>");
            res.send();
        })
    });
    // res.send("Server is running");
})




app.listen(3000, function() {console.log("Server is running on port 3000")});