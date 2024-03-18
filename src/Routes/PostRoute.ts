import { Router } from "express";
import * as PostController from "../Controllers/PostController";
import cors from "cors";
import authenticationMiddleware from "../middleware/authentication";

const router: Router = Router();
router.use(cors());
//create post
router.post("/",authenticationMiddleware, PostController.CreatePost);

//get all post
router.get("/", PostController.getAllPost);

//get one post
router.get("/:postId", PostController.getPost);

//update post
router.patch("/",authenticationMiddleware, PostController.updatePost);

//delete post
router.delete("/:postId",authenticationMiddleware, PostController.detelePost);

export default router;
