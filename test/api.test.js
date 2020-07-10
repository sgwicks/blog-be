const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')

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
    })
    describe.only('/articles/:article_id', () => {
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
})
