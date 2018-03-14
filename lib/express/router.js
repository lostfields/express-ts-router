"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = require("./route");
class Router {
    constructor() {
        this._stack = [];
        this._extendRequest = null;
        this._extendResponse = null;
        this._handler = null;
        if (typeof arguments[0] == 'function')
            switch (arguments[0].length) {
                case 1:
                    this._extendRequest = arguments[0];
                    break;
                case 2:
                    this._handler = arguments[0];
                    break;
            }
        if (typeof arguments[1] == 'function' && arguments[1].length == 1)
            this._extendResponse = arguments[1];
    }
    route(path) {
        let route = new route_1.Route(path);
        this._stack.push(route);
        return route;
    }
    getRouter() {
        let router = express_1.Router();
        for (let route of this._stack) {
            let path = route.path;
            router.use((req, res, next) => {
                let ex;
                try {
                    if (this._handler) {
                        this._handler(req, res, (err) => next(ex = err));
                    }
                    else {
                        if (this._extendRequest)
                            Object.assign(req, this._extendRequest(req));
                        if (this._extendResponse)
                            Object.assign(res, this._extendResponse(res));
                        next();
                    }
                }
                catch (err) {
                    if (ex == undefined)
                        next(ex);
                }
            });
            for (let [method, handlers] of Object.entries(route.handlers)) {
                if (typeof router[method] == 'function') {
                    router[method](route.path, ...handlers);
                }
            }
        }
        return router;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map