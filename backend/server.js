const app=require("./app")

const dotenv=require('dotenv')

const connectDatabase = require("./config/db");

//config

dotenv.config({path:'./config/config.env'});

//db connnection
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`server is working on ${process.env.PORT}`)
})
