const bcrypt = require("bcrypt")

function hashPassword(password)
{
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}


function comparePassword(rawPassword, hash)
{
    return bcrypt.compareSync(rawPassword, hash);
}
module.exports = { hashPassword, comparePassword }