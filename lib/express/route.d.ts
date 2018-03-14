/// <reference types="express" />
import { Request, Response, RequestHandler, NextFunction } from 'express';
export interface IRoute<TRequest, TResponse> {
    readonly path: string;
    use(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    get(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    post(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    patch(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    put(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    delete(...handler: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    handlers: {
        [method: string]: RequestHandler[];
    };
}
export declare class Route<TRequest extends Request, TResponse extends Response> implements IRoute<TRequest, TResponse> {
    readonly path: string;
    private _handlers;
    constructor(path: string);
    readonly handlers: {
        [index: string]: ((req: TRequest, res: TResponse, next?: NextFunction) => void)[];
    };
    use(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    get(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    post(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    patch(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    put(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    delete(...handlers: Array<(req: TRequest, res: TResponse, next?: NextFunction) => any>): this;
    private handle(method, ...handlers);
}
