"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoInfo = exports.getWhitelist = exports.updatePost = exports.detelePost = exports.updatePostStatus = exports.getPost = exports.getAllPostsByStatus = exports.CreatePost = void 0;
var Post_1 = __importDefault(require("../Models/Post"));
var PostValidation_1 = require("../Validations/PostValidation");
var Ipost_1 = require("../Types/Ipost");
var PostValidation_2 = require("../Validations/PostValidation");
var axiosCall_1 = require("../Axios/axiosCall");
var Whitelist_1 = __importDefault(require("../Models/Whitelist"));
var PostStatus;
(function (PostStatus) {
    PostStatus["APPROVED"] = "approved";
    PostStatus["PENDING"] = "pending";
    PostStatus["REJECTED"] = "rejected";
})(PostStatus || (PostStatus = {}));
/**
 * add new post
 * @param postModelValidation
 */
var addPost = function (postModelValidation) { return __awaiter(void 0, void 0, void 0, function () {
    var post, savedPost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                post = new Post_1.default({
                    title: postModelValidation.title,
                    description: postModelValidation.description,
                    image: postModelValidation.image,
                    author: postModelValidation.author,
                    categories: postModelValidation.categories,
                    cryptoSymbol: postModelValidation.cryptoSymbol,
                    status: "pending"
                });
                return [4 /*yield*/, post.save()];
            case 1:
                savedPost = _a.sent();
                return [2 /*return*/, savedPost];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Create a new post
 * @param req
 * @param res
 * @param next
 */
var CreatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postModelValidation, newPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, PostValidation_1.PostValidation.validateAsync(req.body)];
            case 1:
                postModelValidation = _a.sent();
                if (!!postModelValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(res.status(400).json({
                        message: "Invalid details provided.",
                    }))];
            case 2: return [4 /*yield*/, addPost(postModelValidation)];
            case 3:
                newPost = _a.sent();
                if (newPost) {
                    res.status(201).json({
                        newPost: newPost,
                    });
                }
                else {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Error Adding Post",
                        }))];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_2)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: error_2,
                        }))];
                }
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.CreatePost = CreatePost;
/**
 * Get all posts based on status
 * @param req
 * @param res
 * @param next
 */
var getAllPostsByStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status_1, pageSize, page, skip, query, posts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                status_1 = req.query.status;
                if (!status_1 || (status_1 !== 'approved' && status_1 !== 'pending')) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid status provided' })];
                }
                pageSize = parseInt(req.query.pagesize, 10) || 10;
                page = parseInt(req.query.page, 10) || 1;
                skip = (page - 1) * pageSize;
                query = { status: status_1 };
                return [4 /*yield*/, Post_1.default.find(query)
                        .select("_id title description cryptoSymbol image author categories createdAt updatedAt status")
                        .skip(skip)
                        .limit(pageSize)];
            case 1:
                posts = _a.sent();
                if (posts.length > 0) {
                    res.status(200).json(posts);
                }
                else {
                    return [2 /*return*/, res.status(404).json({ message: 'No posts found with the specified status' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPostsByStatus = getAllPostsByStatus;
/**
 * get one post
 * @param req
 * @param res
 * @param next
 */
var getPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postIdValidation, getPosts, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, PostValidation_2.PostIdValidation.validateAsync(req.params.postId)];
            case 1:
                postIdValidation = _a.sent();
                if (!!postIdValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(res.status(400).json({
                        message: "Operation failed, invalid details provided.",
                    }))];
            case 2: return [4 /*yield*/, Post_1.default.findById(postIdValidation)
                    .select("_id title description cryptoSymbol image author categories createdAt updatedAt status")
                    .populate("user", "username name surname")];
            case 3:
                getPosts = _a.sent();
                if (getPosts) {
                    res.status(200).json(getPosts);
                }
                else {
                    return [2 /*return*/, next(res.status(404).json({
                            message: "Not found.",
                        }))];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_4)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
/**
 * Update status of a post
 * @param req
 * @param res
 * @param next
 */
var updatePostStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, status_2, updatedPost, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.postId;
                status_2 = req.body.status;
                // Validate if the provided status is a valid enum value
                if (!Object.values(PostStatus).includes(status_2)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid status provided' })];
                }
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(postId, { status: status_2 }, { new: true } // Return the updated document
                    )];
            case 1:
                updatedPost = _a.sent();
                if (updatedPost) {
                    res.status(200).json(updatedPost);
                }
                else {
                    res.status(404).json({ message: 'Post not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePostStatus = updatePostStatus;
/**
 * delete post
 * @param req
 * @param res
 * @param next
 */
var detelePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postIdValidation, deletePosts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, PostValidation_2.PostIdValidation.validateAsync(req.params.postId)];
            case 1:
                postIdValidation = _a.sent();
                if (!!postIdValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(res.status(400).json({
                        message: "Operation failed, invalid details provided.",
                    }))];
            case 2: return [4 /*yield*/, Post_1.default.findByIdAndDelete(postIdValidation)];
            case 3:
                deletePosts = _a.sent();
                if (deletePosts) {
                    res.status(200).json(deletePosts);
                }
                else {
                    return [2 /*return*/, next(res.status(404).json({
                            message: "Not found.",
                        }))];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_6)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.detelePost = detelePost;
/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
var updatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var resUpdatePostValidation, updatedPosts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, PostValidation_2.UpdatePostValidation.validateAsync(req.body)];
            case 1:
                resUpdatePostValidation = _a.sent();
                if (!!PostValidation_2.UpdatePostValidation) return [3 /*break*/, 2];
                return [2 /*return*/, next(res.status(400).json({
                        message: "Operation failed, invalid details provided.",
                    }))];
            case 2: return [4 /*yield*/, Post_1.default.findByIdAndUpdate({
                    _id: resUpdatePostValidation.postId,
                }, {
                    $set: {
                        title: resUpdatePostValidation.title,
                        description: resUpdatePostValidation.description,
                        image: resUpdatePostValidation.image,
                        author: resUpdatePostValidation.author,
                        categories: resUpdatePostValidation.categories,
                        cryptoSymbol: resUpdatePostValidation.cryptoSymbol
                    },
                })];
            case 3:
                updatedPosts = _a.sent();
                if (updatedPosts) {
                    res.status(200).json(updatedPosts);
                }
                else {
                    return [2 /*return*/, next(res.status(404).json({
                            message: "Not found.",
                        }))];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_7)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
var getWhitelist = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var address, whiteList, savedAddress, error_8, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                address = req.body.address;
                console.log(address);
                console.log(JSON.stringify(req.body));
                if (!address) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Please Send address.",
                        }))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                whiteList = new Whitelist_1.default({
                    address: address
                });
                return [4 /*yield*/, whiteList.save()];
            case 2:
                savedAddress = _a.sent();
                res.status(200).json(savedAddress);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                throw error_8;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_9 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_9)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Invalid details provided.",
                        }))];
                }
                next(error_9);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getWhitelist = getWhitelist;
var getCryptoInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postIdValidation, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PostValidation_1.cryptoIdValidation.validateAsync(req.params.cryptoId)];
            case 1:
                postIdValidation = _a.sent();
                (0, axiosCall_1.fetchCryptoData)(req.params.cryptoId)
                    .then(function (data) {
                    res.status(200).json(data);
                })
                    .catch(function (error) {
                    res.status(400).json({
                        error: error,
                        message: "Unable to Load Crypto Data.",
                    });
                });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                if ((0, Ipost_1.isJoiError)(error_10)) {
                    return [2 /*return*/, next(res.status(400).json({
                            message: "Unable to Load Crypto Data.",
                        }))];
                }
                next(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCryptoInfo = getCryptoInfo;
