const supertest = require('supertest');
import { getRepository, Connection, Repository } from 'typeorm';
import { User } from '../orm/entities/User';
import { describe, expect, test } from '@jest/globals';
import { dbCreateConnection } from '../orm/dbCreateConnection';

describe('login module', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;
  const user = new User();

  beforeAll(async () => {
    dbConnection = await dbCreateConnection();
    const userPassword = 'pass1';
    user.username = 'test';
    user.name = 'test test';
    user.email = 'test@test.com';
    user.password = userPassword;
    user.hashPassword();
    userRepository = getRepository(User);
    await userRepository.save(user);
  });

  afterAll(async () => {
    await userRepository.delete(user.id);
  });

  test('POST /auth/login', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'pass1' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });
});
