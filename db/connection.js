// import mongoose
const mongoose=require('mongoose')

// initialising connection string to a variable 
const db=process.env.database

// connection using mongoose
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})