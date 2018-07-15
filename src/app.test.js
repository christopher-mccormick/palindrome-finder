const request = require('supertest');
const app = require('./app');

describe('test root path', () => {
  test('it should responed with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('test path that does not exist', () => {
  test('it should responed with status code 404', async () => {
    const response = await request(app).get('/no-path-here');
    expect(response.statusCode).toBe(404);
  });
});
