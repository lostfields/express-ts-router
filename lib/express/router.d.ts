/// <reference types="express" />
import { Router as ExpressRouter, NextFunction, Request, Response } from 'express';
import { IRoute } from './route';
export declare class Router<TRequest extends Request, TResponse extends Response> {
    private _stack;
    private _extendRequest;
    private _extendResponse;
    private _handler;
    constructor(extendRequest: (req: Request) => TRequest, extendResponse: (req: Response) => TResponse);
    constructor(handler?: (req: Request, res: Response, next?: NextFunction) => void);
    route(path: string): IRoute<TRequest, TResponse>;
    getRouter(): ExpressRouter;
}
