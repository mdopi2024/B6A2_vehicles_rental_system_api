import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

const creatVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.creatVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,

        })
    }
}
const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicles();
        res.status(201).json({
            success: true,
            message: result.rows.length === 0 ? "No vehicles found" : "Vehicles retrieved successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            seccess: false,
            message: err.message,
        })
    }
}
const singleVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId
    try {
        const result = await vehicleServices.singleVehicle(id as string);
        res.status(201).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            seccess: false,
            message: err.message,
        })
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId
    try {
        const result = await vehicleServices.updateVehicle(req.body,id as string);
        res.status(201).json({
            success: true,
            message: "Vehicles updated successfully",
            data: result?.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            seccess: false,
            message: err.message,
        })
    }
}


const deleteVehicle = async (req: Request, res: Response) => {
    const id = req.params.vehicleId
    try {
        const result = await vehicleServices.deleteVehicle(id as string);
        res.status(201).json({
            success: true,
            message: "Vehicle deleted successfully",
            
        })

    } catch (err: any) {
        res.status(500).json({
            seccess: false,
            message: err.message,
        })
    }
}



export const vehicleController = {
    creatVehicle,
    getAllVehicles,
    singleVehicle,
    updateVehicle,
    deleteVehicle,
}