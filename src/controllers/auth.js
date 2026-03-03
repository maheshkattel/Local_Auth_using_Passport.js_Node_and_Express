const register = (req, res) =>
{
    res.send("Hello World");
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

module.exports = { register, status, logout }