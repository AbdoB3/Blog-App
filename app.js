require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
app.use(express.json());
const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI;
const port = process.env.PORT;



mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

app.use(
  session({
    secret: 'mySecretKey', // Secret key used to sign the session ID cookie
    resave: false, // Whether to save the session for every request, even if it hasn't changed
    saveUninitialized: true // Whether to save uninitialized sessions (new but not modified)
  })
);

const postRoutes = require('./routes/postRoutes')
app.use('/post',postRoutes)



const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)



app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('somthing brok!')
})

app.listen(port, () => {
    console.log('listening to port ',port)
})