"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const supertest_1 = require("supertest");
const express = require("express");
const index_1 = require("./../index");
let app = express(), router = new index_1.Router();
router.route('/')
    .get((req, res) => {
    res.status(200).send([{ user: '321' }, { user: '321' }]);
});
router.route('/:id')
    .get((req, res) => {
    res.status(200).send({ user: req.params['id'] });
});
app.use('/users', router.getRouter());
describe('When using a plain router', () => {
    beforeEach(() => {
    });
    it('should route GET for /users', async () => {
        let response = await supertest_1.agent(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(response.body.length, 2);
    });
    it('should route GET for /users/123', async () => {
        let response = await supertest_1.agent(app)
            .get('/users/123')
            .expect('Content-Type', /json/)
            .expect(200);
        assert.equal(response.body.user, '123');
    });
});
//# sourceMappingURL=basic.js.map