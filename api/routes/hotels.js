import express from "express"
const router=express.Router();
import Hotel from "../models/Hotel.js";

router.post("/", async (req, res)=>{
    const newHotel= new Hotel(req.body)


    try{
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)

    }
    catch(err){
        res.status(500).json(err)
          
    }

})


router.put("/:id", async(req, res)=>{
    try {
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
           
    }
    catch(err){
        res.status(500).json(err)
          
    }
})


router.delete("/:id", async(req, res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
           
    }
    catch(err){
        res.status(500).json(err)
          
    }
})


router.get("/:id", async(req, res)=>{

    try {
        const hotel= await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
           
    }
    catch(err){
        res.status(500).json(err)
          
    }
})


router.get("/", async(req, res, next)=>{

    console.log("Hi! I am in a hotel route")
    
    try {
        const hotels= await Hotel.find();
        res.status(200).json(hotels)
           
    }
    catch(err){
        next(err)
          
    }
})







export default router;