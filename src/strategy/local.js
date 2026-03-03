const passport = require("passport")
const strategy = require("passport-local")
const mockUsers = require("../utils/constants")

passport.serializeUser((user, done) =>
{
    console.log("Inside Serialize user");
    console.log(user);
    done(null, user.id)
})


passport.deserializeUser((id, done) =>
{
    console.log("Inside DE-Serialize user");
    console.log(`DE-Serializing userId : ${id}`);
    try {
        const user = mockUsers.find((user) => user.id === id) 
        if (!user) throw new Error("User Not Found");
        done(null, user) // ← ADD THIS pass null for error
    } catch (error) {
        done(error, null)      
    }
})

passport.use(new strategy(
    (username, password, done) =>
    {
        console.log(`$username`);
        // Example - replace with your actual user lookup
        const findUser = mockUsers.find((user) => user.username === username) // your DB call here
        if (!findUser) throw new Error("User Not Found")
        if (findUser.password !== password) return done(null, false, { message: "Wrong password" })
        return done(null, findUser)
    }
))

module.exports = passport;