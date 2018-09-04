/// <reference types="express" />
import * as Express from 'express';
export interface IRoute<TRequest extends Express.Request, TResponse extends Express.Response> {
    readonly path: string;
    use(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    get(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    post(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    patch(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    put(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    delete(...handler: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    handlers: {
        [method: string]: Express.RequestHandler[];
    };
}
export declare class Route<TRequest extends Express.Request, TResponse extends Express.Response> implements IRoute<TRequest, TResponse> {
    readonly path: string;
    private _handlers;
    constructor(path: string);
    readonly handlers: {
        [index: string]: ((req: TRequest, res: TResponse, next?: Express.NextFunction) => void)[];
    };
    use(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    get(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    post(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    patch(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    put(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    delete(...handlers: Array<(req: TRequest, res: TResponse, next?: Express.NextFunction) => any>): this;
    private handle(method, ...handlers);
}
