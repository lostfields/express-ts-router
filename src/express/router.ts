import * as Express from 'express'

import { IRoute, Route } from './route'

export class Router<TRequest extends Express.Request, TResponse extends Express.Response> {
    private _stack: Array<IRoute<TRequest, TResponse>> = []
    
    private _extendRequest: (req: Express.Request) => TRequest = null
    private _extendResponse: (res: Express.Response) => TRequest = null
    private _handler: (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => void = null

    public constructor(extendRequest: (req: Express.Request) => TRequest, extendResponse: (req: Express.Response) => TResponse) 
    public constructor(handler?: (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => void)
    public constructor() { //handler: (req: TRequest, res: TResponse, next: NextFunction) => void) {
        if(typeof arguments[0] == 'function') 
            switch(arguments[0].length) {
                case 1:
                    this._extendRequest = arguments[0]
                    break
                case 2: 
                    this._handler = arguments[0]
                    break
            }

        if(typeof arguments[1] == 'function' && arguments[1].length == 1)
            this._extendResponse = arguments[1]
    }

    public route(path: string): IRoute<TRequest, TResponse> {
        let route = new Route<TRequest, TResponse>(path)
        
        this._stack.push(route);

        return route;
    }

    public getRouter(): Express.Router {
        let router = Express.Router()

        for(let route of this._stack) {
            let path = route.path

            router.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                let ex: Error

                try {
                    if(this._handler) {
                        this._handler(req, res, (err) => next(ex = err))
                    }
                    else {
                        if(this._extendRequest)
                            Object.assign(req, this._extendRequest(req))
                        
                        if(this._extendResponse)
                            Object.assign(res, this._extendResponse(res))

                        next()
                    }
                } 
                catch(err) {
                    if(ex == undefined)
                        next(ex)
                }
            })

            for(let [method, handlers] of Object.entries(route.handlers))
            {
                if(typeof router[method] == 'function') {
                    router[method](route.path, ...handlers);
                }
            }
        }

        return router
    }
}