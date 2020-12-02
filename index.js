require('dotenv').config()  //read info from .env file
const express = require('express')  //importing express
const mongoose = require('mongoose')   //importing library to help connect with mongodb
// const bodyParser = require('body-parser')

const app = express()

// app.use(bodyParser.json({type: "application/*+json"}))

// variables
const dbLink = process.env.DBLINK
const port = process.env.PORT
const userRoute = require('./src/routes/userRoute')
const { urlencoded } = require('body-parser')

mongoose.connect(dbLink, {useNewUrlParser: true,
     useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }, () => {
    app.listen(port, () => {
        console.log('DATABASE IS CONNECTED, app is up!')
    });
});

// json parser
app.use(express.json());

// route
app.use(userRoute)

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello</h1>')
}) 




