/*
class Entity
{
    protected static gravyConfig = {}

    public static events = {
        lifecycle: {
            preload: '{modelType}.lifecycle.preload',
            postload: '{modelType}.lifecycle.postload',
            errload: '{modelType}.lifecycle.errload',
            presave: '{modelType}.lifecycle.presave',
            postsave: '{modelType}.lifecycle.postsave',
            errsave: '{modelType}.lifecycle.errsave',
            predelete: '{modelType}.lifecycle.predelete',
            postdelete: '{modelType}.lifecycle.postdelete',
            errdelete:'{modelType}.lifecycle.errdelete'
        }
    }

    gravy()
    {
        return Entity.gravyConfig
    }
}
/*
class Store
{
    save(entity : Entity)
    {
        //get the backend associated with the entity
        //get connector and build query
        //execute query in connector
        MysqlBackend.saveEntity(entity).then(() => {
            this.emit(entity.events.lifecycle.saved)
        })
    }
}*/
/*
const Backend = (backendType, config) =>
{
    const setupEvents = (constructor) => 
    {
        for(var event in constructor.events.lifecycle)
        {
            constructor.events.lifecycle[event] = constructor.events.lifecycle[event].replace('{modelType}', constructor.name)
        }
    }

    return function(constructor : any)
    {

        var newConstructor : any = function(...args)
        {
            this.gravyConfig = {
                backendType: backendType,
                config: config
            }

            setupEvents(constructor)

            return constructor.apply(this, args)
        };

        newConstructor.prototype = constructor.prototype

        return newConstructor as void
    }
}

class Schema
{
    public static int()
    {

    }
}

const Store = function(data)
{

}

export = {
    Entity,
    Store,
    Backend,
    Schema
}*/