var express = require('express');
var router = express.Router();

var acl = require("../acl").acl;

var User = require("../models/user");

var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

function createToken(user){
	return new Promise((resolve,reject) => {
		// we want to send only some values
		var tokenData = {
			"_id": user._id,
			"name": user.name,
			"roles": user.roles
		};

		// generate token with 1 day validity
		var tokenOptions = {
			expiresIn: "1 day"
		};

		jwt.sign(tokenData, "kaj;aliuew ;932fjadkjfp9832jf;dlkj", tokenOptions, (err,token) => {
			if(err) reject(err);
			else resolve(token);
		});
	});
}

router.post("/", acl("users","login"), (req,res) => {
	
	if(!req.body.email) return res.status(400).send("Email missing.");

	User.findOne({email:req.body.email.toLowerCase()}).then((user) => {

		if(!user) return res.status(404).send("User not found");

		bcrypt.compare(req.body.password, user.password, (err, same) => {
			if(same){
				
				createToken(user)
					.then(token => res.send(token))
					.catch(err => res.sendStatus(500));
				
			} else {
				res.status(401).send("Wrong password.");
			}
		});
		
	});
});

router.post("/email", acl("users","login"), (req,res) => {
	
	if(!req.body.email) return res.status(400).send("Email missing.");
	
	User.findOne({email:req.body.email.toLowerCase()}).then((user) => {
		
		if(!user) return res.status(404).send("User not found");
	
		createToken(user)
			.then(token => {
				//TODO: send token by mail 
				res.sendStatus(200);
			})
			.catch(err => res.sendStatus(500));
		
	});
});


module.exports = router;