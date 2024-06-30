import { Router } from "express";
import * as PostController from "../Controllers/PostController";
import * as ImageController from "../Controllers/ImageController";
import cors from "cors";
import authenticationMiddleware from "../middleware/authentication";

const router: Router = Router();
router.use(cors());

// Create post
router.post("/", authenticationMiddleware, PostController.CreatePost);

// Route for fetching pending posts
router.get('/postType', PostController.getAllPostsByStatus);

// Get one post
router.get("/:postId", PostController.getPost);

router.get("/cryptoInfo/:cryptoId", PostController.getCryptoInfo);

// Update post
router.patch("/:postId", authenticationMiddleware, PostController.updatePost);

router.patch('/updateStatus/:postId', authenticationMiddleware, PostController.updatePostStatus);

// Delete post
router.delete("/:postId", authenticationMiddleware, PostController.detelePost);

// Image upload route
router.post("/uploadImage", ImageController.uploadImage);

export default router;
