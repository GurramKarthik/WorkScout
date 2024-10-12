import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cookie from "cookie-parser";  // Used to parse the cookie in the server
import cors from "cors";
import dotenv from "dotenv"; // used to get enironment variables from .env file.
dotenv.config({});
import mongoDb from "./utils/db.js";


const app = express();


const port =  process.env.PORT || 3000; 
// if port is not avilable in .env then 3000 is port number

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie());
const corsOptions ={
    origin:"https//localhost:5173", // this is react's url
    Credential:true
} 
app.use(cors(corsOptions));




app.listen(port, ()=>{
    console.log(`listening to port ${port}....`);
    mongoDb();
})
