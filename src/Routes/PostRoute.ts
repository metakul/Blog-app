import { Router } from "express";
import * as PostController from "../Controllers/PostController";
import cors from "cors";

const router: Router = Router();
router.use(cors());
//create post
router.post("/", PostController.CreatePost);

//get all post
router.get("/", PostController.getAllPost);

//get one post
router.get("/:postId", PostController.getPost);

//update post
router.patch("/", PostController.updatePost);

//delete post
router.delete("/:postId", PostController.detelePost);

export default router;
