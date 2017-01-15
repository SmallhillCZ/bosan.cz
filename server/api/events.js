var express = require('express');
var router = module.exports = express.Router();		

var ACL = require("../acl");
var acl = ACL.acl;
var acl_check = ACL.acl_check;

var Event = require("../models/event");

/* LIST ALL EVENTS */
router.get("/", acl("events","list"), (req,res) => {
	
	var query = {};
	
	var options = {
		select: "_id name url description from till"
	};
	
	// we want to display RSVP only to certain users
	if(acl_check("events","readRSVP",req)){
		options.select = options.select + " rsvp"; 
		options.populate = {path: "rsvp",select:"name"};
	}
	
	if(req.query.from) query.till = {$gt: new Date(req.query.from)};
	if(req.query.till) query.from = {$lt: new Date(req.query.till)};
	
	if(req.query.sort) options.sort = {"from": req.query.sort === "desc" ? -1 : 1};
	if(req.query.limit) options.limit = Number(req.query.limit);
	if(req.query.page) options.page = Number(req.query.page);

	Event.paginate(query,options)
		.then(events => res.json(events))
		.catch(err => res.sendStatus(500));
	
});

/* EVENT */
router.get("/:id", acl("events","list"), (req,res) => {
	
	// we want to display RSVP only to certain users
	var rsvp = acl_check("events","readRSVP",req);
	
	var select = "_id name url description from till";
	if(rsvp) select = select + " rsvp"; // we want to display RSVP only to certain users
	
	// if ID is 24 character string it might be Event._id:ObjectId or Event.url:String, otherwise it can be just Event.url
	var where = req.params.id.match(/^[0-9a-fA-F]{24}$/) ? {$or: [{url:req.params.id},{_id:req.params.id}]} : {url:req.params.id};
	
	var event = Event.findOne(where); 
	
	if(rsvp) event.populate("rsvp","name"); // we want to display RSVP only to certain users
	
	event
		.then(event => event ? res.json(event) : res.sendStatus(404))
		.catch(err => res.status(500).json(err));
	
});

/* EVENT RSVP */
router.get("/:id/rsvp", acl("events","read"), (req,res) => {
	
	Event.findOne({_id:req.params.id})
		.then(event => event ? res.json(event.rsvp) : res.sendStatus(404))
		.catch(err => res.sendStatus(500));
	
});

router.put("/:id/rsvp/:userId", acl("events","writeRSVP"), (req,res) => {
	
	Event.findOne({_id:req.params.id})
		.then(event => {
			if(!event) return res.sendStatus(404);
		
			if(!event.rsvp.some(item => item == req.params.userId)) event.rsvp.push(req.params.userId);
		
			event.save()
				.then(event => {
					Event.populate(event, {path:"rsvp"}).then(event => res.json(event.rsvp));
				})
				.catch(err => res.sendStatus(500));
				
		})
		.catch(err => res.sendStatus(500));
	
});

router.delete("/:id/rsvp/:userId", acl("events","writeRSVP"), (req,res) => {
	
	Event.findOne({_id:req.params.id})
		.then(event => {
			if(!event) return res.sendStatus(404);
		
			event.rsvp = event.rsvp.filter(item => item != req.params.userId);
		
			event.save()
				.then(event => {
					Event.populate(event, {path:"rsvp"}).then(event => res.json(event.rsvp));
				})
				.catch(err => res.sendStatus(500));
				
		})
		.catch(err => res.sendStatus(500));
	
});