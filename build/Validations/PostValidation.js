"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostValidation = exports.PostIdValidation = exports.PostValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.PostValidation = joi_1.default.object({
    title: joi_1.default.string().min(6).required(),
    description: joi_1.default.string().min(6).required(),
    image: joi_1.default.object().required(),
    author: joi_1.default.string().min(4).required(),
    categories: joi_1.default.array().required(),
});
exports.PostIdValidation = joi_1.default.string().alphanum().required();
exports.UpdatePostValidation = joi_1.default.object({
    postId: joi_1.default.string().alphanum().required(),
    title: joi_1.default.string().min(6).required(),
    description: joi_1.default.string().min(6).required(),
    image: joi_1.default.object().required(),
});
