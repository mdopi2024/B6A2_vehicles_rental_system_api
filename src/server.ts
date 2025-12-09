import express, { Request, Response } from 'express'
import { config } from './config'
import { initializeDb } from './config/database'
import { usersRouter } from './modules/users/usersRoute';
import { vehicleRouter } from './modules/vehicles/vehicles.route';
import { bookingRoute } from './modules/booking/bookingRoute';
const app = express()
const port = config.port || 5000

app.use(express.json())

/**
 * initial table
 */
 
initializeDb()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

/**
 * users all oparation are here
 */

app.use('/api/v1/auth',usersRouter),
app.use("/api/v1/users",usersRouter)
/**
 * vehicles all opatation here
 */

app.use('/api/v1/vehicles',vehicleRouter)


/**
 * all booking api are here
 */

app.use('/api/v1/bookings',bookingRoute)


app.listen(port, () => {
  console.log(`rent api system is running on ${port}`)
})
