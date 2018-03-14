import * as assert from 'assert'
import { agent } from 'supertest'

import * as express from 'express'
import { Router } from './../index'

let app = express(),
    router = new Router()

router.route('/')
    .get((req, res) => {
        res.status(200).send([{ user: '321' }, { user: '321' }])
    })

router.route('/:id')
    .get((req, res) => {
        res.status(200).send({ user: req.params['id'] })
    });

app.use('/users', router.getRouter())


describe('When using a plain router', () => {

    beforeEach(() => {

    })

    it('should route GET for /users', async () => {
        let response = await agent(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)

        assert.equal(response.body.length, 2)
    })

    it('should route GET for /users/123', async () => {
        let response = await agent(app)
            .get('/users/123')
            .expect('Content-Type', /json/)
            .expect(200)

        assert.equal(response.body.user, '123')
    })
})