const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

const asyncHandler = require("../middleware/asyncHandler");

const signup = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;

	if ((!userName || !email || !password)) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ msg: "Invalid email format" });
	}

	
	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: "Email already in use" });
		} else {
			const newUser = new User({
				userName,
				email,
				password,
				isAdmin: false,
			});

			const hash = await bcrypt.hash(password, 10);
			newUser.password = hash;

			await newUser.save();

			return res.status(201).json({ msg: "User created" });
		}
	} catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

const signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ msg: "No user found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ msg: "Authentication failed - wrong password" });
		}

		const { email: userEmail, userName, isAdmin} = user;
		const jwtToken = jwt.sign(
			{
				email: userEmail,
				userName,
				isAdmin,
			},
			process.env.JWTSecret,
			{
				expiresIn: "6h",
			}
		);

		res.cookie("accessToken", jwtToken, { httpOnly: true, maxAge: 36000000 });

		return res.status(200).json({
			accessToken: jwtToken,
			email,
			userName,
			isAdmin,
		});
	} catch (err) {
		return res.status(401).json({
			msg: err.message,
		});
	}
});

const signout = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ msg: "Logout successful" });
});

const getUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const verifyUser = await User.findById(id);
		if (!verifyUser) {
			return res.status(403).json({ msg: "User not found" });
		} else {
			return res.status(200).json({
				verifyUser,
			});
		}
	} catch (error) {
		return res.status(401).json({ msg: error.message });
	}
});

const getUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find();
		if (!users || users.length === 0) {
			return res.status(404).json({ msg: "No users found" });
		}

		return res.status(200).json(users);
	} catch (err) {
		return res.status(401).json({ msg: err.message });
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(403).json({ msg: "User not found" });
		} else {
			user.userName = req.body.userName || user.userName;
			user.email = req.body.email || user.email;
			user.password = req.body.password || user.password;

            if (req.body.password) {
                const hash = await bcrypt.hash(req.body.password, 10);
                user.password = hash;
            }

			const updatedUser = await user.save();

			console.log("Response:", res);

			res.status(200).json({
				username: updatedUser.userName,
				email: updatedUser.email,
				password: updatedUser.password,
			});
		}
	} catch (error) {
		return res.status(401).json({ msg: error.message });
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error("Cannot delete admin user");
		}
		await User.deleteOne({ _id: user._id });
		res.status(200).json({ message: "User deleted successfully" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

module.exports = {
	signup,
	signin,
	signout,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
};
