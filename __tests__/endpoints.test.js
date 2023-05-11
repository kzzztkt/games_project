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

describe('get api reviews from parametric review_id', () => {
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

describe('receiving a 404 on an invalid param', () => {
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
describe('GET /api/reviews', () => {
        test('Return status:200 and array of review object ', () => {
            //Arrange
            //Act
            return request(app).get('/api/reviews')
            .expect(200)
            .then((response) => {
                response.body.reviews.forEach(review => {
                    expect('owner' in review).toBe(true);
                    expect('title' in review).toBe(true);
                    expect('review_id' in review).toBe(true);
                    expect('category' in review).toBe(true);
                    expect('review_img_url' in review).toBe(true);
                    expect('created_at' in review).toBe(true);
                    expect('votes' in review).toBe(true);
                    expect('owner' in review).toBe(true);
                    expect('designer' in review).toBe(true);
                    expect('comment_count' in review).toBe(true);
                })
                expect(response.body.reviews).toBeSortedBy('created_at');
            })
            //Assert
        });
});