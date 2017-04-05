"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GLOBAL_TYPE = "server";
var Global = {
    setClient: function () {
        GLOBAL_TYPE = "client";
    },
    setServer: function () {
        GLOBAL_TYPE = "server";
    },
    isClient: function () {
        return GLOBAL_TYPE === "client";
    },
    isServer: function () {
        return GLOBAL_TYPE === "server";
    }
};
exports.Global = Global;
