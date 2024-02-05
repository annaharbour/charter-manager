const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')
const {
	getUser,
    getUsers,
    signup,
    deleteUser,
    updateUser,
    signin,
    signout,
} = require("../controllers/authController.js");

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/signout", signout);

router.route("/:id").get(protect, admin, getUser).put(protect, admin, updateUser).delete(protect, admin, deleteUser)
router.route("/").get(protect, admin, getUsers);

module.exports = router;
