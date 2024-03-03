"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJoiError = void 0;
function isJoiError(obj) {
    return typeof obj === 'object' && obj !== null && 'isJoi' in obj;
}
exports.isJoiError = isJoiError;
