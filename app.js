const express = require('express');
const app = express()
const session = require('express-session');
app.use(express.json());

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

app.listen(3000, () => {
    console.log('listening to pott 3000')
})