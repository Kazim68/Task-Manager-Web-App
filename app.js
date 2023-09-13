const express = require("express")
const router = require("./routes/tasks")
const connect = require("./db/connect")
require("dotenv").config()
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

const app = express()

// middleware
app.use(express.json())

app.use(express.static("public"))

// routes
app.use("/api/v1/tasks", router)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 3000

// start the server
const start = async () => {
    
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`)
        })
    }
    catch (error) {
        console.log(error)
    }
}

start()