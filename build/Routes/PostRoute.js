"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PostController = __importStar(require("../Controllers/PostController"));
var ImageController = __importStar(require("../Controllers/ImageController"));
var cors_1 = __importDefault(require("cors"));
var authentication_1 = __importDefault(require("../middleware/authentication"));
var router = (0, express_1.Router)();
router.use((0, cors_1.default)());
// Create post
router.post("/", authentication_1.default, PostController.CreatePost);
// Route for fetching pending posts
router.get('/postType', PostController.getAllPostsByStatus);
// Get one post
router.get("/:postId", PostController.getPost);
router.get("/cryptoInfo/:cryptoId", PostController.getCryptoInfo);
// Update post
router.patch("/:postId", authentication_1.default, PostController.updatePost);
router.put('/updateStatus/:postId', authentication_1.default, PostController.updatePostStatus);
//delete post
router.delete("/:postId", authentication_1.default, PostController.detelePost);
exports.default = router;
