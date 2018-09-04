"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(path) {
        this.path = path;
        this._handlers = {};
    }
    get handlers() {
        return this._handlers;
    }
    use(...handlers) {
        this.handle('use', ...handlers);
        return this;
    }
    get(...handlers) {
        this.handle('get', ...handlers);
        return this;
    }
    post(...handlers) {
        this.handle('post', ...handlers);
        return this;
    }
    patch(...handlers) {
        this.handle('patch', ...handlers);
        return this;
    }
    put(...handlers) {
        this.handle('put', ...handlers);
        return this;
    }
    delete(...handlers) {
        this.handle('delete', ...handlers);
        return this;
    }
    handle(method, ...handlers) {
        if (this._handlers[method] == null)
            this._handlers[method] = [];
        for (let handler of handlers.map(handler => asyncHandler(handler)))
            this._handlers[method].push(handler);
    }
}
exports.Route = Route;
function asyncHandler(fn) {
    return async (req, res, next) => {
        let nexted = false, ex;
        try {
            let ret = fn(req, res, (err) => {
                nexted = true;
                ex = err;
            });
            if (ret instanceof Promise)
                await ret;
            if (nexted)
                next(ex);
        }
        catch (err) {
            if (nexted == false)
                next(err);
        }
    };
}
//# sourceMappingURL=route.js.map