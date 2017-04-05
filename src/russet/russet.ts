import {Bundle as BundleClass} from "./core/bundle"
import {CoreApp} from "./core/app"
import {TemplateResponse as TemplateResponseClass, RenderTemplate} from "./core/templating/template"
import {ApiResponse as ApiResponseClass} from "./core/web/api-response"
import {Response as ResponseClass} from "./core/web/response"
import {WorkchainResponse as WorkchainResponseClass, ResponseWorkchain as ResponseWorkchainClass} from "./core/workchain"
import {ClientRoute} from "./core/client/client-route"
import {Global} from './core/global'
import {HtmlPage as HtmlPageClass} from "./core/templating/html-page"
import {RussetClient} from './core/client'

export default
{
    App: CoreApp,

    Bundle: BundleClass,

    TemplateResponse:TemplateResponseClass,

    RenderTemplate: RenderTemplate,

    ApiResponse: ApiResponseClass,

    Response: ResponseClass,

    WorkchainResponse: WorkchainResponseClass,
    
    ResponseWorkchain: ResponseWorkchainClass,

    ClientRoute: ClientRoute,

    Global: Global,
    
    HtmlPage: HtmlPageClass,
    
    RussetClient: RussetClient
}