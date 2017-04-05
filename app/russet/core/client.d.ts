import React = require('react');
export interface RussetClientProps {
}
export interface RussetClientState {
    url: string;
}
export declare class RussetClient extends React.Component<RussetClientProps, RussetClientState> {
    protected interval: any;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected onHashChange(e: HashChangeEvent): void;
    render(): any;
    doRedirect(): void;
}
