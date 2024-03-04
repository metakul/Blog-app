import { Router } from "express";
import * as UserController from "../Controllers/UserController";

import cors from "cors";

const router: Router = Router();
router.use(cors());

//create user
router.post("/", UserController.createUser);

//get user
router.get("/:userId", UserController.getUser);

//update user
router.patch("/", UserController.updateUser);

export default router;
