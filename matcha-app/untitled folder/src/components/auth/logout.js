import React, { Component } from "react";

export default class Logout extends Component {
    componentDidMount() {
        if (localStorage.token) {
            localStorage.removeItem('token');
            this.props.history.push('/login');
        }
    }
    render() {
        return(<div>{this.props.history.push('/login')}</div>)
    }
}
