import * as assert from 'assert'
import { agent } from 'supertest'

import * as express from 'express'
import { Router } from './../index'

interface IRequest extends express.Request {
    userId: number
}

let app = express(),
    router = new Router<IRequest, express.Response>((req) => {
        return Object.assign(req, { 
            userId: Number(req.headers['x-user-id']) || 0
        })
    })

router.route('/:id')
    .get((req, res) => {
        res.status(200).send({ 
            id: req.params['id'],
            user: {
                id: req.userId
            }
        })
    });

app.use('/orders', router.getRouter())


describe("When using a router extending Request", () => {

    it('should route GET for /orders/123', async () => {
        let response = await agent(app)
            .get('/orders/123')
            .set('X-User-Id', '1337')
            .expect('Content-Type', /json/)
            .expect(200)

        assert.equal(response.body.user.id, 1337)
        assert.equal(response.body.id, '123')
    })

})