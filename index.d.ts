declare module "russet"
{
    import http = require('http');
    import React = require('react');

    export declare const ClientRoute: (path: any, config?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    
    export declare class HtmlPageClass {
        ['block:head'](): any;
        ['block:body'](): any;
        ['block:foot'](): any;
    }

    declare let RenderTemplate: (component: any) => string;

    export declare class ApiResponseClass extends Response {
        constructor(data: any, statusCode?: HTTPStatusCode);
    }

    export declare enum HTTPStatusCode {
        CONTINUE = 100,
        SWITCHING_PROTOCOLS = 101,
        PROCESSING = 102,
        OK = 200,
        CREATED = 201,
        ACCEPTED = 202,
        NON_AUTHORITATIVE_INFORMATION = 203,
        NO_CONTENT = 204,
        RESET_CONTENT = 205,
        PARTIAL_CONTENT = 206,
        MULTI_STATUS = 207,
        MULTIPLE_CHOICES = 300,
        MOVED_PERMANENTLY = 301,
        MOVED_TEMPORARILY = 302,
        SEE_OTHER = 303,
        NOT_MODIFIED = 304,
        USE_PROXY = 305,
        TEMPORARY_REDIRECT = 307,
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        PAYMENT_REQUIRED = 402,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        METHOD_NOT_ALLOWED = 405,
        NOT_ACCEPTABLE = 406,
        PROXY_AUTHENTICATION_REQUIRED = 407,
        REQUEST_TIMEOUT = 408,
        CONFLICT = 409,
        GONE = 410,
        LENGTH_REQUIRED = 411,
        PRECONDITION_FAILED = 412,
        REQUEST_TOO_LONG = 413,
        REQUEST_URI_TOO_LONG = 414,
        UNSUPPORTED_MEDIA_TYPE = 415,
        REQUESTED_RANGE_NOT_SATISFIABLE = 416,
        EXPECTATION_FAILED = 417,
        INSUFFICIENT_SPACE_ON_RESOURCE = 419,
        METHOD_FAILURE = 420,
        UNPROCESSABLE_ENTITY = 422,
        LOCKED = 423,
        FAILED_DEPENDENCY = 424,
        PRECONDITION_REQUIRED = 428,
        TOO_MANY_REQUESTS = 429,
        REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
        INTERNAL_SERVER_ERROR = 500,
        NOT_IMPLEMENTED = 501,
        BAD_GATEWAY = 502,
        SERVICE_UNAVAILABLE = 503,
        GATEWAY_TIMEOUT = 504,
        HTTP_VERSION_NOT_SUPPORTED = 505,
        INSUFFICIENT_STORAGE = 507,
        NETWORK_AUTHENTICATION_REQUIRED = 511,
    }

    export declare class ResponseHeader {
        name: string;
        value: any;
        constructor(name: any, value: any);
    }

    export declare class ResponseClass {
        content: any;
        statusCode: HTTPStatusCode;
        charSet: string;
        headers: ResponseHeader[];
        constructor(content?: string, statusCode?: HTTPStatusCode, charSet?: string, headers?: any[]);
        addHeader(name: string, value?: any): void;
        setContent(content: string): void;
        setCharSet(charSet: string): void;
        setStatusCode(statusCode: HTTPStatusCode): void;
        setupHeaders(serverResponse: http.ServerResponse): void;
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

    export declare class BundleClass {
        routes(): any[];
    }

    export interface RussetClientProps {
    }
    
    export interface RussetClientState {
        url: string;
    }

    export declare class RussetClient extends React.Component<RussetClientProps, RussetClientState> {
        protected interval: any;
        constructor();
        componentWillMount(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected onHashChange(e: HashChangeEvent): void;
        render(): any;
        doRedirect(): void;
    }
    
    export interface WorkchainCallable {
        (request: any, response: any): any;
    }

    export interface WorkchainErrorCallable {
        (err: Error, request: any, response: any): any;
    }

    export declare class WorkchainResponseClass extends Response {
        protected request: any;
        protected response: any;
        protected shouldExit: boolean;
        protected errorStack: Error[];
        protected errorCallables: WorkchainErrorCallable[];
        constructor(request: any, response: any);
        pipe(callable: WorkchainCallable): this;
        finally(callable: WorkchainCallable): this;
        error(callable: WorkchainErrorCallable): this;
        getResponse(): any;
        protected onError(): void;
        protected runCallable(callable: WorkchainCallable, force?: boolean): void;
        protected runErrorCallable(callable: WorkchainErrorCallable): void;
    }
    export declare const ResponseWorkchain: (request: any, response: any) => WorkchainResponse;


    declare var _default: {
        App: typeof CoreApp;
        Bundle: typeof BundleClass;
        TemplateResponse: (HtmlLayout: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
        ApiResponse: typeof ApiResponseClass;
        RenderTemplate: typeof RenderTemplate;
        Response: typeof ResponseClass;
        WorkchainResponse: typeof WorkchainResponseClass;
        ResponseWorkchain: (request: any, response: any) => WorkchainResponseClass;
        ClientRoute: (path: any, config?: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
        Global: {
            setClient(): void;
            setServer(): void;
            isClient(): boolean;
            isServer(): boolean;
        };
        HtmlPage: typeof HtmlPageClass;
        RussetClient: typeof RussetClient;
    };
    export default _default;
}