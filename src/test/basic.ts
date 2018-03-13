import * as assert from 'assert'

import { Request, Response } from 'express'
import { Router } from './../index'

describe("When using tests", () => {

    let router: Router<IRequest, Response>

    beforeEach(() => {

        router = new Router<IRequest, Response>( (req) => {
            return Object.assign({}, req, {
                user: {
                    id: Number(req.params['x-user-id']) || 0
                }
            })
        }, (res) => res)

    })

    it("should work", () => {

        router.route('/')
            .get( (req, res, next) => {
                
            })

        assert.ok(true)
    })
})


interface IRequest extends Request {
    /**
     * your user
     */
    readonly user: {
        readonly id: number
    }
}
