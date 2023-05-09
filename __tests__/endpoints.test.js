const request = require('supertest');
const app = require('../server');
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/');
const db = require('../db');

beforeEach(()=>{
   return seed(testData);
})
afterAll(() => {
    return db.end();
})

describe('GET /api/catagoires', () => {
    test('should respond with an array of catagories which have the properties of slug and description ', () => {
        //Arrange
        //Act
        //Assert
        return request(app)
        .get('/api/catagories')
        .expect(200)
        .then((response) => {
            expect('slug' in response.body[0]).toBe(true);
            expect('description' in response.body[0]).toBe(true);
        })

    });
});