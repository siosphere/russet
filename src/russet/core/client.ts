import React = require('react')
import * as beef from 'beef-flux'

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
    protected interval : any

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

    componentDidMount()
    {
        this.interval = setInterval(() => {
            if(this.state.url !== window.location.pathname) {
                let state = this.state
                this.state.url = window.location.pathname
                this.setState(state)
            }
        }, 200)
    }

    componentWillUnmount()
    {
        clearInterval(this.interval)
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
        let response = RoutingService.doRouting(this.state.url)

        if(response && response.redirect) {
            this.doRedirect()
            return null
        }

        return response
    }

    doRedirect()
    {
        console.log('doing redirect')
        window.location.reload()
    }
}