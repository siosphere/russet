import {Response} from "./web/response"

export interface WorkchainCallable
{
    (request : any, response : any) : any
}

export interface WorkchainErrorCallable
{
    (err: Error, request : any, response : any) : any
}

class WorkchainCallableClass
{
    protected next : WorkchainCallable
    protected callable : WorkchainCallable

    constructor(callable : WorkchainCallable)
    {
        this.callable = callable
    }

    setNext(callable : WorkchainCallable)
    {
        this.callable = callable
    }
}

export class WorkchainResponse extends Response
{
    protected request
    protected response
    protected shouldExit : boolean
    protected errorStack : Error[]
    protected errorCallables : WorkchainErrorCallable[]

    constructor(request : any, response : any)
    {
        super()

        this.request = request
        this.response = response
        this.shouldExit = false
        this.errorCallables = []
        this.runCallable = this.runCallable.bind(this)
        this.pipe = this.pipe.bind(this)
        this.finally = this.finally.bind(this)
        this.error = this.error.bind(this)

        this.errorStack = []
    }

    pipe(callable : WorkchainCallable)
    {
        if(this.errorStack.length === 0) {
            this.runCallable(callable)
        }
        return this
    }

    finally(callable : WorkchainCallable)
    {
        this.runCallable(callable, true)
        return this
    }

    error(callable : WorkchainErrorCallable)
    {
        if(this.errorStack.length > 0) {
            this.runErrorCallable(callable)
        } else {
            this.errorCallables.push(callable)
        }

        return this
    }

    getResponse()
    {
        return this.response
    }

    protected onError()
    {
        if(this.errorCallables.length > 0)
        {
            this.errorCallables.forEach(this.runErrorCallable)
        }
    }

    protected runCallable(callable : WorkchainCallable, force : boolean = false)
    {
        try {
            if(!this.shouldExit && !force) {
                let result = callable(this.request, this.response)
                if(result instanceof Response) {
                    this.response = result
                    this.shouldExit = true
                } else if(result instanceof Error) {
                    this.errorStack.push(result)
                    this.onError()
                }
            }
        } catch(err) {
            this.errorStack.push(err)
            this.onError()
        }
    }

    protected runErrorCallable(callable : WorkchainErrorCallable)
    {
        let result = callable(this.errorStack[this.errorStack.length - 1], this.request, this.response)
        if(result instanceof Response) {
            this.response = result
            this.shouldExit = true
        } else if(result instanceof Error) {
            this.errorStack.push(result)
        }
    }
}

export const ResponseWorkchain = (request : any, response : any) => {

    return new WorkchainResponse(request, response)

}