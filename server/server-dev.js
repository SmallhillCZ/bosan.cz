var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bosan-cz');
mongoose.Promise = global.Promise;

app.use("/api",require("./routers/api.js"));

app.use(require("./routers/static"));

app.get('*',(req,res) => {
	res.sendFile("app/index.html", { root: __dirname + "/.." });	
});

app.listen(3000, function () {
	console.log('Bosan.cz server listening!')
})