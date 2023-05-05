// automatically load env file to app using config
require('dotenv').config()

// import connection file
require('./db/connection')

// import express
const express=require('express')

// import router
const router=require('./routes/router')

// create server app
const server=express()

// variable to hold port number because it is dynamic
const port=3000

// run server
server.listen(port,()=>{
    console.log(`server started working at port number: ${port}`);
})

// import cors
const cors =require('cors')

// use server app and routes
server.use(cors())
server.use(express.json())
server.use(router)

// route 
server.get('/',(req,res)=>{
res.status(200).json('cart server started working')
})
