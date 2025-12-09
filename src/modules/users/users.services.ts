
import bcrypt from "bcryptjs";
import { pool } from "../../config/database";
import jwt from 'jsonwebtoken'
import { config } from "../../config";
import { resourceUsage } from "process";
const signupUsers = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;
    const pass = password as string
    if (pass.length < 6) {
        throw new Error("Password must be at least 6 characters")
        return
    }
    if (role !== 'customer' && role !== 'admin') {
        throw new Error("Role is not valid. Role must be 'admin' or 'customer'.")
        return
    }

    const hashPassword = await bcrypt.hash(pass, 12);

    const userQuery = "INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const result = await pool.query(userQuery, [name, email, hashPassword, phone, role]);
    delete result.rows[0].password;
    return result.rows[0]

}


const loginUsers = async (payload: Record<string, unknown>) => {
    const { email, password } = payload;
    const userByEmailQuery = "SELECT * FROM users WHERE email =$1";
    const result = await pool.query(userByEmailQuery, [email]);
    const user = result.rows[0]

    if (result.rows.length === 0) {
        throw new Error("user does not exits")
        return
    }

    const isMachedPass = await bcrypt.compare(password as string, user.password)

    if (!isMachedPass) {
        throw new Error("Password does not match")
        return
    }

    const token = jwt.sign({id:user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }, config.jwt_secret as string, { expiresIn: "7d" })
    delete user.password

    return { token, user }

}

const getAllUser = async () => {
    const getAllUsreQuery = "SELECT * FROM users";
    const result = await pool.query(getAllUsreQuery);
    return result;
}

const updateUser = async (payload: Record<string, unknown>, payloar2: Record<string, unknown>, id: string) => {

    const isAxist = await pool.query('SELECT * FROM users WHERE id=$1', [id])
    if (isAxist.rows.length === 0) {
        throw new Error("user not found");
    }
    const user = isAxist.rows[0]
   
    if (payloar2.role === "customer" && payloar2?.email !== user?.email) {
        throw new Error("You can only update you profile");
        return
    }

    const {name, email,phone,role}= payload;
    const updateQuery = "UPDATE users SET name = $1, email = $2, phone =$3, role =$4  WHERE id = $5 RETURNING *";

    const result = await pool.query(updateQuery,[name,email,phone,role,id])
   
    return result
}

const deleteUser= async(id:string)=>{
    const isBookedById = await pool.query('SELECT * FROM bookings WHERE customer_id =$1',[id]);
    const isUserAxist = await pool.query('SELECT * FROM users WHERE id = $1',[id]);

    if(isUserAxist.rows.length === 0){
        throw new Error("This user does not exist")
    }


   if(isBookedById.rows.length && isBookedById.rows[0].status === 'active'){
    throw new Error("This user booking status is Active")
   }

   const deleted = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',[id])

   return deleted.rows[0]
}

export const usersServices = {
    signupUsers,
    loginUsers,
    getAllUser,
    updateUser,
    deleteUser,
}