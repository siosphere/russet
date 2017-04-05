"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./web/response");
var WorkchainCallableClass = (function () {
    function WorkchainCallableClass(callable) {
        this.callable = callable;
    }
    WorkchainCallableClass.prototype.setNext = function (callable) {
        this.callable = callable;
    };
    return WorkchainCallableClass;
}());
var WorkchainResponse = (function (_super) {
    __extends(WorkchainResponse, _super);
    function WorkchainResponse(request, response) {
        var _this = _super.call(this) || this;
        _this.request = request;
        _this.response = response;
        _this.shouldExit = false;
        _this.errorCallables = [];
        _this.runCallable = _this.runCallable.bind(_this);
        _this.pipe = _this.pipe.bind(_this);
        _this.finally = _this.finally.bind(_this);
        _this.error = _this.error.bind(_this);
        _this.errorStack = [];
        return _this;
    }
    WorkchainResponse.prototype.pipe = function (callable) {
        if (this.errorStack.length === 0) {
            this.runCallable(callable);
        }
        return this;
    };
    WorkchainResponse.prototype.finally = function (callable) {
        this.runCallable(callable, true);
        return this;
    };
    WorkchainResponse.prototype.error = function (callable) {
        if (this.errorStack.length > 0) {
            this.runErrorCallable(callable);
        }
        else {
            this.errorCallables.push(callable);
        }
        return this;
    };
    WorkchainResponse.prototype.getResponse = function () {
        return this.response;
    };
    WorkchainResponse.prototype.onError = function () {
        if (this.errorCallables.length > 0) {
            this.errorCallables.forEach(this.runErrorCallable);
        }
    };
    WorkchainResponse.prototype.runCallable = function (callable, force) {
        if (force === void 0) { force = false; }
        try {
            if (!this.shouldExit && !force) {
                var result = callable(this.request, this.response);
                if (result instanceof response_1.Response) {
                    this.response = result;
                    this.shouldExit = true;
                }
                else if (result instanceof Error) {
                    this.errorStack.push(result);
                    this.onError();
                }
            }
        }
        catch (err) {
            this.errorStack.push(err);
            this.onError();
        }
    };
    WorkchainResponse.prototype.runErrorCallable = function (callable) {
        var result = callable(this.errorStack[this.errorStack.length - 1], this.request, this.response);
        if (result instanceof response_1.Response) {
            this.response = result;
            this.shouldExit = true;
        }
        else if (result instanceof Error) {
            this.errorStack.push(result);
        }
    };
    return WorkchainResponse;
}(response_1.Response));
exports.WorkchainResponse = WorkchainResponse;
exports.ResponseWorkchain = function (request, response) {
    return new WorkchainResponse(request, response);
};
