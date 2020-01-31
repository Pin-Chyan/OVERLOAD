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
		if (state === 'init'){
			if (document.getElementById('navMenu'+this.div_key))
				ReactDOM.render(this.nav_constructor(), document.getElementById('navMenu'+this.div_key));
		}
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
	nav_constructor(){
		return (
			<div className="container">
				<div className="navbar-brand">
					<figure className="navbar-item image">
						<img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
					</figure>
					<span className="navbar-burger burger" data-target="navMenu">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
				<div id="navMenu" className="navbar-menu">
					<div className="navbar-end">
						<div className="control is-small has-icons-right search-margin">
						<input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
							<span className="icon is-small is-right">
								<i className="fa fa-search"></i>
							</span>
						</div>
            			<button className="navbar-item " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox /></button>
            			<button className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></button>
						<button className="navbar-item " style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</button>
						<button className="navbar-item " style={{color:this.state.curr_page}}  id='/user' onClick={this.redirecthandler}>Profile</button>
						<button className="navbar-item " style={{color:this.state.other_page}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</button>
						<button className="navbar-item " style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</button>
					</div>
				</div>
			</div>
		)
	}
	container_constructor(){
		return (
			<div className="columns is-centered shadow">
				<div className="column bg_white">
					<div className="column center">
						<div id={'mid_img' + this.div_key} className="tile is-ancestor"></div>
						<div id={'mid_text' + this.div_key}></div>
					</div>
				</div>
			</div>
		)
	}
	image_constructor(new_img,img_num){
		var element = (
			<div className="tile is-parent is-vertical">
			<article className="tile is-child notification light-yellow">
				<figure className="image s-image">
				<img id={img_num + this.div_key} alt="Asuna" className="m_image" src={new_img}/>
				</figure>
			</article>
		</div>
		)
		return (element);
	}
	image_edit_constructor(images){
		var element = (
			<div className="tile is-vertical">
				<div id={"tile1" + this.div_key} onClick={e => this.image_selector(e)} className="tile"></div>
				<div id={"tile2" + this.div_key} onClick={e => this.image_selector(e)} className="tile"></div>
				<div id={"tile3" + this.div_key} onClick={e => this.image_selector(e)} className="tile"></div>
				<div id={"tile4" + this.div_key} onClick={e => this.image_selector(e)} className="tile"></div>
				<div id={"tile5" + this.div_key} onClick={e => this.image_selector(e)} className="tile"></div>
			</div>
		)
		return (element);
	}

}