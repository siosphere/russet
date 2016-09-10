export const ClientRoute = function(path, config = null)
{
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //add new client side route
         var routeMethod = target[propertyKey]
        target[path] = routeMethod
    }
}
