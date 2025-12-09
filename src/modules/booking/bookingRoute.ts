import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/bookings',auth('admin','customer'),bookingController.creatBooking);
router.get('/',bookingController.getAllBooking)
router.put('/:bookingId',auth('admin','customer'),bookingController.updateBooking)

export const bookingRoute = router