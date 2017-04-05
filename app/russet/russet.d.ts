import { Bundle } from "./core/bundle";
import { CoreApp } from "./core/app";
import { ApiResponse } from "./core/web/api-response";
import { Response } from "./core/web/response";
import { WorkchainResponse } from "./core/workchain";
import { HtmlPage } from "./core/templating/html-page";
import { RussetClient } from './core/client';
declare var _default: {
    CoreApp: typeof CoreApp;
    Bundle: typeof Bundle;
    TemplateResponse: (HtmlLayout: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    RenderTemplate: (component: any) => string;
    ApiResponse: typeof ApiResponse;
    Response: typeof Response;
    WorkchainResponse: typeof WorkchainResponse;
    ResponseWorkchain: (request: any, response: any) => WorkchainResponse;
    ClientRoute: (path: any, config?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    Global: {
        setClient(): void;
        setServer(): void;
        isClient(): boolean;
        isServer(): boolean;
    };
    HtmlPage: typeof HtmlPage;
    RussetClient: typeof RussetClient;
};
export default _default;
