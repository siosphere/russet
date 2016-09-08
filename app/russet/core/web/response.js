"use strict";
(function (HTTPStatusCode) {
    HTTPStatusCode[HTTPStatusCode["CONTINUE"] = 100] = "CONTINUE";
    HTTPStatusCode[HTTPStatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HTTPStatusCode[HTTPStatusCode["PROCESSING"] = 102] = "PROCESSING";
    HTTPStatusCode[HTTPStatusCode["OK"] = 200] = "OK";
    HTTPStatusCode[HTTPStatusCode["CREATED"] = 201] = "CREATED";
    HTTPStatusCode[HTTPStatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    HTTPStatusCode[HTTPStatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HTTPStatusCode[HTTPStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTPStatusCode[HTTPStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HTTPStatusCode[HTTPStatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    HTTPStatusCode[HTTPStatusCode["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    HTTPStatusCode[HTTPStatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HTTPStatusCode[HTTPStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HTTPStatusCode[HTTPStatusCode["MOVED_TEMPORARILY"] = 302] = "MOVED_TEMPORARILY";
    HTTPStatusCode[HTTPStatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    HTTPStatusCode[HTTPStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HTTPStatusCode[HTTPStatusCode["USE_PROXY"] = 305] = "USE_PROXY";
    HTTPStatusCode[HTTPStatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HTTPStatusCode[HTTPStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPStatusCode[HTTPStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPStatusCode[HTTPStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HTTPStatusCode[HTTPStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPStatusCode[HTTPStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTPStatusCode[HTTPStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HTTPStatusCode[HTTPStatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HTTPStatusCode[HTTPStatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    HTTPStatusCode[HTTPStatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HTTPStatusCode[HTTPStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HTTPStatusCode[HTTPStatusCode["GONE"] = 410] = "GONE";
    HTTPStatusCode[HTTPStatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HTTPStatusCode[HTTPStatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HTTPStatusCode[HTTPStatusCode["REQUEST_TOO_LONG"] = 413] = "REQUEST_TOO_LONG";
    HTTPStatusCode[HTTPStatusCode["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
    HTTPStatusCode[HTTPStatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HTTPStatusCode[HTTPStatusCode["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
    HTTPStatusCode[HTTPStatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HTTPStatusCode[HTTPStatusCode["INSUFFICIENT_SPACE_ON_RESOURCE"] = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE";
    HTTPStatusCode[HTTPStatusCode["METHOD_FAILURE"] = 420] = "METHOD_FAILURE";
    HTTPStatusCode[HTTPStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HTTPStatusCode[HTTPStatusCode["LOCKED"] = 423] = "LOCKED";
    HTTPStatusCode[HTTPStatusCode["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    HTTPStatusCode[HTTPStatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HTTPStatusCode[HTTPStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HTTPStatusCode[HTTPStatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    HTTPStatusCode[HTTPStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HTTPStatusCode[HTTPStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HTTPStatusCode[HTTPStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HTTPStatusCode[HTTPStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HTTPStatusCode[HTTPStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HTTPStatusCode[HTTPStatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    HTTPStatusCode[HTTPStatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    HTTPStatusCode[HTTPStatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(exports.HTTPStatusCode || (exports.HTTPStatusCode = {}));
var HTTPStatusCode = exports.HTTPStatusCode;
var ResponseHeader = (function () {
    function ResponseHeader(name, value) {
        this.name = name;
        this.value = value;
    }
    return ResponseHeader;
}());
var Response = (function () {
    function Response(content, statusCode, charSet, headers) {
        if (content === void 0) { content = ""; }
        if (statusCode === void 0) { statusCode = HTTPStatusCode.OK; }
        if (charSet === void 0) { charSet = 'utf8'; }
        if (headers === void 0) { headers = []; }
        this.content = content;
        this.statusCode = statusCode;
        this.headers = headers;
    }
    Response.prototype.addHeader = function (name, value) {
        if (value === void 0) { value = null; }
        this.headers.push(new ResponseHeader(name, value));
    };
    Response.prototype.setContent = function (content) {
        this.content = content;
    };
    Response.prototype.setCharSet = function (charSet) {
        this.charSet = charSet;
    };
    Response.prototype.setStatusCode = function (statusCode) {
        this.statusCode = statusCode;
    };
    Response.prototype.setupHeaders = function (serverResponse) {
        this.headers.forEach(function (header) {
            serverResponse.setHeader(header.name, header.value);
        });
    };
    return Response;
}());
exports.Response = Response;
