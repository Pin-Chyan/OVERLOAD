import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Inbox from './message-and-notification';
import { Fade } from 'react-slideshow-image';
import cons from './chat-component';


var loggedin = "lkrielin@gmail.com" //userid

export default class Home extends Component {

    constructor(props){
        super(props);
        this.jwt = "admin"//localStorage.token;
        this.ip = require('../server.json').ip;
        this.nll = require("../images/chibi.jpg");
        this.state = {};
        axios.post(this.ip + '/auth', {
            "controller":"login",
            "user":"lkrielin@gmail.com",
            "token":"",
            "args":{
                "password":"Waifusocks11"
            }
        }).then(res => {
            if (res.status === 200){
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user)_id', "lkrielin@gmail.com");
                this.pull_userdata();
            }
        });
    }

    render() {
        return (
            <div>
                hi
            </div>
        )
    }
}