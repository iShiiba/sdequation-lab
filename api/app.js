require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db")
const router = express.Router();
const path = require('path')

//database connection
connection();

//middlewares
app.use(express.json())
app.use(cors())

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const exerciseRoute = require('./routes/exercises')
const summaryRoute = require('./routes/summary')

app.get("/doc", (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.use('/users',userRoute)
app.use('/auth',authRoute)
app.use('/exercises',exerciseRoute)
app.use('/summary',summaryRoute)


const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}...`))