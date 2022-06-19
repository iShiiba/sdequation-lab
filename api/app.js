require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db")

//database connection
connection();

//middlewares
app.use(express.json())
app.use(cors())

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const exerciseRoute = require('./routes/exercises')

app.use('/users',userRoute)
app.use('/auth',authRoute)
app.use('/exercises',exerciseRoute)

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}...`))