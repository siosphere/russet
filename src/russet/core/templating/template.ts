/// <reference path="../../../../typings/index.d.ts" />
/**
 * Template decorator
 */

import ReactDOMServer = require('react-dom/server')
import {Response} from "../web/response"

export let TemplateResponse = function()
{
    return function(target : any, propertyKey : string, descriptor : PropertyDescriptor)
    {
        var method = target[propertyKey]

        descriptor.value = function()
        {
            return new Response(RenderTemplate(method.apply(target, arguments)))
        }
    }
}

export let RenderTemplate = (component) => {
    return ReactDOMServer.renderToString(component)
}