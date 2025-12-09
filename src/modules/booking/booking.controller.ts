import { Request, Response } from "express";
import { bookingServices } from "./booking.services";
import { JwtPayload } from "jsonwebtoken";

const creatBooking = async(req:Request,res:Response)=>{
     try {
            const result = await bookingServices.creatBooking (req.body);
            res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: result
            })
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message,
    
            })
        }
    }


const getAllBooking = async(req:Request,res:Response)=>{
    console.log(req.body)
try{
    res.status(200).json({
        success:true,
        message:'done'
    })
}catch(err:any){
    console.log(err)
    res.status(500).json({
        success:false,
        message:err.message,
       
    })
}
}

const updateBooking= async(req:Request,res:Response)=>{
    const id = req.params.bookingId;
    const user= req.user
    try{
        const result = await bookingServices.updateBooking(req.body,user as JwtPayload,id as string);
        res.status(201).json({
            success:true,
            message:"updated booking succefully",
            data:result
        })
    }catch(err:any){
        res.status(201).json({
            success:false,
            message:err.message
        })
    }
}

export const bookingController ={
    creatBooking,
    getAllBooking,
    updateBooking,
}