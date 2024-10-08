const jwt = require("jsonwebtoken");
const asyncHandler = require('../middleware/asyncHandler')

const protect = asyncHandler(async (req, res, next) => {
	try {
		const token = req.headers.authorization.replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWTSecret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({
			message: "Authentification Failed - No Token",
		});
	}
});

const admin = asyncHandler((req, res, next) => {
	if (req.user && req.user.isAdmin) {
	  next();
	} else {
	  res.status(401);
	  throw new Error("Not authorized as admin");	
	}
  });
  

module.exports = { protect, admin };