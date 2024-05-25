import { Router } from "express";
import * as PostController from "../Controllers/PostController";
import cors from "cors";
import authenticationMiddleware from "../middleware/authentication";

const router: Router = Router();
router.use(cors());
//create post
router.post("/",authenticationMiddleware, PostController.CreatePost);



// Route for fetching pending posts
router.get('/postType', PostController.getAllPostsByStatus);

//get one post
router.get("/:postId", PostController.getPost);

router.get("/cryptoInfo/:cryptoId", PostController.getCryptoInfo);

//update post
router.patch("/:postId",authenticationMiddleware, PostController.updatePost);

router.patch('/updateStatus/:postId',authenticationMiddleware, PostController.updatePostStatus);


//delete post
router.delete("/:postId",authenticationMiddleware, PostController.detelePost);

export default router;
