var GLOBAL_TYPE = "server"

let Global = {
    setClient()
    {
        GLOBAL_TYPE = "client"
    },

    setServer()
    {
        GLOBAL_TYPE = "server"
    },

    isClient()
    {
        return GLOBAL_TYPE === "client"
    },

    isServer()
    {
        return GLOBAL_TYPE === "server"
    }
}

export {
    Global
}