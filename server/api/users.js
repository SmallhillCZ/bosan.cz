var express = require('express');
var router = module.exports = express.Router();		

var acl = require("../acl").acl;

var User = require("../models/user");

/* LIST ALL USERS */
router.get("/", acl("users","list"), (req,res) => {
	
	User.find({},"_id name")
		.then(users => res.json(users))
		.catch(err => res.sendStatus(500));
	
});