import React, { Component } from "react";
import { getJwt } from "./jwt-helper.js";
// import axios from "axios";

export default class Authenticated extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();

        if(!jwt) {
            this.props.history.push('/login');
        }

        console.log(jwt);
    }

    render() {
        return (
        <div>
            Hello from auth
        </div>
        )
    }
}