import { Request, Response } from "express";
import { usersServices } from "./users.services";
import { JwtPayload } from 'jsonwebtoken';

const signupUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.signupUsers(req.body);
        console.log(result)
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const loginUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.loginUsers(req.body);
        res.status(201).json({
            success: true,
            message: "Login successful",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getAllUser();
        res.status(201).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: true,
            message: err.message,
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const user = req?.user
    const id = req.params.userId
    try {
        const result = await usersServices.updateUser(req.body, user as JwtPayload, id as string);
        res.status(201).json({
            success: true,
            message: "Users updated successfully",
            data: result?.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: true,
            message: err.message,
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.userId
    try {
        const result = await usersServices.deleteUser(id as string);
        res.status(201).json({
            success: true,
            message: "Users deleted successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: true,
            message: err.message,
        })
    }

}

export const usersController = {
    signupUsers,
    loginUsers,
    getAllUser,
    updateUser,
    deleteUser,
}