const request = require('supertest');
const app = require('../server');
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/');
const db = require('../db');
const endpointsJSON = require ('../endpoints.json')

beforeEach(()=>{
   return seed(testData);
})
afterAll(() => {
    return db.end();
})

describe('GET /api/categoires', () => {
    test('should respond with an array of catagories which have the properties of slug and description ', () => {
        //Arrange
        //Act
        //Assert
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((response) => {
            expect('slug' in response.body[0]).toBe(true);
            expect('description' in response.body[0]).toBe(true);
        })
    });
});

describe('error handlers', () => {
    test('Should respond with 404 for bad request', () => {
        //Arrange
        //Act
        //Assert
        return request(app)
        .get('/api/categoies')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('404 path not found')
        })
    });
});

describe('Respond with all available endpoint', () => {
    test('should respond with list of endpoints', () => {
        //Arrange
        //Act
        //Assert
        return request(app).get('/api')
        .expect(200)
        .then(({body}) => {
            expect(body.endpointsJSON).toEqual(endpointsJSON);
        })

    });
});