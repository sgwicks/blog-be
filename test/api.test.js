const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')
const { password } = require('../user')

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
                        expect(articles).to.have.length(2)
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
                            .get('/api/articles/3')
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
                        expect(article.article_id).to.equal(3)
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
                        expect(article.title).to.equal('Day 5: Grunt Work')
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
                        expect(topics).to.have.length(1)
                        expect(topics[0]).to.eql({
                            topic: 'test',
                            description: 'test blogs'
                        })
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
        it.only('Returns 404 when article_id does not exist', () => {
            return request(app)
                .get('/api/articles/333')
                .expect(404)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Route does not exist')
                })
        })
    })
})
