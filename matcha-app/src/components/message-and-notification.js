import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 
import { StaticRouter } from 'react-router-dom';

var sesh = "meave@gmail.com";
var ip = require("../server.json").ip;
var token = "admin";
console.log(ip);

export default class Home extends Component {

    state = {
        email : "",
        target : "",
        msg : [],
		nmsg : "",
		notify : ""
	}

	emailhandler = event => {
		//this.setState({email:event.target.value});
		// console.log(this.state.email);
	}
	targethandler = event => {
		//this.setState({target:event.target.value});
		// console.log(this.state.target);
	}
	msghandle = event => {
		this.setState({nmsg:event.target.value});
		// console.log(this.state.nmsg);
	}

	msgsend = () => {
		console.log(this.state.email);
		console.log(this.state.target);
		console.log(this.state.nmsg);
		var data = {};
		data.email = sesh;
		data.target = sesh;
		data.notify = this.state.nmsg;
		data.token = token;
		axios.post(ip+"/users/notify", data);
	}

	// get_notify(){
	// 	var interval = setInterval(function (){return "got notify"}, 1000);
	// 	// this.setState{}
	// }

    render () {
        return (
        <div className="App">
            <input type="text" onChange={this.emailhandler} /><br/>
            <input type="text" onChange={this.targethandler} /><br/>
            <input type="text" onChange={this.msghandle} />
            <button onClick={this.msgsend}>Upload</button>
            <br/><text>{this.state.notfy}</text>
        </div>
        )
    }
} 