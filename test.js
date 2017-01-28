var bcrypt = require("bcrypt");
bcrypt.hash("clo1t3fe", 10).then(hash => {
	console.log(hash);
	process.exit(0);
});