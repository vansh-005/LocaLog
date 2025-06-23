const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require("dotenv")
const rateLimit = require("express-rate-limit")
const RedisStore = require("rate-limit-redis")
const { createClient } = require("redis")
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

// Create express app
const app = express()

// dotenv config
dotenv.config()

// Enable CORS
app.use(cors({ origin: process.env.CLIENT_URL}))

// Parse JSON bodies
app.use(express.json())

const redisClient = createClient({ url: process.env.REDIS_URL })
redisClient.connect().catch(console.error)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
    })
})
app.use(limiter)

//initialize the port-Enter a port
const port = process.env.PORT

/*db connection
MONGO_URL - Enter the DB url '*/
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected!"))
.catch(err => {
    console.error("MongoDB connection error:", err)
    // Terminate the application if unable to connect MongoDB
    process.exit(1)
  })

    // API Routes
    app.use("/api/pins", pinRoute)
    app.use("/api/user", userRoute)

app.listen(port,()=>{
    console.log("Backend is Running")
})