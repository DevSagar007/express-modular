import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router()


// Create user
router.post('/', userController.createUser);

// Get all user
router.get("/", auth, userController.getAllUsers);

// Get single user
router.get('/:id', auth, userController.getSingleUser)

// Update user
router.put('/:id', userController.updateUser)

// Delete user
router.delete('/:id', userController.deleteUser)


export const userRoute = router