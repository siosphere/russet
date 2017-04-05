import http = require('http');
import { Bundle } from "./bundle";
export interface RussetConfig {
    port?: number;
}
export declare class CoreApp {
    protected registeredRoutes: any;
    protected server: any;
    constructor();
    bundles(): Bundle[];
    serve(request: http.ServerRequest, response: http.ServerResponse, next: (...any) => any): any;
    init(): void;
    start(): void;
    startClient(): void;
    getRoutes(): any;
    protected registerBundle(bundle: Bundle): void;
    protected buildRoutes(_buildRoutes: any): void;
    protected config(): RussetConfig;
    private defaultConfig();
}
