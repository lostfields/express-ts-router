"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.CoreRouter = express_1.Router;
const router_1 = require("./express/router");
exports.Router = router_1.Router;
exports.default = router_1.Router;
// test
let router = new router_1.Router();
if (router) {
}
//# sourceMappingURL=index.js.map