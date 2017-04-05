/**
 * Template decorator
 */
import ReactDOMServer = require('react-dom/server')
import {Response} from "../web/response"
import {Global} from '../global'
import {HtmlPage} from './html-page'

let currentTemplateResponse = null

export let TemplateResponse = function(HtmlLayout)
{
    return function(target : any, propertyKey : string, descriptor : PropertyDescriptor)
    {
        var method = target[propertyKey]

        descriptor.value = function()
        {
            let page = new HtmlLayout(method.apply(target, arguments))

            if(currentTemplateResponse === null) {
                currentTemplateResponse = HtmlLayout.LAYOUT_ID
            }

            if(!Global.isServer() && HtmlLayout.LAYOUT_ID !== currentTemplateResponse) {
                return { redirect: true }
            }

            return Global.isServer() ? new Response('<html><head>'+ RenderTemplate(page['block:head']()) +'</head><body><div id="russet">' + RenderTemplate(page['block:body']()) + '</div>' + RenderTemplate(page['block:foot']()) + '</body></html>' ) : page['block:body']()
        }
    }
}

export let RenderTemplate = (component) => {
    return ReactDOMServer.renderToString(component)
}