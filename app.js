const express = require("express");
const https = require("https");
const app = express();


app.get("/", function(req,res){

    const url="https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=844e25a59dcf84f0fb68bd06bf58a3c7";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            console.log(data);
        })
    });
    res.send("Server is running");
})




app.listen(3000, function() {console.log("Server is running on port 3000")});