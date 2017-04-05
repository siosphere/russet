import { Response, HTTPStatusCode } from "./response";
export declare class ApiResponse extends Response {
    constructor(data: any, statusCode?: HTTPStatusCode);
}
