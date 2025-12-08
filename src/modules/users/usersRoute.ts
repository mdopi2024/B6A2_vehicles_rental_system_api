import { Router } from "express";
import { usersController } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post('/signup',usersController.signupUsers);
router.post('/signin',usersController.loginUsers)
router.get("/users",auth("admin"),usersController.getAllUser)
router.put("/:userId",auth("admin","customer"),usersController.updateUser)
router.delete("/:userId",auth("admin"),usersController.deleteUser)

export const usersRouter = router;