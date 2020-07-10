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
})
