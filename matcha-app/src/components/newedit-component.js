import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import decode from 'jwt-decode';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Inbox from './message-and-notification';
import cons from './chat-component';

export default class Edit extends Component {

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< eve protocol >>>>
//

	constructor(props){
		super(props);
		this.div_key = Date.now();
		this.jwt = localStorage.token;
		this.ip = require('../server.json').ip;
		this.nll = require("../images/chibi.jpg");
		this.load = require("../images/load2.gif");
		this.req = {};
		this.req.targ = [[0,100],[0,100],-2,-2,-2,1,-1];
		this.buffer = [];
		this.state = {
			new_sexual_pref: Number,
			new_gender: Number
		};
		this.busy = {};
		async function server_get(ip,jwt){
			let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
			if (promise.status === 200)
				return promise.data;
		}
		server_get(this.ip,this.jwt).then(res => {
			///////////////////////////////////////////////////////////
			//      <<<< begin binding after database online >>>>
			this.eve_mount = this.eve_mount.bind(this);
			this.userData_getter = this.userData_getter.bind(this);
			this.busy = 0;
			this.state = {
				"res" : '',
				"html" : '',
				"user" : res
			};
			if (this.props.location.user){
				this.setState({"user":this.props.location.user});
				this.eve_mount();
			} else
				this.userData_getter();
		}).catch(err => {console.log('eve redirect' + err)});
	}
	userData_getter(){
		async function get_data(email,jwt,ip,target){
			let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
			if (promise.status === 200)
				return promise.data;
		}
		///      <<<< target will be customised for each page for optimisation >>>>
		get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img likes liked viewed gender sexual_pref ping fame").then(userGet_res => {
				this.setState({"user":userGet_res[0]});
				this.eve_mount();
		}).catch(err => {console.log('eve redirect' + err)})
	}
	eve_mount() {
		this.Page_states("init");
	}
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page states >>>
//
Page_states(state){
	console.log('render');
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Render return >>>>
//
render () {
	return (
		<section className="section hero">
			<nav id={'navMenu'+this.div_key} className="navbar hero-head"></nav>
			<div id={'cont'+this.div_key}  className="container"></div>
		</section>
	)
}
}