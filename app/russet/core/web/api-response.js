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
var response_1 = require("./response");
var ApiResponse = (function (_super) {
    __extends(ApiResponse, _super);
    function ApiResponse(data, statusCode) {
        if (statusCode === void 0) { statusCode = response_1.HTTPStatusCode.OK; }
        var _this = _super.call(this, JSON.stringify(data), statusCode) || this;
        _this.addHeader("Content-Type", "application/json");
        return _this;
    }
    return ApiResponse;
}(response_1.Response));
exports.ApiResponse = ApiResponse;
