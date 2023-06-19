import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"


const app=express()
dotenv.config()


const connect=async()=>{    
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
  
} 
  catch (error) {
    throw error;
  }

}


mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB connected!")
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!")
})



// middlewares

// Enable JSON parsing middleware
app.use(express.json())




app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);



app.use((err, req, res, next)=>{
  const errorstatus=err.status || 500
  const errorMessage=err.status || "Something went wrong!"
  
  return res.status(errorstatus).json(
    {
      success:false,
      status:errorstatus,
      message: errorMessage,
      statck: err.statck

    })
  
})
 

// ====================================================
// Start the server
app.listen(8800, ()=>{ 
    // This connect function is called from up;
    connect()
    console.log("Connected to backend")
})