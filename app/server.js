import express from "express";
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
import userRouter from "./routes/userRoutes.js";
import connect from "./config/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import solutionRouter from "./routes/solutionRoutes.js";
import signatureRouter from "./routes/genSignature.js";
import resourceRouter from "./routes/resourceRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import deepDiveRouter from "./routes/deepDive.js";



const app = express();
connect();

const whitelist = ['http://localhost:3000', 'https://auth.mahmud1.xyz', 'https://datu.mahmud1.xyz', 'http://datu.mahmud1.xyz/'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(!origin){
      return callback(null, true);
    }
    if(whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res) => {
  res.status(200).json({message:"App is running"})
})

app.use('/api/users', userRouter);
app.use('/api/solutions', solutionRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/gensignature', signatureRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/deepdive', deepDiveRouter);



app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}`)
})