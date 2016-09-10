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
            return Global.isServer() ? new Response(RenderTemplate(method.apply(target, arguments))) : method.apply(target, arguments)
        }
    }
}

export let RenderTemplate = (component) => {
    return ReactDOMServer.renderToString(component)
}