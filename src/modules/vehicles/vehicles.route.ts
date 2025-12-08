import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post('/vehicles',auth("admin"),vehicleController.creatVehicle)
router.get('/vehicles',vehicleController.getAllVehicles)
router.get('/:vehicleId',vehicleController.singleVehicle)
router.put('/:vehicleId',auth('admin'),vehicleController.updateVehicle)
router.delete('/:vehicleId',auth('admin'),vehicleController.deleteVehicle)


export const vehicleRouter = router;