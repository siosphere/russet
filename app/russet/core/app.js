"use strict";
/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/beef/dist/typings/index.d.ts" />
var connect = require('connect');
var bodyParser = require('body-parser');
var http = require('http');
var serveStatic = require('serve-static');
var ReactDOM = require("react-dom");
var workchain_1 = require("./workchain");
var beef = require('beef');
var extend = require('extend');
var RoutingService = beef.RoutingService;
var CoreApp = (function () {
    function CoreApp() {
        this.server = connect();
        this.server.use(bodyParser.urlencoded());
        this.server.use(serveStatic('public'));
        this.server.use(this.serve);
        this.registeredRoutes = {};
        this.registerBundle = this.registerBundle.bind(this);
        this.buildRoutes = this.buildRoutes.bind(this);
        this.getRoutes = this.getRoutes().bind(this);
    }
    CoreApp.prototype.bundles = function () {
        return [];
    };
    CoreApp.prototype.serve = function (request, response, next) {
        var method = request.method;
        var url = request.url;
        var route = method + ":" + url;
        var russetResponse = RoutingService.doRouting(route, request, response);
        if (!russetResponse) {
            return next();
        }
        //check if the response is a workchain, in which case, defer rendering until completed
        if (russetResponse instanceof workchain_1.WorkchainResponse) {
            var workchainResponse = russetResponse;
            russetResponse = workchainResponse.getResponse();
        }
        response.statusCode = russetResponse.statusCode;
        russetResponse.setupHeaders(response);
        response.end(russetResponse.content);
        next();
    };
    CoreApp.prototype.start = function () {
        this.bundles().forEach(this.registerBundle);
        var finalConfig = extend(true, {}, this.defaultConfig(), this.config());
        http.createServer(this.server).listen(finalConfig.port);
    };
    CoreApp.prototype.startClient = function (domElement) {
        //TODO: allow reading from hash or full url via config
        ReactDOM.render(/>, domElement));
    };
    CoreApp.prototype.getRoutes = function () {
        return this.registeredRoutes;
    };
    CoreApp.prototype.registerBundle = function (bundle) {
        var _this = this;
        bundle.routes().forEach(function (Routes) {
            _this.buildRoutes(Routes);
        });
        RoutingService.routes(this.registeredRoutes);
    };
    CoreApp.prototype.buildRoutes = function (_buildRoutes) {
        for (var key in _buildRoutes) {
            this.registeredRoutes[key] = _buildRoutes[key];
        }
    };
    CoreApp.prototype.config = function () {
        return {};
    };
    CoreApp.prototype.defaultConfig = function () {
        return {
            port: 3000
        };
    };
    return CoreApp;
}());
exports.CoreApp = CoreApp;
