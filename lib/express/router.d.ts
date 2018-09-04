import * as Express from 'express';
import { IRoute } from './route';
export declare class Router<TRequest extends Express.Request, TResponse extends Express.Response> {
    private _stack;
    private _extendRequest;
    private _extendResponse;
    private _handler;
    constructor(extendRequest: (req: Request) => TRequest, extendResponse: (req: Response) => TResponse);
    constructor(handler?: (req: Request, res: Response, next?: Express.NextFunction) => void);
    route(path: string): IRoute<TRequest, TResponse>;
    getRouter(): Express.Router;
}
