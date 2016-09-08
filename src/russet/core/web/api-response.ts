import {Response, HTTPStatusCode} from "./response"

export class ApiResponse extends Response
{
    constructor(data, statusCode : HTTPStatusCode = HTTPStatusCode.OK)
    {
        super(JSON.stringify(data), statusCode)

        this.addHeader("Content-Type", "application/json")
    }
}