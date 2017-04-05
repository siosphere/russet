import { Response } from "./web/response";
export interface WorkchainCallable {
    (request: any, response: any): any;
}
export interface WorkchainErrorCallable {
    (err: Error, request: any, response: any): any;
}
export declare class WorkchainResponse extends Response {
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
