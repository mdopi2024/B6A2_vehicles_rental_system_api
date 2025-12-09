import { pool } from "../../config/database";

const creatBooking = async (payload: Record<string, unknown>) => {
    console.log(payload)

    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const parCustomerId = Number(customer_id)
    const parVehiclId = Number(vehicle_id)

    const start = new Date(rent_start_date as string)
    const end = new Date(rent_end_date as string);
    const different = end.getTime() - start.getTime();
    const totalDays = different / (1000 * 60 * 60 * 24);

    const vehicleById = await pool.query("SELECT * FROM vehicles WHERE id = $1 ", [parVehiclId])
    const userById = await pool.query("SELECT * FROM users WHERE id = $1 ", [parCustomerId])


    if (vehicleById.rows.length === 0) {
        throw new Error("The vehicle is not exist")
    }
    if (userById.rows.length === 0) {
        throw new Error("The user is not exist")
    }
    const totalPrice = totalDays * vehicleById.rows[0].daily_rent_price;
    const status = 'active';

    const bookingQuery = "INSERT INTO bookings(customer_id,vehicle_id,rent_start_date, rent_end_date,total_price,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";

    const result = await pool.query(bookingQuery, [parCustomerId, parVehiclId, rent_start_date, rent_end_date, totalPrice, status])

    const updateVehicleStatus = await pool.query("UPDATE vehicles SET availability_status = $1 WHERE id =$2", ['booked', vehicle_id])

    return { ...result.rows[0], vehicle: { vehicle_name: vehicleById.rows[0].vehicle_name, daily_rent_price: vehicleById.rows[0].daily_rent_price } }
}

const getAllBooking = async (user: Record<string, unknown>) => {
    console.log(user)

    if (user.role === 'customer') {
        const customerAllBooking = await pool.query('SELECT * FROM bookings WHERE customer_id = $1', [user.id])
        return customerAllBooking.rows
    }

    const getAll = await pool.query("SELECT * FROM bookings")
    return getAll.rows
}

const updateBooking = async (payload: Record<string, unknown>, user: Record<string, unknown>, id: string) => {

    const { status } = payload

    if (!status || !['cancelled', 'returned'].includes(status as string)) {
        throw new Error("Status must be 'cancelled' or 'returned'")
    }

    const getBookingById = await pool.query('SELECT * FROM bookings WHERE id = $1', [id])

    if (getBookingById.rows.length === 0) {
        throw new Error("Booking not found")
    }

    const booked = getBookingById.rows[0]

    const getUserByEmail = await pool.query('SELECT * FROM users WHERE id = $1', [booked.customer_id]);

    const userFromUsers = getUserByEmail.rows[0]

    if (user.role === 'customer' && user.id !== userFromUsers.id) {
        throw new Error("This is not you booking, please find you booking")
    }

    if (user.role === 'customer' && status !== "cancelled") {
        throw new Error("you can only upadete cancelled")
    }

    if (user.role === 'customer') {
        const updateStatus = await pool.query("UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *", [status, id])
        const updateVehicleStatus = await pool.query('UPDATE vehicles SET availability_status =$1 WHERE id =$2', ['available', booked.vehicle_id])
        return updateStatus.rows[0]
    }

    const update = await pool.query('UPDATE bookings SET status = $1 WHERE id =$2 RETURNING *', [status, id])

    if (status === 'returned') {
        const update2 = await pool.query('UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *', ['available', booked.vehicle_id])
        const updateVehicleStatus = await pool.query('UPDATE vehicles SET availability_status =$1 WHERE id =$2', ['available', booked.vehicle_id])
        const rowUpate = update.rows[0]
        return { rowUpate, vehicle: { availability_status: update2.rows[0].availability_status } }
    }

    return update.rows[0]
}



export const bookingServices = {
    creatBooking,
    getAllBooking,
    updateBooking,
}