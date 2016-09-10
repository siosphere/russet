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
            url: window.location.hash
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
        this.state = {
            url: window.location.hash
        }
    }

    render()
    {
        return RoutingService.doRouting(this.state.url)
    }
}