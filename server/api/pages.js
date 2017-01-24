var express = require('express');
var router = module.exports = express.Router();

var acl = require("../acl").acl;

var Page = require("../models/page");

/* LIST ALL EVENTS */
router.get("/", acl("pages","list"), (req,res) => {

	Page.aggregate([{$match: {}}, {$project: {_id: true, url: true, title: true, files: {$size: '$files'}}}])
		.then(pages => pages ? res.json(pages) : res.sendStatus(404))
		.catch(err => res.status(500).json(err));
	
});

/* EVENT */
router.get("/:id", acl("pages","read"), (req,res) => {
	
	// if ID is 24 character string it might be Event._id:ObjectId or Event.url:String, otherwise it can be just Event.url
	var where = req.params.id.match(/^[0-9a-fA-F]{24}$/) ? {$or: [{url:req.params.id},{_id:req.params.id}]} : {url:req.params.id};
	
	Page.findOne(where).populate("changes.user","_id name")
		.then(page => page ? res.json(page) : res.sendStatus(404))
		.catch(err => res.status(500).json(err));
	
});

router.post("/", acl("pages","write"), (req,res) => {
	
	var pageData = req.body;
	pageData.changed = new Date();
	
	Page.create(pageData)
		.then(page => res.json(page))
		.catch(err => res.sendStatus(500));
	
});

router.put("/:id", acl("pages","write"), (req,res) => {
	
	var pageData = req.body;
	pageData.changed = new Date();
	if(req.user) pageData.changes.push({user:req.user._id,changed: new Date()});
	
	Page.findOneAndUpdate({_id:req.params.id}, pageData, {upsert:true, new: true})
		.then(page => (page ? res.json(page) : res.sendStatus(404)))
		.catch(err => res.sendStatus(500));
	
});

router.delete("/:id", acl("pages","write"), (req,res) => {
	
	Page.remove({_id:req.params.id})
		.then(() => res.sendStatus(200))
		.catch(err => res.sendStatus(500));
	
});