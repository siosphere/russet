"use strict";
exports.ClientRoute = function (path, config) {
    if (config === void 0) { config = null; }
    return function (target, propertyKey, descriptor) {
        //add new client side route
        var routeMethod = target[propertyKey];
        target[path] = routeMethod;
    };
};
