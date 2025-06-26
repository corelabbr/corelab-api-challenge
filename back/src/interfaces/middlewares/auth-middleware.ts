import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@infrastructure/jwt/auth-service';

const authService = new AuthService();

export function     authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token not supplied' });
        return;
    }

    try {
        const decoded = authService.verifyToken(token);

        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded; 
            return next();
        } 

        res.status(403).json({ message: 'Invalid token structure' });
        return;

    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
}
