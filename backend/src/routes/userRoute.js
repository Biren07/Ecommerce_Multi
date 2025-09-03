import express from 'express'
import roleBasedAuth from '../middlewares/rolebasedAuth.js';
import { ADMIN } from '../constants/roles.js';
import userController from '../controllers/userController.js';


const router=express.Router();

router.post("/",roleBasedAuth(ADMIN),userController.createUser);
router.get("/",roleBasedAuth(ADMIN),userController.getUsers);
router.get("/:id",roleBasedAuth(ADMIN),userController.getUserById);
router.put("/:id",userController.updatedUser);
router.delete("/:id",roleBasedAuth(ADMIN),userController.deleteUser);
router.patch("/:id/profile-image",userController.updateProfileImage);
router.post("/merchant",roleBasedAuth(ADMIN),userController.createMerchant);

export default router;