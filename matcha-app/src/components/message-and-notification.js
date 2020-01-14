import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 
import { StaticRouter } from 'react-router-dom';
import { getJwt } from "./auth/jwt-helper.js";

var sesh = "lmk310500@gmail.com";
var ip = require("../server.json").ip;
var token = "admin";
console.log(ip);

export default class Home extends Component {

    state = {
        email : "",
        target : "",
        msg : [],
		nmsg : "",
		notify : "",
		date : "",
		pretty : <br/>
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

	sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
		  currentDate = Date.now();
		} while (currentDate - date < milliseconds);
	}

	new_notify = () => {
		setInterval(() => {
			console.log("hi");
			var date = Date.now();
			this.setState({date:date});
		}, 1000);
	}

	get_notify = () => {
		setInterval(() => {
			axios.post(ip+"/users/get_spec", {
				email : sesh,
				token : token,
				target : "name",
			}).then(res => {
				this.setState({msg:res.data[0].name});
			})
		}, 1000);
		// $.ajax({
		// 	// type: "POST",
		// 	url: ip + '/users/get_spec',
		// 	// data: JSON.stringify(send),
		// 	// contentType: "application/json; charset=utf-8",
		// 	// dataType: "json",
		// 	success: function(data) {
		// 		console.log('Yes');
		// 		// document.getElementById('NotifDiv').innerHTML = data;
		// 	},
		// 	complete: function() {
		// 		setTimeout(worker, 5000);
		// 		// console.log('Complete');
		// 	}
		// });
	}

	// (function worker() {
		
	// })();

	componentDidMount() {
		this.new_notify();
		this.get_notify();
	}

	msgsend = () => {
		console.log(this.state.email);
		console.log(this.state.target);
		console.log(this.state.nmsg);
		var data = {};
		data.email = sesh;
		data.target = sesh;
		data.msg = this.state.nmsg;
		data.token = token;
		axios.post(ip+"/users/msg", data);
	}

	axle = () => {
	}

    render () {
        return (
        <div className="App" onload="console.log('The Script will load now.')">
            <input type="text" onChange={this.emailhandler} /><br/>
            <input type="text" onChange={this.targethandler} /><br/>
            <input type="text" onChange={this.msghandle} />
            <button onClick={this.msgsend}>Upload</button>
            <br/><text>{this.state.msg}</text>
            <br/><text>{this.state.date}</text>
        </div>
        )
    }
} 