const express=require('express');
const cors =require('cors')
const app=express();

app.use(cors())
app.use(express.json())


//Route imports
const patient=require("./routes/patientRoute");


app.use("/api/v1",patient)




module.exports=app;