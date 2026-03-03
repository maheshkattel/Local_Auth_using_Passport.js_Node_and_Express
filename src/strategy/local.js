const passport = require("passport")
const { Strategy } = require("passport-local")
const mockUsers = require("../utils/constants")
const User = require("../schema/user")
const { comparePassword } = require("../utils/helper")

passport.serializeUser((user, done) =>
{
    console.log("Inside Serialize user");
    console.log(user);
    done(null, user.id)
})


passport.deserializeUser(async (id, done) =>
{
    console.log("Inside DE-Serialize user");
    console.log(`DE-Serializing userId : ${id}`);
    try {
        const user = await User.findById(id)
        if (!user) throw new Error("User Not Found");
        done(null, user) // ← ADD THIS pass null for error
    } catch (error) {
        done(error, null)
    }
})

passport.use(new Strategy(
    { usernameField: "email" },        // #1
    async (email, password, done) =>
    {
        if (!email || !password) {
            return done(null, false, { message: "Missing credentials" })  // #3
        }
        try {
            const userDB = await User.findOne({ email })
            if (!userDB) return done(null, false, { message: "User not found" })

            const isPasswordValid = comparePassword(password, userDB.password)  //  #2
            if (isPasswordValid) {
                return done(null, userDB)
            } else {
                return done(null, false, { message: "Invalid password" })  //  #5
            }
        } catch (error) {
            return done(error)
        }
    }
))

module.exports = passport;