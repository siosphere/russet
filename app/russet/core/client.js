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
var React = require("react");
var beef = require("beef-flux");
var RoutingService = beef.RoutingService;
var RussetClient = (function (_super) {
    __extends(RussetClient, _super);
    function RussetClient() {
        var _this = _super.call(this) || this;
        _this.state = {
            url: window.location.pathname
        };
        _this.onHashChange = _this.onHashChange.bind(_this);
        return _this;
    }
    RussetClient.prototype.componentWillMount = function () {
        window.addEventListener('hashchange', this.onHashChange);
    };
    RussetClient.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.state.url !== window.location.pathname) {
                var state = _this.state;
                _this.state.url = window.location.pathname;
                _this.setState(state);
            }
        }, 200);
    };
    RussetClient.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    RussetClient.prototype.onHashChange = function (e) {
        var hash = window.location.hash.substring(1);
        if (hash.charAt(0) !== '/') {
            hash = "/" + hash;
        }
        window.history.replaceState({}, "", hash);
        var state = this.state;
        state = {
            url: hash
        };
        this.setState(state);
    };
    RussetClient.prototype.render = function () {
        var response = RoutingService.doRouting(this.state.url);
        if (response && response.redirect) {
            this.doRedirect();
            return null;
        }
        return response;
    };
    RussetClient.prototype.doRedirect = function () {
        console.log('doing redirect');
        window.location.reload();
    };
    return RussetClient;
}(React.Component));
exports.RussetClient = RussetClient;
