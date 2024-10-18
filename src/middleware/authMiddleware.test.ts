import request from 'supertest';
import express from 'express';
import { authenticateToken } from './authMiddleware';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
process.env.JWT_SECRET = 'test'; // Set your secret key here


app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed!', user: req.user });
});

describe('authenticateToken Middleware', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(401);
  });

  it('should return 403 if token is invalid', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(403);
  });

  it('should call next() and set req.user if token is valid', async () => {
    const user = { id: 1, name: 'Test User' };
    const token = jwt.sign(user, process.env.JWT_SECRET!);

    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Protected route accessed!');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toMatchObject(user);
  });
});

