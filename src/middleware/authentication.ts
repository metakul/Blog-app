import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: any; 
}

// Create a middleware function to decode JWT tokens
const authenticationMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Get the JWT token from the "Authorization" header
    const tokenWithBearer: string | undefined = req.header('Authorization');
    if (!tokenWithBearer) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Return here to exit the function after sending the response
    }

    const token: string = tokenWithBearer.replace('Bearer ', ''); // Remove the "Bearer " prefix

    try {
        // Verify and decode the JWT token
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);

        // Attach the decoded user information to the request object
        req.user = decoded;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authenticationMiddleware;