import React, { Component } from "react";
import axios from "axios";
var ip = require("../../server.json").ip;

export default class Verify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: '',
            msg: ''
        }
    }

    componentDidMount() {
        const { vkey } = this.props.match.params;

        axios.post(`${ip}/users/emailVerify/${vkey}`).then(res => {
            if (res.data.status) {
                this.setState({status: 'Sucess!!'});
            } else {
                this.setState({status: 'Failed!!'});
            }
            this.setState({msg: res.data.msg});
        }).catch(err => console.log(err));

        
    }

    render() {
        return(
            <div>
                <h1>{this.state.status}</h1>
                <h1>{this.state.msg}</h1>
            </div>
        )
    }
}
