import { Router as ExpressRouter, NextFunction, Request, Response, RequestHandler} from 'express'

import { IRoute, Route } from './route'

export class Router<TRequest extends Request, TResponse extends Response> {
    private _stack: Array<IRoute<TRequest, TResponse>> = []
    
    private _extendRequest: (req: Request) => TRequest = null
    private _extendResponse: (res: Response) => TRequest = null
    private _handler: (req: Request, res: Response, next?: NextFunction) => void = null

    public constructor(extendRequest?: (req: Request) => TRequest, extendResponse?: (req: Response) => TResponse) 
    public constructor(handler?: (req: Request, res: Response, next?: NextFunction) => void)
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

    public getRouter(): ExpressRouter {
        let router = ExpressRouter()

        for(let route of this._stack) {
            let path = route.path

            router.use((req: Request, res: Response, next: NextFunction) => {
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