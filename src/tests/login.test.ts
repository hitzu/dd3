const supertest = require('supertest');
import { getRepository, Connection, Repository } from 'typeorm';
import { User } from '../orm/entities/User';
import { Report } from '../orm/entities/Report';
import { describe, expect, test } from '@jest/globals';
import { dbCreateConnection } from '../orm/dbCreateConnection';

describe('login module', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;
  let reportRepository: Repository<Report>;
  const user = new User();
  let token = null;
  let userResponse = null;

  beforeAll(async () => {
    dbConnection = await dbCreateConnection();
    const userPassword = 'pass1';
    user.username = 'test';
    user.name = 'test test';
    user.email = 'test@test.com';
    user.password = userPassword;
    user.hashPassword();
    userRepository = getRepository(User);
    reportRepository = getRepository(Report);
    await userRepository.save(user);
  });

  afterAll(async () => {
    await reportRepository
      .createQueryBuilder()
      .delete()
      .from(Report)
      .where('userId = :id', { id: user.id })
      .execute();
    await userRepository.delete(user.id);
  });

  test('POST /auth/login', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'pass1' });
    userResponse = res.body.user;
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  test('GET play/word?word=perro', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .get('/play/word?word=perro')
      .set({ Authorization: token });

    expect(res.body).toHaveProperty('wordS');
  });

  test(`GET report/user?userId=${user.id}`, async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .get(`/report/user?userId=${user.id}`)
      .set({ Authorization: token });
    expect(res.body).toHaveProperty('attends');
    expect(res.body).toHaveProperty('wins');
  });

  test('GET /report/top-user', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .get('/report/top-user')
      .set({ Authorization: token });
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /report/word', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .get('/report/word')
      .set({ Authorization: token });
    expect(Array.isArray(res.body)).toBe(true);
  });
});
