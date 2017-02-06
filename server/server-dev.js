var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json({limit:"5mb"})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit:"5mb" })); // support encoded bodies


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bosan-cz');
mongoose.Promise = global.Promise;

var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('./mongo-config.js');
mongoose.plugin(require("mongoose-paginate"));

app.use('/db', mongo_express(mongo_express_config))

app.use("/api",require("./api/index"));

app.use(require("./static"));

app.get('*',(req,res) => {
	res.sendFile("app/index.html", { root: __dirname + "/.." });	
});

app.listen(3000, function () {
	console.log('Bosan.cz server listening!')
})