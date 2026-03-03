const express = require("express");
const router = express.Router();
const passport = require("passport")
require("../strategy/local")
const { register, login, status, logout } = require("../controllers/auth")

router.post("/", passport.authenticate("local"), (req, res) =>
{
    res.status(200).json({ message: "Logged in successfully", user: req.user })
})
router.post("/register", register)
router.post("/login", login)
router.post("/passport/login", (req, res, next) =>
{
    passport.authenticate("local", (err, user, info) =>
    {
        if (err) return res.status(500).json({ msg: "Server error" })
        if (!user) return res.status(401).json({ msg: info.message })

        req.logIn(user, (err) =>
        {
            if (err) return res.status(500).json({ msg: "Login error" })
            return res.status(200).json({ msg: "Login Successful", user })
        })
    })(req, res, next)
})

router.get("/status", status)
router.post("/logout", logout)

module.exports = router;