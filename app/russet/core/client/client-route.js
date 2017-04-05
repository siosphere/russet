"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoute = function (path, config) {
    if (config === void 0) { config = null; }
    return function (target, propertyKey, descriptor) {
        var routeMethod = target[propertyKey];
        target[path] = routeMethod;
    };
};
