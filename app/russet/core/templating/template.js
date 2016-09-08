/// <reference path="../../../../typings/index.d.ts" />
/**
 * Template decorator
 */
"use strict";
var ReactDOMServer = require('react-dom/server');
var response_1 = require("../web/response");
exports.TemplateResponse = function () {
    return function (target, propertyKey, descriptor) {
        var method = target[propertyKey];
        descriptor.value = function () {
            return new response_1.Response(exports.RenderTemplate(method.apply(target, arguments)));
        };
    };
};
exports.RenderTemplate = function (component) {
    return ReactDOMServer.renderToString(component);
};
