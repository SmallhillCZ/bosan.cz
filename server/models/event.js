var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	"name": String,
	"url": { type: String, index: true },
	"perex": String,
	"description":String,
	"startDate": Date,
	"startPlace": String,
	"endDate": Date,
	"endPlace": String,
	"attending": [{
		"member": {type: mongoose.Schema.Types.ObjectId, ref: "Member"},
		"role": String,
		"days": Number
	}],
	"expenses": [{
		"id": Number,
		"description": String,
		"amount": Number
	}]
});

module.exports = mongoose.model('Event', eventSchema);