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

app.use('/users',userRoute)
app.use('/auth',authRoute)

const port = process.env.PORT || 8080
app.listen(port, console.log(`Listening on port ${port}...`))