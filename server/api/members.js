var express = require('express');
var router = module.exports = express.Router();		

var acl = require("../acl").acl;

var Member = require("../models/member");

/* LIST ALL USERS */
router.get("/", acl("members","read"), (req,res) => {
	
	Member.paginate({})
		.then(members => res.json(members))
		.catch(err => res.sendStatus(500));
	
});

router.get("/:id", acl("members","read"), (req,res) => {
	
	Member.findOne({_id:req.params.id})
		.then(member => res.json(member))
		.catch(err => res.sendStatus(500));
	
});