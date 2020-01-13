import React, { Component } from "react";
import { getJwt } from "./jwt-helper.js";
import axios from "axios";
import { withRouter } from 'react-router-dom';

var ip = require("../../server.json").ip;


class Authenticated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getJwt();

        console.log(jwt);

        if(!jwt) {
            this.props.history.push('/login');
        } else {
            axios.post(ip+'/auth/getUser', { headers: { Authorization: `bearer ${jwt}` } }).then(res => {
                this.setState({user: res.data});
            }).catch(err => {
                localStorage.removeItem('token');
                this.props.history.push('/login'); 
            });
        }
        //console.log(jwt);
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            );
        }
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

export default withRouter(Authenticated);