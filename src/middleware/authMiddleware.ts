import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'JWT secret is not defined' });
    return
  }

  //@ts-ignore
  jwt.verify(token, secret, (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
    if (err || !decoded) {
      res.status(403).json({ message: 'Failed to authenticate token' });
      return
    }
    req.user = decoded as JwtPayload;
    next();
  });
};


