"use strict";
var Entity = (function () {
    function Entity() {
    }
    Entity.prototype.gravy = function () {
        return Entity.gravyConfig;
    };
    Entity.gravyConfig = {};
    Entity.events = {
        lifecycle: {
            preload: '{modelType}.lifecycle.preload',
            postload: '{modelType}.lifecycle.postload',
            errload: '{modelType}.lifecycle.errload',
            presave: '{modelType}.lifecycle.presave',
            postsave: '{modelType}.lifecycle.postsave',
            errsave: '{modelType}.lifecycle.errsave',
            predelete: '{modelType}.lifecycle.predelete',
            postdelete: '{modelType}.lifecycle.postdelete',
            errdelete: '{modelType}.lifecycle.errdelete'
        }
    };
    return Entity;
}());
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
var Backend = function (backendType, config) {
    var setupEvents = function (constructor) {
        for (var event in constructor.events.lifecycle) {
            constructor.events.lifecycle[event] = constructor.events.lifecycle[event].replace('{modelType}', constructor.name);
        }
    };
    return function (constructor) {
        var newConstructor = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.gravyConfig = {
                backendType: backendType,
                config: config
            };
            setupEvents(constructor);
            return constructor.apply(this, args);
        };
        newConstructor.prototype = constructor.prototype;
        return newConstructor;
    };
};
var Schema = (function () {
    function Schema() {
    }
    Schema.int = function () {
    };
    return Schema;
}());
var Store = function (data) {
};
module.exports = {
    Entity: Entity,
    Store: Store,
    Backend: Backend,
    Schema: Schema
};
