const User = require("../schema/user")
const { hashPassword, comparePassword } = require("../utils/helper")
const register = async (req, res) =>
{
    const { email, password } = req.query;
    const userDB = await User.findOne({ email })
    if (userDB) {
        res.status(400).json({ msg: "User already Exists" })
    }
    else {
        const hashedPassword = hashPassword(password);
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ msg: "User created successfully" })
    }
}


const login = async (req, res) =>
{
    const { email, password } = req.query;
    if (!email || !password) return res.status(400).json({ "msg": "please provide valid credentials" })

    const userDB = await User.findOne({ email });
    if (!userDB) return res.status(401).json({ "msg": "No User found" })

    const isPasswordvalid = comparePassword(password, userDB.password)
    if (isPasswordvalid) {
        res.status(200).json({ "msg": "Login Successful" })
    }
    else {
        res.status(400).json({ "msg": "Invalid Credentials Provided" })
    }
}

const status = (req, res) =>
{
    console.log(req.user);
    console.log(req.session);
    return req.user ? res.send(req.user) : res.sendStatus(401);

}

const logout = (req, res) =>
{
    if (!req.user) return res.sendStatus(401);
    req.logout((err) =>
    {
        if (err) return res.sendStatus(400);
        res.send(200);
    })

}

module.exports = { register, login, status, logout }