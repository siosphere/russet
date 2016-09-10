/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/beef/dist/typings/index.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var beef = require('beef');
var RoutingService = beef.RoutingService;
var RussetClient = (function (_super) {
    __extends(RussetClient, _super);
    function RussetClient() {
        _super.call(this);
        this.state = {
            url: window.location.hash
        };
        this.onHashChange = this.onHashChange.bind(this);
    }
    RussetClient.prototype.componentWillMount = function () {
        window.addEventListener('hashchange', this.onHashChange);
    };
    RussetClient.prototype.componentWillUnmount = function () {
        window.removeEventListener('hashchange', this.onHashChange);
    };
    RussetClient.prototype.onHashChange = function (e) {
        this.state = {
            url: window.location.hash
        };
    };
    RussetClient.prototype.render = function () {
        return RoutingService.doRouting(this.state.url);
    };
    return RussetClient;
}(React.Component));
exports.RussetClient = RussetClient;
