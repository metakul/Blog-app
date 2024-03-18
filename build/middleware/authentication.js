"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a middleware function to decode JWT tokens
var authenticationMiddleware = function (req, res, next) {
    // Get the JWT token from the "Authorization" header
    var tokenWithBearer = req.header('Authorization');
    if (!tokenWithBearer) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Return here to exit the function after sending the response
    }
    var token = tokenWithBearer.replace('Bearer ', ''); // Remove the "Bearer " prefix
    try {
        // Verify and decode the JWT token
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // Attach the decoded user information to the request object
        req.user = decoded;
        next(); // Move to the next middleware or route handler
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.default = authenticationMiddleware;
