/// <reference path="../../../../typings/index.d.ts" />
/**
 * Template decorator
 */
"use strict";
var ReactDOMServer = require('react-dom/server');
var response_1 = require("../web/response");
var global_1 = require('../global');
exports.TemplateResponse = function (HtmlLayout) {
    return function (target, propertyKey, descriptor) {
        var method = target[propertyKey];
        descriptor.value = function () {
            var page = new HtmlLayout(method.apply(target, arguments));
            return global_1.Global.isServer() ? new response_1.Response('<html><head>' + exports.RenderTemplate(page['block:head']()) + '</head><body><div id="russet">' + exports.RenderTemplate(page['block:body']()) + '</div>' + exports.RenderTemplate(page['block:foot']()) + '</body></html>') : page['block:body']();
        };
    };
};
exports.RenderTemplate = function (component) {
    return ReactDOMServer.renderToString(component);
};
