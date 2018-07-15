const request = require('supertest');
const app = require('../app');

describe('test reporter path with no data', () => {
  test('it should responed with status code 400', async () => {
    const response = await request(app).get('/reporter');
    expect(response.statusCode).toBe(400);
  });

  test('it should responed with an error string', async () => {
    const response = await request(app).get('/reporter');
    expect(response.text).toBe('"No Valid Test String Supplied"');
  });
});

describe('test reporter path with data', () => {
  test('it should responed with status code 200', async () => {
    const response = await request(app).get('/reporter?input=abba');
    expect(response.statusCode).toBe(200);
  });

  test('it should respond with list of palindromes', async () => {
    const response = await request(app).get('/reporter?input=sqrrqabccbatudefggfedvwhijkllkjihxymnnmzpop');
    expect(response.text).toBe('{"palindromes":["Text: hijkllkjih, Index: 23, Length: 10","Text: defggfed, Index: 13, Length: 8","Text: abccba, Index: 5, Length: 6"]}');
  });

  test('it should respond with list of 1 palindrome and additional information', async () => {
    const response = await request(app).get('/reporter?input=abba');
    expect(response.text).toBe('{"additionalInformation":"Only 1 has been found!","palindromes":["Text: abba, Index: 0, Length: 4"]}');
  });

  test('it should respond with list of 2 palindromes and additional information', async () => {
    const response = await request(app).get('/reporter?input=abba1221');
    expect(response.text).toBe('{"additionalInformation":"Only 2 have been found!","palindromes":["Text: 1221, Index: 4, Length: 4","Text: abba, Index: 0, Length: 4"]}');
  });

  test('it should respond with an error for non-alphanumeric ', async () => {
    const response = await request(app).get('/reporter?input=abba??????');
    expect(response.text).toBe('"No Valid Test String Supplied"');
  });
});
