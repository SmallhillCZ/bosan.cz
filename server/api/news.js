var express = require('express');
var router = module.exports = express.Router();		

var ACL = require("../acl");
var acl = ACL.acl;

var News = require("../models/news");

/* LIST ALL NEWS */
router.get("/", acl("news","list"), (req,res) => {
	
	var query = {};
	
	var options = {
		select: "_id title text date creator",
		populate: {path: "creator",select:"name"}
	};
	
	if(req.query.from) query.date = {$gt: new Date(req.query.from)};
	if(req.query.till) query.date = {$lt: new Date(req.query.till)};
	
	if(req.query.sort) options.sort = {"date": req.query.sort === "desc" ? -1 : 1};
	
	if(req.query.limit) options.limit = Number(req.query.limit);
	if(req.query.page) options.page = Number(req.query.page);

	News.paginate(query,options)
		.then(news => res.json(news))
		.catch(err => res.sendStatus(500));
	
});