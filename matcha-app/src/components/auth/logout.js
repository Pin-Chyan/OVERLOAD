import React, { Component } from "react";

export default class Logout extends Component {
    componentDidMount() {
        if (localStorage.token) {
            localStorage.setItem('logged', 'die');
            localStorage.removeItem('token');
            this.props.history.push('/login');
        }
    }
    render() {
        return(<div>{this.props.history.push('/login')}</div>)
    }
}
