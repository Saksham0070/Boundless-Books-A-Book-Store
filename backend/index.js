 import express from "express";
 import {PORT} from "./config.js";

const app = express();
// const db = require("./db");
import {db} from "./db.js";
import cors from 'cors';
import bodyParser from "body-parser";
app.use(bodyParser.json()); //req.body

//Middleware for handling CORS POLICY
//Option 1: Allow All Origin with Default CORS POLICY
app.use(cors());
//Option 2: Allow Custom Origin
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// );
// const bookRoutes = require("./routes/bookRoutes");
import bookRoutes from "./routes/bookRoutes.js";

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome to my Book Store');
});

app.use('/book',bookRoutes);

app.listen(PORT,()=>{
    console.log(`App is listening to port : ${PORT}`);
});