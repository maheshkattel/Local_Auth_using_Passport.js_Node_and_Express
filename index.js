const express = require("express")
const session = require("express-session")
const passport = require("passport")
const authRoutes = require("./src/routes/auth")



const app = express();
const PORT = 3000;

// MongoDB Connection if needed


// Middlewares if available
app.use(express.json())
app.use(session({
    secret: "Hello from Mahesh",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/api/auth", authRoutes)



app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));