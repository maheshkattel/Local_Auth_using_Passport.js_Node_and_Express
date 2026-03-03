const express = require("express")
const session = require("express-session")
const passport = require("passport")
require("./src/strategy/local")
const authRoutes = require("./src/routes/auth")
const connectMongoDB = require("./src/connection/connection")


const app = express();
const PORT = 3000;

// MongoDB Connection if needed
connectMongoDB("mongodb://localhost:27017/mahesh")

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