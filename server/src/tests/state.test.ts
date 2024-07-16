import request from 'supertest';
import { User } from '../models/userModel';
import { State } from '../models/stateModel';
import app from '../app';
import db from "../config/db";

afterEach(async () => {
  await State.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  (await db()).disconnect();
});

describe('State API', () => {
  let token: string;

  beforeEach(async () => {
    const user = await User.create({
      username: 'testuser',
      password: 'password123',
    });

    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password123' });

    token = response.body.token;
  });

  it('should create a new state', async () => {
    const response = await request(app)
      .post('/states')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test State',
        description: 'This is a test state',
        status: 'active',
        createdBy: 'testuser',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test State');
    expect(response.body.description).toBe('This is a test state');
    expect(response.body.status).toBe('active');
    expect(response.body.createdBy).toBe('testuser');
  });

  it('should fetch all states', async () => {
    await State.create({
      name: 'Test State',
      description: 'This is a test state',
      status: 'active',
      createdBy: 'testuser',
    });

    const response = await request(app)
      .get('/states')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Test State');
  });

  it('should update a state', async () => {
    const state = await State.create({
      name: 'Test State',
      description: 'This is a test state',
      status: 'active',
      createdBy: 'testuser',
    });

    const response = await request(app)
      .put(`/states/${state._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated State' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated State');
    expect(response.body.description).toBe('This is a test state');
    expect(response.body.status).toBe('active');
  });

  it('should delete a state', async () => {
    const state = await State.create({
      name: 'Test State',
      description: 'This is a test state',
      status: 'active',
      createdBy: 'testuser',
    });

    const response = await request(app)
      .delete(`/states/${state._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('State deleted successfully');
  });
});
