import connect = require('connect')
import bodyParser = require('body-parser')
import http = require('http')
import serveStatic = require('serve-static')
import * as React from "react";
import * as ReactDOM from "react-dom"
import ReactDOMServer = require('react-dom/server')
import {Response} from "./web/response"
import {WorkchainResponse} from "./workchain"
import {RussetClient} from './client'
import {Bundle} from "./bundle"
import beef = require('beef-flux')
import extend = require('extend')

let RoutingService = beef.RoutingService

export interface RussetConfig
{
    port? : number
}

export class CoreApp
{
    protected registeredRoutes : any

    protected server : any

    constructor()
    {
        this.registeredRoutes = {}

        this.registerBundle = this.registerBundle.bind(this)
        this.buildRoutes = this.buildRoutes.bind(this)
        this.getRoutes = this.getRoutes.bind(this)
    }

    bundles() : Bundle[]
    {
        return []
    }

    serve(request : http.ServerRequest, response : http.ServerResponse, next : (...any) => any)
    {
        let method = request.method
        let url = request.url

        let route = `${method}:${url}`

        let russetResponse : Response = RoutingService.doRouting(route, request, response)

        if(!russetResponse)
        {
            return next()
        }

        //check if the response is a workchain, in which case, defer rendering until completed
        if(russetResponse instanceof WorkchainResponse)
        {
            let workchainResponse = russetResponse as WorkchainResponse
            russetResponse = workchainResponse.getResponse()
        }

        response.statusCode = russetResponse.statusCode
        russetResponse.setupHeaders(response)
        response.end(russetResponse.content)
        next()
    }

    init()
    {
        this.bundles().forEach(this.registerBundle)

         RoutingService.routes(this.registeredRoutes)
    }

    start()
    {
        this.server = connect()
        this.server.use(bodyParser.urlencoded())
        this.server.use(serveStatic('public'))
        this.server.use(this.serve)

        this.init()

        let finalConfig : RussetConfig = extend(true, {}, this.defaultConfig(), this.config())
        http.createServer(this.server).listen(finalConfig.port)
    }

    startClient()
    {
        this.init()
        //TODO: allow reading from hash or full url via config
        ReactDOM.render(<RussetClient />, document.getElementById('russet'))
    }

    getRoutes()
    {
        return this.registeredRoutes
    }

    protected registerBundle(bundle : Bundle)
    {
        bundle.routes().forEach((Routes) => {
            this.buildRoutes(Routes)
        })
    }

    protected buildRoutes(_buildRoutes)
    {
        for(var key in _buildRoutes)
        {
            this.registeredRoutes[key] = _buildRoutes[key]
        }
    }

    protected config() : RussetConfig
    {
        return {}
    }

    private defaultConfig() : RussetConfig
    {
        return {
            port: 3000
        }
    }
}