var express = require('express');

var jwt = require('express-jwt');

var router = module.exports = express.Router();

/* JSON Web Token Authentication */
var jwtOptions = {
	secret: "kaj;aliuew ;932fjadkjfp9832jf;dlkj",
	credentialsRequired: false
};
router.use(jwt(jwtOptions));

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status);
		res.send("Unauthorized" + (err.message ? ": " + err.message : ""));
  }
});
				
/* API routes */
router.use("/events", require("./events"));

router.use("/users", require("./users"));

/* IF no route matches */
router.get("*", (req,res) => res.sendStatus(404));