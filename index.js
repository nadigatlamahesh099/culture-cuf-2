

const express =require('express')

const dotEnv=require('dotenv')

const mongoose =require('mongoose')

const bodyParser= require('body-parser')

const taskRoutes = require('./routes/taskRoutes');

const cors = require('cors');


dotEnv.config()

const app= express()

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Mongo DB connection successful')
    })
    .catch((error)=>{
        console.log('error',error);
        
    })




// Routes

app.use('/tasks', taskRoutes)


const PORT = process.env.PORT || 3005

app.listen(PORT,()=>{
    console.log(`sever started at ${PORT}`);
    
})