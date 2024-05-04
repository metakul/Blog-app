import { Router } from "express";
import * as PostController from "../Controllers/PostController";
import cors from "cors";
import authenticationMiddleware from "../middleware/authentication";

const router: Router = Router();
router.use(cors());
//create post
router.post("/", PostController.CreatePost);

//get all post
router.get("/", PostController.getAllPost);

//get one post
router.get("/:postId", PostController.getPost);

router.get("/cryptoInfo/:cryptoId", PostController.getCryptoInfo);

//update post
router.patch("/:postId", PostController.updatePost);

//delete post
router.delete("/:postId", PostController.detelePost);

export default router;
