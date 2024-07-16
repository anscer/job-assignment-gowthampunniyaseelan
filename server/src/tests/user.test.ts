import request from 'supertest';
import { User } from '../models/userModel';
import app from '../app';
import db from "../config/db";

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  (await db()).disconnect();
});

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
  });

  it('should log in an existing user', async () => {
    await User.create({
      username: 'testuser',
      password: 'password123'
    });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not log in a non-existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'nonuser', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });
});
