/// <reference path="../../../../typings/index.d.ts" />
/**
 * Template decorator
 */

import ReactDOMServer = require('react-dom/server')
import {Response} from "../web/response"
import {Global} from '../global'

export let TemplateResponse = function()
{
    return function(target : any, propertyKey : string, descriptor : PropertyDescriptor)
    {
        var method = target[propertyKey]

        descriptor.value = function()
        {
            let page = method.apply(target, arguments)
            return Global.isServer() ? new Response('<html><head>'+ RenderTemplate(page['block:head']()) +'</head><body>' + RenderTemplate(page['block:body']()) + '</body></html>' ) : method.apply(target, arguments)
        }
    }
}

export let RenderTemplate = (component) => {
    return ReactDOMServer.renderToString(component)
}