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
            url: window.location.href
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
        console.log('the hash has changed')
        let hash = window.location.hash.substring(1)
        window.history.pushState({}, "", hash)
        this.state = {
            url: hash
        }
    }

    render()
    {
        return RoutingService.doRouting(this.state.url)
    }
}