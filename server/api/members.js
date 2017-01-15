var express = require('express');
var router = module.exports = express.Router();		

var acl = require("../acl").acl;

var Member = require("../models/member");

/* LIST ALL USERS */
router.get("/", acl("members","list"), (req,res) => {
	
	Member.paginate({},"_id name nickname squad")
		.then(members => res.json(members))
		.catch(err => res.sendStatus(500));
	
});