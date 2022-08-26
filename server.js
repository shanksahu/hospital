// import pakages and module
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const dotenv = require('dotenv').config()

//import routers
const detailsRouter = require('./router/hospitalDetailsRoute') 

//middleware
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//routers
app.get('/',(req, res)=>{
    res.send('welcome to Hospital management App')
})
app.use(detailsRouter)


app.listen(process.env.PORT,()=>{
    console.log('server is listning at port ',process.env.PORT);
})

