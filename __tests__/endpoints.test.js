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
xdescribe('GET /api/categoires', () => {
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
xdescribe('error handlers', () => {
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
xdescribe('Respond with all available endpoint', () => {
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
xdescribe('get api reviews from parametric review_id', () => {
    test('should return an object containing properties of each review from given id', () => {
        //Arrange
        //Act
        //Assert
        return request(app).get('/api/reviews/2')
        .expect(200)
        .then((result) => {
            expect(result.body).toEqual({
                review_id: 2,
                title: 'Jenga',
                designer: 'Leslie Scott',
                owner: 'philippaclaire9',
                review_img_url: 'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
                review_body: 'Fiddly fun for all the family',
                category: 'dexterity',
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 5
              })
        })
    });
});
xdescribe('receiving a 404 on an invalid param', () => {
    test('should receive a 404 error when given an id that doesnt exist', () => {
        //Arrange
        //Act
        //Assert
        return request(app).get('/api/reviews/200550')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toEqual('404 not found')
        })
    });
});
describe('GET /api/reviews/:review_id/comments', () => {
    test('Should respond with array of comments for the given review_id', () => {
        //Arrange
        //Act
        return request(app).get('/api/reviews/3/comments')
        .expect(200)
        .then((result) => {
            expect('comment_id' in result.body[0]).toBe(true)
            expect('body' in result.body[0]).toBe(true)
            expect('review_id' in result.body[0]).toBe(true)
            expect('author' in result.body[0]).toBe(true)
            expect('votes' in result.body[0]).toBe(true)
            expect('created_at' in result.body[0]).toBe(true)
            expect(result.body[0].review_id).toBe(3)
        })
        //Assert
    });
});
describe('GET /api/reviews/:review_id/comments', () => {
    test('Should respond status 400 when given wrong endpoitn datatype', () => {
        //Arrange
        //Act
        return request(app).get('/api/reviews/somethingelse/comments')
        .expect(400)
        .then((result) => {
            expect(result.body).toEqual({message: 'Bad request' })
        })
        //Assert
    });
});