import { Request, Response, RequestHandler, NextFunction } from 'express'

export interface IRoute<TRequest, TResponse> {
    readonly path: string

    use(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this
    
    get(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this
    post(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this
    patch(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this
    put(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this
    delete(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this

    handlers: {
        [method: string]: RequestHandler[]
    }
}

export class Route<TRequest extends Request, TResponse extends Response> implements IRoute<TRequest, TResponse> {
    private _handlers: {
        [index: string]: Array<(req: TRequest, res: TResponse, next?: NextFunction) => void>
    }

    public constructor(public readonly path: string) {
        this._handlers = {}
    }

    public get handlers() {
        return this._handlers
    }

    public use(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('use', ...handlers)

        return this
    }

    public get(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('get', ...handlers)

        return this
    }

    public post(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('post', ...handlers)

        return this
    }

    public patch(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('patch', ...handlers)

        return this
    }

    public put(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('put', ...handlers)

        return this
    }    

    public delete(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this {
        this.handle('delete', ...handlers)

        return this
    }

    private handle(method, ...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>) {
        if(this._handlers[method] == null)
            this._handlers[method] = []

        for(let handler of handlers.map(handler => asyncHandler(handler)))
            this._handlers[method].push(handler)
    }
}

function asyncHandler<TRequest extends Request, TResponse extends Response>(fn: (request: Request, response: Response, next?: NextFunction) => any) {
    return async (req: TRequest, res: TResponse, next: NextFunction) => {
        let nexted = false,
            ex: Error

        try {
            let ret = fn(req, res, (err) => { 
                nexted = true
                ex = err
            })

            if(ret instanceof Promise)
                await ret
            
            if(nexted)
                next(ex)
        }
        catch(err) {
            if(nexted == false)
                next(err)
        }
    }
}