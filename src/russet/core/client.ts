/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/beef/dist/typings/index.d.ts" />

import React = require('react')
import beef = require('beef')

const RoutingService = beef.RoutingService

export interface RussetClientProps
{
}

export interface RussetClientState
{
    url : string
}

export class RussetClient extends React.Component<RussetClientProps, RussetClientState>
{
    constructor()
    {
        super()
        
        this.state = {
            url: window.location.pathname
        }

        this.onHashChange = this.onHashChange.bind(this)
    }

    componentWillMount()
    {
        window.addEventListener('hashchange', this.onHashChange)
    }

    componentWillUnmount()
    {
        window.removeEventListener('hashchange', this.onHashChange)
    }

    protected onHashChange(e : HashChangeEvent)
    {
        let hash = window.location.hash.substring(1)
        if(hash.charAt(0) !== '/') {
            hash = "/" + hash
        }

        window.history.replaceState({}, "", hash)
        let state = this.state

        state = {
            url: hash
        }

        this.setState(state)
    }

    render()
    {
        return RoutingService.doRouting(this.state.url)
    }
}