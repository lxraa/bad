const express = require("express");

const app = express();


app.use("/static",express.static(__dirname + "/fe"));

app.listen(3001,function(){
	console.log("listen 3001");
});


