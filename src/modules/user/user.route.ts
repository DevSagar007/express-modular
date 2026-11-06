import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router()

// Create user
router.post('/', userController.createUser);

// Get all user
router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), userController.getAllUsers);

// Get single user
router.get('/:id', userController.getSingleUser)

// Update user
router.put('/:id', userController.updateUser)

// Delete user
router.delete('/:id', userController.deleteUser)


export const userRoute = router