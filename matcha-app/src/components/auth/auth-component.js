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

        if(!jwt) {
            this.props.history.push('/login');
        } else {
            axios.post(ip+'/users',{
                "controller":"get",
                "user":localStorage.getItem('user_id'),
                "token":jwt
            }).then(res => {
                if (res.status != 200){
                    localStorage.removeItem('token');
                    this.props.history.push('/login');
                }
            }).catch(err => {
                localStorage.removeItem('token');
                this.props.history.push('/login'); 
            });
        }
    }

    render() {
        // if (this.state.user === undefined) {
        //     return (
        //         <div><h1>Loading...</h1></div>
        //     );
        // }
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

export default withRouter(Authenticated);