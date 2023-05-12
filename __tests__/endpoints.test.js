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
                expect(response.body.reviews.length).toBe(13);
            })
            //Assert
        });
});
describe('GET /api/reviews/:review_id/comments', () => {
    test('Should respond with array of comments for the given review_id', () => {
        return request(app).get('/api/reviews/3/comments')
        .expect(200)
        .then((result) => {
            result.body.comments.forEach(comment => {
                expect('comment_id' in comment).toBe(true)
                expect('body' in comment).toBe(true)
                expect('review_id' in comment).toBe(true)
                expect('author' in comment).toBe(true)
                expect('votes' in comment).toBe(true)
                expect('created_at' in comment).toBe(true)
                expect(comment.review_id).toBe(3)
            })
        
        })
    });
});
describe('GET /api/reviews/:review_id/comments', () => {
    test('Should respond status 400 when given wrong endpoitn datatype', () => {
        return request(app).get('/api/reviews/somethingelse/comments')
        .expect(400)
        .then((result) => {
            expect(result.body).toEqual({message: 'Bad request' })
        })
    });
});
describe('GET /api/reviews/:review_id/comments', () => {
    test('Should respond status 404 when given id that doesnt exist', () => {
        return request(app).get('/api/reviews/999999/comments')
        .expect(404)
        .then((result) => {
            expect(result.body).toEqual({message: 'Resource not found' })
        })
    });
});
describe('POST /api/reviews/:review/comments', () => {
    test('should respond: 201 with new comment ', () => {
        //Arrange
        const body = {
            username: 'mallionaire',
            body: 'This is my new comment!'
          }
        return request(app).post('/api/reviews/3/comments')
        .send(body)
        .expect(201)
        .then(({body}) => {
                expect(typeof body.comment.author).toBe('string');
                expect(typeof body.comment.body).toBe('string');
                expect(body.comment.review_id).toBe(3);
                expect(typeof body.comment.created_at).toBe('string');
                expect(typeof body.comment.comment_id).toBe('number');
                expect(typeof body.comment.votes).toBe('number');
        })
    });
    test('should respond: 201', () => {
        //Arrange
        const body = {
            username: 'mallionaire',
            body: 'This is my new comment!',
            someOtherKey: 'keyValue'
          }
        return request(app).post('/api/reviews/3/comments')
        .send(body)
        .expect(201)
    });
    test('should respond: 400 from invalid request', () => {
        //Arrange
        const body = {
            username: 'mallionaire',
            body: 'This is my new comment!'

          }
        return request(app).post('/api/reviews/string/comments')
        .send(body)
        .expect(400)
    });
    test('should respond: 404 from none existant id requests', () => {
        //Arrange
        const body = {
            username: 'mallionaire',
            body: 'This is my new comment!'
          }
        return request(app).post('/api/reviews/99999/comments')
        .send(body)
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('Resource not found')
        })
    });
    test('should respond: 400 from lack of data', () => {
        //Arrange
        const body = {
            username: 'mallionaire',
          }
        return request(app).post('/api/reviews/3/comments')
        .send(body)
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Bad request')
        })
    });
    test('should respond: 404 if username does not exist', () => {
        //Arrange
        const body = {
            username: 'Ben',
            body: 'This is my new comment!'
          }
        return request(app).post('/api/reviews/3/comments')
        .send(body)
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('Resource not found')
        })
    });
});
describe('PATCH /api/reviews/:review_id', () => {
    test('Return status 201: with updated review', () => {
        return request(app)
        .patch('/api/reviews/1')
        .send({inc_vote:3})
        .expect(201)
        .then(({body}) => {
            expect(body.review.title).toBe('Agricola');
            expect(body.review.votes).toBe(4);
        })
    });
});
describe('PATCH /api/reviews/:review_id', () => {
    test('Error handling for invalid data type', () => {
        return request(app)
        .patch('/api/reviews/1')
        .send({inc_vote:'df'})
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid input type')
        })
    });
    test('Error handling for none  existant  resource', () => {
        return request(app)
        .patch('/api/reviews/99999')
        .send({inc_vote:3})
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('Resource not found')
        })
    });
});

