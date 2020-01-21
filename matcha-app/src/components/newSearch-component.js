import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactDOM from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { compileFunction } from 'vm';
import { get } from 'https';
import { callExpression } from '@babel/types';
const ip = require('../server.json').ip;

///eve protocol

export default class User extends Component {
    constructor(props){
        super(props);
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
        console.log(this.ip);
        async function server_check(ip){
            let promise = await axios.post(ip + '/ping/ms');
            if (promise.status === 200){
                return ('eve online');
            }
            else
                return ('eve offline');
        }
        server_check(this.ip).then(res => {
            if (res === 'eve online'){
                console.log('eve online');
                ///////////////////////////////////////////////////////////
                //      <<<< begin binding after database online >>>>
                this.eve_mount = this.eve_mount.bind(this);
                this.userData_getter = this.userData_getter.bind(this);
                this.state = {};
                this.userData_getter();
            }
            else
                console.log('eve redirect');///replace with redirect
        });
    }

    userData_getter(){
        console.log('getting data......');
        async function get_email(jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
            else
                return 'eve redirect';
        }
        async function get_data(email,token,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "token":token, "target":target});
            if (promise.status === 200)
                return promise.data;
            else
                return 'eve redirect';
        }
        //
        //      <<<< target will be customised for each page for optimisation >>>>
        //
        get_email(this.jwt).then(emailGet_res => {
            if (emailGet_res !== 'eve redirect')
                get_data(emailGet_res.email,this.jwt,this.ip,"name").then(userGet_res => {
                    if (userGet_res !== 'eve redirect'){
                        this.setState({"user":userGet_res[0]});
                        this.eve_mount();
                    }
                    else
                        console.log('eve redirect');///replace with redirect
                })
            else
                console.log('eve redirect');///replace with redirect
        })
    }

    eve_mount(){
        console.log('mounted');
        console.log('user : ' + this.state.user.name);
    }
    

    render () {
        return (
            <text style={{}}>eve online</text>
        );
    }
}