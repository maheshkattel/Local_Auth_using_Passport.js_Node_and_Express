const express = require("express");
const router = express.Router();
const passport = require("passport")
require("../strategy/local")
const { register,status,logout } = require("../controllers/auth")

router.post("/", passport.authenticate("local"), (req, res) =>
{
    res.status(200).json({ message: "Logged in successfully", user: req.user })
})
router.post("/register", register)
router.get("/status", status)
router.post("/logout", logout)

module.exports = router;