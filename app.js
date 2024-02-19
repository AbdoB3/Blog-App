const express = require('express');
const app = express()
app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

const postRoutes = require('./routes/postRoutes')
app.use('/post', postRoutes)


app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('somthing brok!')
})

app.listen(3000, () => {
    console.log('listening to pott 3000')
})