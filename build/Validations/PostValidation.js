"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostValidation = exports.cryptoIdValidation = exports.PostIdValidation = exports.PostValidation = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_html_input_1 = __importDefault(require("joi-html-input"));
// Extend Joi with htmlInput
var extendedJoi = joi_1.default.extend(joi_html_input_1.default);
exports.PostValidation = extendedJoi.object({
    title: extendedJoi.string().min(6).required(),
    description: extendedJoi.htmlInput().allowedTags(),
    image: extendedJoi.string().required(),
    author: extendedJoi.string().min(4).required(),
    categories: extendedJoi.array().required(),
    cryptoSymbol: extendedJoi.string().required(),
});
exports.PostIdValidation = extendedJoi.string().alphanum().required();
exports.cryptoIdValidation = extendedJoi.string().required();
exports.UpdatePostValidation = extendedJoi.object({
    postId: extendedJoi.string().alphanum().required(),
    title: extendedJoi.string().min(6).required(),
    description: extendedJoi.htmlInput().allowedTags(),
    image: extendedJoi.string().required(),
    cryptoSymbol: extendedJoi.string().required(),
});
