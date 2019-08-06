"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const supertest_1 = require("supertest");
const express = require("express");
const index_1 = require("./../index");
let app = express(), router = new index_1.Router((req) => {
    return Object.assign(req, {
        userId: Number(req.headers['x-user-id']) || 0
    });
});
router.route('/:id')
    .get((req, res) => {
    res.status(200).send({
        id: req.params['id'],
        user: {
            id: req.userId
        }
    });
});
app.use('/orders', router.getRouter());
describe("When using a router extending Request", () => {
    it('should route GET for /orders/123', async () => {
        let response = await supertest_1.agent(app)
            .get('/orders/123')
            .set('X-User-Id', '1337')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(response.body.user.id, 1337);
        assert.equal(response.body.id, '123');
    });
});
//# sourceMappingURL=extending.js.map