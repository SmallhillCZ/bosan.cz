var express = require('express');
var router = module.exports = express.Router();		

var ACL = require("../acl");
var acl = ACL.acl;
var acl_check = ACL.acl_check;

var Event = require("../models/event");

/* LIST ALL EVENTS */
router.get("/", acl("events","list"), (req,res) => {
	
	var query = {};
	var options = {select: "_id name url perex startDate endDate"};
	
	if(req.query.from) query.startDate = {$gt: new Date(req.query.from)};
	if(req.query.till) query.endDate = {$lt: new Date(req.query.till)};
	
	if(req.query.sort) options.sort = {"from": req.query.sort === "desc" ? -1 : 1};
	if(req.query.limit) options.limit = Number(req.query.limit);
	if(req.query.page) options.page = Number(req.query.page);

	Event.paginate(query,options)
		.then(events => res.json(events))
		.catch(err => res.sendStatus(500));
	
});

/* EVENT */
router.get("/:id", acl("events","list"), (req,res) => {
	
	// if ID is 24 character string it might be Event._id:ObjectId or Event.url:String, otherwise it can be just Event.url
	var where = req.params.id.match(/^[0-9a-fA-F]{24}$/) ? {$or: [{url:req.params.id},{_id:req.params.id}]} : {url:req.params.id};
	
	Event.findOne(where).populate("attending.member","_id nickname name squad birthday")
		.then(event => event ? res.json(event) : res.sendStatus(404))
		.catch(err => res.status(500).json(err));
	
});

router.put("/:id", acl("events","write"), (req,res) => {
	Event.findOneAndUpdate({_id:req.params.id},req.body)
		.then(event => res.sendStatus(200))
		.catch(err => res.sendStatus(500));
});

