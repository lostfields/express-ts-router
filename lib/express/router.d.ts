import * as Express from 'express';
import { IRoute } from './route';
export declare class Router<TRequest extends Express.Request, TResponse extends Express.Response> {
    private _stack;
    private _extendRequest;
    private _extendResponse;
    private _handler;
    constructor(extendRequest: (req: Express.Request) => TRequest, extendResponse: (req: Express.Response) => TResponse);
    constructor(handler?: (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => void);
    route(path: string): IRoute<TRequest, TResponse>;
    getRouter(): Express.Router;
}
