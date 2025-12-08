import { pool } from "../../config/database";
import { Result } from 'pg';

const creatVehicle = async (payload: Record<string, unknown>) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
  const types: string[] = ['car', 'bike', 'van', 'SUV']
  if (!types.includes(type as string)) {
    throw new Error("Invalid type")
    return
  }

  if (daily_rent_price as number <= 0) {
    throw new Error("daily_rent_price must be positive number")
    return
  }

  if (availability_status !== 'available' && availability_status !== 'booked') {
    throw new Error("Invalid availablility status")
    return
  }

  const creatVehicleQurery = "INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *";

  const result = await pool.query(creatVehicleQurery, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

  return result.rows[0]
}

const getAllVehicles = async () => {
  const getQuery = "SELECT * FROM vehicles";
  const result = await pool.query(getQuery);
  return result
}

const singleVehicle = async (id: string) => {
  const singleVehicleQuery = "SELECT * FROM vehicles WHERE id = $1";
  const result = await pool.query(singleVehicleQuery, [id]);
  return result;
}
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const { daily_rent_price, availability_status,vehicle_name,type,registration_number } = payload
  if (availability_status !== 'available' && availability_status !== 'booked') {
    throw new Error("Invalid availablility status")
    return
  }
  const singleVehicleQuery = "UPDATE  vehicles SET daily_rent_price= $1,availability_status=$2 ,vehicle_name = $3, type = $4, registration_number=$5  WHERE id = $6 RETURNING *";
  const result = await pool.query(singleVehicleQuery, [daily_rent_price, availability_status,vehicle_name,type,registration_number, id]);
  console.log(result)
  return result;
}

const deleteVehicle = async ( id: string) => {

  const getVehicle = "SELECT * FROM vehicles WHERE id = $1";
  const vehicle = await pool.query(getVehicle,[id])

   const vehicleDetails = vehicle.rows[0]
  
   if(vehicleDetails.availability_status === 'booked'){
    throw new Error("The vehicle is currently booked and cannot be deleted.")
   }
 
  const deleteVehicleQuery = "DELETE FROM vehicles  WHERE id = $1 ";
  const result = await pool.query(deleteVehicleQuery,[id]);

}
export const vehicleServices = {
  creatVehicle,
  getAllVehicles,
  singleVehicle,
  updateVehicle,
  deleteVehicle,
}