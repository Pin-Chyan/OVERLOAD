import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactDOM, { createPortal, render } from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// import styled from 'styled-components';
// import Slider from './Slider.js';
var load2 = require("../images/load2.gif");
var load3 = require("../images/scifi.gif");
var nll = require("../images/chibi.jpg");
var sec = require("../images/check.jpg");

//[1,-1,-2,-2,10,-1,-1] search conditions

// const Styles = styled.div`

// `;

export default class User extends Component {


///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< eve protocol >>>>
//

    constructor(props){
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
		this.req = {};
		this.nll = require("../images/chibi.jpg");
		this.input = document.createElement('input');
		this.input.type = 'file';
        this.req.targ = [[0,100],[0,100],-2,-2,-2,1,-1];
        this.state = {};
        console.log(this.ip);
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            console.log('eve online');
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
        console.log('getting data......');
        async function get_data(email,jwt,ip,target){
            console.log(email);
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        console.log('hi');
        get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img gender sexual_pref liked viewed").then(userGet_res => {
                this.setState({"user":userGet_res[0]});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount() {
        console.log('render');
        this.internal_color = [15,14,14];
        this.state.res = '';
        this.state.links = 'rgb(50, 170, 225)';
        this.Page_states("init");
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page states >>>
//
	Page_states(state){
		console.log('render');
        this.selectedCheckboxes = new Set();
        var nav_bar = this.nav_constructor();
        var cont = this.container_constructor();
        var mid_img = this.image_edit_constructor();
        var mid_text = this.text_edit_constructor();
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key));
        if (document.getElementById('cont'+this.div_key))
            ReactDOM.render(cont, document.getElementById('cont'+this.div_key));
        if (document.getElementById('mid_img'+this.div_key))
            ReactDOM.render(mid_img, document.getElementById('mid_img'+this.div_key));
        if (document.getElementById('mid_text'+this.div_key))
            ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
        if (document.getElementById('bruh'+this.div_key))
            ReactDOM.render(ReactHtmlParser(this.image_constructor(this.state.user.img.img1 === 'null' ? nll : this.state.user.img.img1)),document.getElementById('bruh'+this.div_key));
        // if (document.getElementById('img2'+this.div_key))
        //     ReactDOM.render(ReactHtmlParser(this.image_constructor(this.state.user.img.img2 === 'null' ? nll : this.state.user.img.img2)),document.getElementById('img2'+this.div_key));
        // if (document.getElementById('img3'+this.div_key))
        //     ReactDOM.render(ReactHtmlParser(this.image_constructor(this.state.user.img.img3 === 'null' ? nll : this.state.user.img.img3)),document.getElementById('img3'+this.div_key));
        // if (document.getElementById('img4'+this.div_key))
        //     ReactDOM.render(ReactHtmlParser(this.image_constructor(this.state.user.img.img4 === 'null' ? nll : this.state.user.img.img4)),document.getElementById('img4'+this.div_key));
        // if (document.getElementById('img5'+this.div_key))
        //     ReactDOM.render(ReactHtmlParser(this.image_constructor(this.state.user.img.img5 === 'null' ? nll : this.state.user.img.img5)),document.getElementById('img5'+this.div_key));
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page logic >>>>
//

	listener = e => {
		console.log("yes");
	}
	listener2 = e => {
		console.log("yes2");
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Redner return >>>>
//
	render () {
		return (
			<section className="section hero">
				<nav id={'navMenu'+this.div_key} className="navbar hero-head"></nav>
				<div id={'cont'+this.div_key}  className="container"></div>
			</section>
		)
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//    
//                      <<<< Contsructor Fucntions >>>>
//

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
						<a className="navbar-item " style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</a>
						<a className="navbar-item " style={{color:this.state.curr_page}}  id='/user' onClick={this.redirecthandler}>Profile</a>
						<a className="navbar-item " style={{color:this.state.other_page}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
						<a className="navbar-item " style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
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

	image_constructor(new_img){
		// var front = '<img alt="Asuna" className="m_image" src=';
		// var back  = ' />';
		// return(front + new_img + back);
		var element = (
		<div className="tile is-parent is-vertical"><article className="tile is-child notification light-yellow">
		<div className="file is-small"><label onChange={this.globalhander} className="file-label">
		<input id="1" className="file-input" type="file" name="resume" />
		<span className="file-cta"><span className="file-icon"><i className="fa fa-upload"></i></span>
		<span className="file-label">Choose a file…</span></span></label>
		<div onClick={e => this.globalimg(e)}><button id="1" className="file-name" value="upload">upload</button>
		<button id="1" className="file-name" value="delete">delete</button></div></div>
		<figure className="image is-4by3"><div id={"img1"+this.div_key}></div></figure></article></div>
		)
		var b1 = '<div class="tile is-parent is-vertical"><article class="tile is-child notification light-yellow">'; 
		var b2 = '<div class="file is-small"><label onChange={this.globalhander} class="file-label">';
		var b3 = '<input id="1" className="file-input" type="file" name="resume" />';
		var b4 = '<span className="file-cta"><span className="file-icon"><i className="fa fa-upload"></i></span>';
		var b5 = '<span className="file-label">Choose a file…</span></span></label>';
		var b6 = '<div><button id="1" className="file-name" value="upload">upload</button>';
		var b7 = '<button id="1" className="file-name" value="delete">delete</button></div></div>';
		var b8 = '<figure className="image is-4by3"><img alt="Asuna" className="m_image" src=' + this.nll + '/></div></figure></article></div>';
		var res = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8;
		return (res + res);
	}
	image_edit_constructor(images){
		var element = (
			<div className="tile is-vertical">
				<div id={"bruh" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div className="tile"></div>
			</div>
		)
		return (element);
	}

	setDefault (value) {
	  if (value === this.state.user.sexual_pref) {
		return true
	  }
	  return false
	}

	setDefaultGender (value) {
	  if (value === this.state.user.gender) {
		return true
	  }
	  return false
	}

	text_edit_constructor(){
		return (
			<div>
				<div className="field">
					<label className="label">Current Email: {this.state.user.email}</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="email" placeholder="New E-mail" value={this.state.new_email} onChange={this.onChangeEmail} required />
						<span className="icon is-small is-left">
							<i className="fa fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fa fa-exclamation-triangle"></i>
						</span>
					</div>
					{/* <p className="help is-danger">This email is required</p> */}
				</div>
				<div className="field">
					<label className="label">Current Name: {this.state.user.name}</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="email" placeholder="New Name" value={this.state.new_name} onChange={this.onChangeName} required />
					</div>
				</div>
				<div className="field">
					<label className="label">Current Surname: {this.state.user.last}</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="email" placeholder="New Name" value={this.state.new_last} onChange={this.onChangeLast} required />
					</div>
				</div>
				<div className="field">
					<label className="label">Update Bio</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="text" placeholder="New bio" value={this.state.bio} onChange={this.onChangebio} required />
					</div>
				</div>

				<div className="control">
					<label className="label">Sexual Preference</label>
					<label className="radio">
						<input type="radio" name="sexuality" value="-1" defaultChecked={this.setDefault(-1)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
						Male
					</label>
					<label className="radio">
						<input type="radio" name="sexuality" value="1" defaultChecked={this.setDefault(1)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
						Female
					</label>
					<label className="radio">
						<input type="radio" name="sexuality" value="0" defaultChecked={this.setDefault(0)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
						Bisexual
					</label>
				</div>

				<div className="control">
					<label className="label">Gender</label>
					<label className="radio">
						<input type="radio" name="gender" value="-1" defaultChecked={this.setDefaultGender(-1)} onChange={this.onChangeGender} checked={this.state.checked2}/>
						Male
					</label>
					<label className="radio">
						<input type="radio" name="gender" value="1" defaultChecked={this.setDefaultGender(1)} onChange={this.onChangeGender} checked={this.state.checked2}/>
						Female
					</label>
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-warning is-rounded" onClick={this.onSubmit}>Change</button>
					</div>
					<div className="control">
						<button className="button is-warning is-rounded is-light">Cancel</button>
					</div>
				</div>
				<div className="field">
					<label className="label">Current Tags: {this.state.user.tag}</label>
					<div className="control">
						<div className="field">
							<label className="label">Tag Name</label>
							<div className="control has-icons-left has-icons-right">
								<input className="input" type="text" placeholder="New bio" value={this.state.user.new_tag} onChange={this.onChangeTag} required />
							</div>
						</div>
						<div className="field is-grouped">
							<div className="control" onClick={this.onTagSubmit}>
								<button id="upload" className="button is-warning is-rounded">Change</button>
								<button id="delete" className="button is-warning is-rounded">delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}