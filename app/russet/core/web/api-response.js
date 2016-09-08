"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var response_1 = require("./response");
var ApiResponse = (function (_super) {
    __extends(ApiResponse, _super);
    function ApiResponse(data, statusCode) {
        if (statusCode === void 0) { statusCode = response_1.HTTPStatusCode.OK; }
        _super.call(this, JSON.stringify(data), statusCode);
        this.addHeader("Content-Type", "application/json");
    }
    return ApiResponse;
}(response_1.Response));
exports.ApiResponse = ApiResponse;
