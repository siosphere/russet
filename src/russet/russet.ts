import {Bundle as BundleClass} from "./core/bundle"
import {CoreApp} from "./core/app"
import {TemplateResponse as TemplateResponseClass} from "./core/templating/template"
import {ApiResponse as ApiResponseClass} from "./core/web/api-response"
import {Response as ResponseClass} from "./core/web/response"
import {WorkchainResponse as WorkchainResponseClass, ResponseWorkchain as ResponseWorkchainClass} from "./core/workchain"

class RussetExportClass
{
    App = CoreApp

    Bundle = BundleClass

    TemplateResponse = TemplateResponseClass

    ApiResponse = ApiResponseClass

    Response = ResponseClass

    WorkchainResponse = WorkchainResponseClass
    
    ResponseWorkchain = ResponseWorkchainClass
}

const RussetExports = new RussetExportClass()

export = RussetExports