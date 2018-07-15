const request = require('supertest');
const app = require('../app');

describe('test search returns page', () => {
  test('it should contain html', async () => {
    const response = await request(app).get('/search');
    expect(response.text).toContain('<!DOCTYPE html>');
  });
});

describe('test search path with no data', () => {
  test('it should responed with status code 400', async () => {
    const response = await request(app).get('/search/results?input=');
    expect(response.statusCode).toBe(400);
  });

  test('it should responed error string', async () => {
    const response = await request(app).get('/search/results');
    expect(response.text).toBe('"No Valid Test String Supplied"');
  });
});

describe('test search path with data', () => {
  test('it should responed with status code 200', async () => {
    const response = await request(app).get('/search/results?input=abba');
    expect(response.statusCode).toBe(200);
  });

  test('it should respond with html of palindromes', async () => {
    const response = await request(app).get('/search/results?input=sqrrqabccbatudefggfedvwhijkllkjihxymnnmzpop');
    expect(response.text).toBe('<div>Text: hijkllkjih, Index: 23, Length: 10</div><div>Text: defggfed, Index: 13, Length: 8</div><div>Text: abccba, Index: 5, Length: 6</div>');
  });

  test('it should respond with html of 1 palindrome and additional information', async () => {
    const response = await request(app).get('/search/results?input=abba');
    expect(response.text).toBe('<div>Only 1 has been found!<div><div>Text: abba, Index: 0, Length: 4</div>');
  });

  test('it should respond with html of 2 palindromes and additional information', async () => {
    const response = await request(app).get('/search/results?input=abba1221');
    expect(response.text).toBe('<div>Only 2 have been found!<div><div>Text: 1221, Index: 4, Length: 4</div><div>Text: abba, Index: 0, Length: 4</div>');
  });

  test('it should respond with an error for non-alphanumeric ', async () => {
    const response = await request(app).get('/search/results?input=abba!!!!');
    expect(response.text).toBe('"No Valid Test String Supplied"');
  });
});
