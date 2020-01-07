import React, { Component } from "react";

export default class Authenticated extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }
    render() {
        return (
        <div>
            Hello from auth
        </div>
        )
    }
}