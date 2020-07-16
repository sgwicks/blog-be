const chai = require('chai')
const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')
const { password } = require('../user')

chai.use(require('chai-sorted'))
beforeEach(() => connection.seed.run())
after(() => connection.destroy())

describe('/api', () => {
    describe('GET:', () => {
        describe('200', () => {
            it('returns status 200', () => {
                return request(app)
                    .get('/api')
                    .expect(200)
                    .then(({ body: { api } }) => {
                        expect(api).to.eql(
                            {
                                '/articles': 'A list of all articles',
                                '/articles/:article_id': 'A single article by id'
                            }
                        )
                    })
            })
        })
    })
    describe('/articles', () => {
        describe('GET:', () => {
            it('Returns a list of all articles', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.be.an('array')
                        expect(articles).to.have.length(3)
                    })
            })
            it('Articles have all keys except body', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles[0]).to.have.keys(
                            'article_id',
                            'title',
                            'topic',
                            'blurb',
                            'date'
                        )
                    })
            })
            it('Can filter by topic', () => {
                return request(app)
                    .get('/api/articles?topic=other')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.have.length(1)
                    })
            })
            it('Ignores invalid queries', () => {
                return request(app)
                    .get('/api/articles?option=invalid')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.have.length(3)
                    })
            })
            it('Can sort by date', () => {
                return request(app)
                    .get('/api/articles?sort_by=date')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.be.ascendingBy('date')
                    })
            })
            it('Can take a sort order query', () => {
                return request(app)
                    .get('/api/articles?sort_by=date&order=desc')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.be.descendingBy('date')
                    })
            })
            it('Can take any column and order as a sort query', () => {
                return request(app)
                    .get('/api/articles?sort_by=title&order=asc')
                    .expect(200)
                    .then(({ body: { articles } }) => {
                        expect(articles).to.be.ascendingBy('title')
                    })
            })
        })
        describe('POST:', () => {
            it('Returns a 201 status', () => {
                return request(app)
                    .post('/api/articles')
                    .send({
                        article: {
                            title: 'Test #2',
                            topic: 'test',
                            blurb: 'blurb',
                            body: 'body'
                        },
                        password
                    })
                    .expect(201)
            })
            it('Correctly adds the article to the database', () => {
                return request(app)
                    .post('/api/articles')
                    .send({
                        article: {
                            title: 'Test #2',
                            topic: 'test',
                            blurb: 'blurb',
                            body: 'body'
                        },
                        password
                    })
                    .expect(201)
                    .then(() => {
                        return request(app)
                            .get('/api/articles/4')
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article.title).to.equal('Test #2')
                            })
                    })
            })
            it('Returns a copy of the newly inserted article', () => {
                return request(app)
                    .post('/api/articles')
                    .send({
                        article: {
                            title: 'Test #2',
                            topic: 'test',
                            blurb: 'blurb',
                            body: 'body'
                        },
                        password
                    })
                    .expect(201)
                    .then(({ body: { article } }) => {
                        expect(article.title).to.equal('Test #2')
                        expect(article.blurb).to.equal('blurb')
                        expect(article.body).to.equal('body')
                        expect(article.article_id).to.equal(4)
                        expect(article.topic).to.equal('test')
                        expect(article).to.include.keys('date')
                    })

            })
            describe('ERROR:', () => {
                it('Returns 403 when password is wrong', () => {
                    return request(app)
                        .post('/api/articles')
                        .send({
                            article: {
                                title: 'title',
                                body: 'body',
                                blurb: 'blurb',
                                topic: 'test'
                            },
                            password: 'password'
                        })
                        .expect(403)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Request denied, incorrect password')
                        })
                })
                it('Returns 400 when missing data', () => {
                    return request(app)
                        .post('/api/articles')
                        .send({
                            password,
                            article: {
                                body: 'body'
                            }
                        })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Invalid request, missing data')
                        })
                })
                it('Returns 400 when request body is missing article key', () => {
                    return request(app)
                        .post('/api/articles')
                        .send({
                            password,
                            title: 'title',
                            body: 'body',
                            blurb: 'blurb',
                            topic: 5
                        })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Invalid request, article key is missing')
                        })
                })
                it('Returns 400 when extra data is in article', () => {
                    return request(app)
                        .post('/api/articles')
                        .send({
                            password,
                            article: {
                                title: 'title',
                                body: 'body',
                                blurb: 'blurb',
                                topic: 'test',
                                extra: 'data'
                            }
                        })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Invalid request, unhandled data in request')
                        })
                })
            })
        })
        describe('ERROR:', () => {
            it('Returns 405 on methods not allowed', () => {
                return request(app)
                    .del('/api/articles')
                    .expect(405)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal('Method not allowed')
                    })
            })
        })
    })
    describe('/articles/:article_id', () => {
        describe('GET:', () => {
            it('Returns an article with all keys', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({ body: { article } }) => {
                        expect(article).to.include.keys(
                            'title',
                            'topic',
                            'date',
                            'blurb',
                            'body',
                            'article_id'
                        )
                    })
            })
            it('Returns the requested article', () => {
                return request(app)
                    .get('/api/articles/2')
                    .expect(200)
                    .then(({ body: { article } }) => {
                        expect(article.article_id).to.equal(2)
                        expect(article.title).to.equal('day 5: Grunt Work')
                    })
            })
        })
        describe('ERROR:', () => {
            it('Returns 405 on methods not allowed', () => {
                return request(app)
                    .post('/api/articles/1')
                    .expect(405)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal('Method not allowed')
                    })
            })
            it('Returns 400 when invalid article id', () => {
                return request(app)
                    .get('/api/articles/invalid')
                    .expect(400)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal('Invalid request, invalid article id')
                    })
            })
        })
    })
    describe('/topics', () => {
        describe('GET:', () => {
            it('Returns a list of all topics', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(({ body: { topics } }) => {
                        expect(topics).to.be.an('array')
                        expect(topics).to.have.length(2)
                        expect(topics[0]).to.eql({
                            topic: 'test',
                            description: 'test blogs'
                        })
                    })
            })
        })
        describe('POST:', () => {
            it('Accepts a new topic', () => {
                return request(app)
                    .post('/api/topics')
                    .send({
                        password,
                        topic: {
                            topic: 'news',
                            description: 'This is my latest news'
                        }
                    })
                    .expect(201)
                    .then(({ body: { topic } }) => {
                        expect(topic.topic).to.equal('news')
                        expect(topic.description).to.equal('This is my latest news')
                    })
            })
            it('New topic is added to the database', () => {
                return request(app)
                    .post('/api/topics')
                    .send({
                        password,
                        topic: {
                            topic: 'news',
                            description: 'This is my news blog'
                        }
                    })
                    .then(() => {
                        return request(app)
                            .get('/api/topics')
                            .then(({ body: { topics } }) => {
                                expect(topics).to.have.length(3)
                                expect(topics[2].topic).to.equal('news')
                            })
                    })
            })
            describe('ERROR:', () => {
                it('Returns error if password is incorrect', () => {
                    return request(app)
                        .post('/api/topics')
                        .send({
                            password: 'password',
                            topic: {
                                topic: 'news',
                                description: 'news'
                            }
                        })
                        .expect(403)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Request denied, incorrect password')
                        })
                })
            })
        })
        describe('ERROR:', () => {
            it('Returns 405 on methods not allowed', () => {
                return request(app)
                    .del('/api/topics')
                    .expect(405)
                    .then(({ body: { msg } }) => {
                        expect(msg).to.equal('Method not allowed')
                    })
            })
        })
    })
    describe('ERROR:', () => {
        it('Returns 404 when url doesn\'t exist', () => {
            return request(app)
                .get('/banana')
                .expect(404)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Route does not exist')
                })
        })
        it('Returns 404 when article_id does not exist', () => {
            return request(app)
                .get('/api/articles/333')
                .expect(404)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Route does not exist')
                })
        })
        it('Returns 405 on methods not allowed', () => {
            return request(app)
                .post('/api')
                .expect(405)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Method not allowed')
                })
        })
    })
})
