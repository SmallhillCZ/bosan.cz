var express = require('express');
var router = module.exports = express.Router();		

var acl = require("../acl").acl;

var User = require("../models/user");

var bcrypt = require("bcrypt");

/* LIST ALL USERS */
router.get("/", acl("users","list"), (req,res) => {
	
	User.find({},"_id name")
		.then(users => res.json(users))
		.catch(err => res.sendStatus(500));
	
});

/* LIST ALL USERS */
router.post("/", acl("users","create"), (req,res) => {
	
	var userData = req.body;
	
	if(!userData.login) return res.status(400).send("Login missing.");
	
	userData.login = userData.login.toLowerCase();
	
	bcrypt.hash(userData.password, 10).then(hash => {
		
		// overwrite password field with hash
		userData.password = hash;

		User.create(userData)
			.then(user => {
				res.json({
					"_id": user._id,
					"login": user.login,
					"email": user.email,
					"roles": user.roles
				});
			})
			.catch(err => res.sendStatus(500));
	});
	
	
	
});