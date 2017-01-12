var express = require('express');
var router = module.exports = express.Router();		

var ACL = require("../acl");
var acl = ACL.acl;
var acl_check = ACL.acl_check;

var Event = require("../models/event");

/* LIST ALL EVENTS */
router.get("/", acl("events","list"), (req,res) => {
	
	// we want to display RSVP only to certain users
	var rsvp = acl_check("events","readRSVP",req);
	
	var select = "_id name url description from till";
	if(rsvp) select = select + " rsvp"; // we want to display RSVP only to certain users
	
	var events = Event.find({},select);
	
	if(rsvp) events.populate("rsvp","name"); // we want to display RSVP only to certain users
	
	events
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

router.post("/:id/rsvp", acl("events","writeRSVP"), (req,res) => {
	
	if(!req.body.id) return res.status(400).send("Missing parameter id.");
	if(typeof req.body.attending == "undefined") return res.status(400).send("Missing parameter attending.");
	
	Event.findOne({_id:req.params.id})
		.then(event => {
			if(!event) return res.sendStatus(404);
		
			event.rsvp = event.rsvp.filter(item => item != req.body.id);
			if(req.body.attending == true) event.rsvp.push(req.body.id);
		
			event.save()
				.then(event => {
					Event.populate(event, {path:"rsvp"}).then(event => res.json(event.rsvp));
				})
				.catch(err => res.sendStatus(500));
				
		})
		.catch(err => res.sendStatus(500));
	
});