var express = require('express');
var app = express();

var compression = require('compression');
app.use(compression());

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bosan-cz');
mongoose.Promise = global.Promise;
mongoose.plugin(require("mongoose-paginate"));

app.use("/api",require("./api/index"));

app.use(require("./static"));

app.get('*',(req,res) => {
	res.sendFile("aot/index.html", { root: __dirname + "/.." });	
});

app.listen(3000, function () {
	console.log('Bosan.cz Server listening!')
})