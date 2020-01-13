import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 
import { StaticRouter } from 'react-router-dom';
import { getJwt } from "./auth/jwt-helper.js";

var sesh = "meave@gmail.com";
var ip = require("../server.json").ip;
var token = "admin";
console.log(ip);

export default class Home extends Component {

    state = {
        selectedFile : null,
        ctag : ["loading"],
        ntag : ""
    }
    componentDidMount () {
        axios.post(ip+"/users/get_spec", {"email": sesh, "target":"img name tag", "token":token}).then(res => {
            console.log(res.data[0]);
            if (res.data == "invalid token" || res.data == "token not present"){
                return (window.location.href = ip+"/login");
            }
            else if (res.data[0].tag){
                this.setState({
                    ctag: res.data[0].tag
                });
            }
        });
    }

    tag_handler = event => {
        // console.log(event.target.value);
        this.setState({ntag : event.target.value});
    }

    tag_push = () => {
        var tag  = this.state.ctag;
        const new_tag = this.state.ntag.trim();
        if (!tag.find(function (res){return res == '#' + new_tag;}) && new_tag != ""){
            tag.push('#' + new_tag);
            this.setState({ctag: tag});
            axios.post(ip+"/users/edit_spec", {"email": sesh,"token":token, "tag":tag});
        }
    }

    tag_remove = () => {
        var tag  = this.state.ctag;
        const new_tag = this.state.ntag.trim();
        if (tag.find(function (res){return res == '#' + new_tag;}) && new_tag != ""){
            var pos = tag.findIndex(function (res){return res == '#' + new_tag;});
            tag.splice(pos,1);
            this.setState({ctag : tag});
            axios.post(ip+"/users/edit_spec", {"email": sesh,"token":token, "tag":tag});
        }
    }

    event_catch(event){
        console.log(event.target.id);
    }

    render () {
        return (
        <div className="App">
            <input type="text" onChange={this.tag_handler} />
            <button onClick={this.tag_push}>Upload</button>
            <button onClick={this.tag_remove}>Remove</button>
            <div value={"lol"} onClick={e => this.event_catch(e)}><button id="3" value="it works">hi</button></div>
            <br/><text>{this.state.ctag}</text>
            <br/><text>{this.state.ntag}</text>
        </div>
        )
    }
} 