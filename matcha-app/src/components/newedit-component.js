import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import FilePickerManager from 'react-native-file-picker';
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
		this.nll = require("../images/chibi.jpg");
		this.load = require("../images/load2.gif");
		this.req = {};
        this.req.targ = [[0,100],[0,100],-2,-2,-2,1,-1];
		this.buffer = [];
		this.state = {};
		this.busy = {};
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
        var mid_text = this.text_edit_constructor(this.state.user);
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key));
        if (document.getElementById('cont'+this.div_key))
            ReactDOM.render(cont, document.getElementById('cont'+this.div_key));
        if (document.getElementById('mid_img'+this.div_key))
            ReactDOM.render(mid_img, document.getElementById('mid_img'+this.div_key));
        if (document.getElementById('mid_text'+this.div_key))
			ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
		this.img_render(this.state.user.img);
		this.image_sender();
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page logic >>>>
//

	listener = e => {
		console.log("yes");
		console.log(e.target.id);
	}
	listener2 = e => {
		console.log("yes2");
	}
	image_selector = e => {
		console.log(e.target.id);
		var num = e.target.id[3];
		var id = 'img' + num;
		if (!this.buffer.find(function (input){return input[0] === id})){
			var img_arr = [id];
			img_arr.push(document.createElement('input'));
			img_arr[1].type = 'file';
			img_arr[1].click();
			this.buffer.push(img_arr);
		} else {
			console.log('already in buffer');
		}
		console.log(this.buffer);
	}
	image_sender(){
		if (this.buffer.length){
			var new_img = this.buffer[0];
			if (new_img[1].files.length === 1){
				var name = new_img[1].files[0].name.split('.');
				var size = new_img[1].files[0].size;
				if (!(name[name.length - 1] === 'jpg' || name[name.length - 1] === 'png' || name[name.length - 1] === 'jpeg' || name[name.length - 1] === 'gif')){
					alert('invalid file');
					this.buffer.splice(0,1);
				} else if (size > 20000000){
					alert('image too large');
					this.buffer.splice(0,1);
				} else {
					var imgRender = {};
					imgRender[new_img[0]] = this.load;
					console.log(imgRender);
					this.img_render(imgRender);
					var reader = new FileReader();
					reader.readAsDataURL(new_img[1].files[0]);
					reader.onload = async function() {
						console.log('uploading...........');
						var data = {};
						data.email = this.state.user.email;
						data.token = this.jwt;
						imgRender[new_img[0]] = reader.result;
						data.img = imgRender;
						this.buffer.splice(0,1);
						let promise = await axios.post(this.ip+"/users/edit_spec",data)
						if (promise.status === 200){
							if (promise.data === 'exceeded'){
								alert("exceeded space allocated for individual user, upload smaller images");
								this.img_render(this.state.user.img);
							} else {
								console.log('uploaded ' + new_img[0]);
								var old = this.state.user.img;
								old[new_img[0]] = imgRender[new_img[0]];
								this.setState({"img":old});
								this.img_render(imgRender);
							}
							this.buffer.splice(0,1);
						}
					}.bind(this);
				}
			}
		}
		this.sleep(1000).then(() => {
			this.image_sender();
		})
	}
	img_render(img_obj){
		if (document.getElementById('tile1'+this.div_key) && img_obj.img1)
            ReactDOM.render(this.image_constructor(img_obj.img1 === 'null' ? this.nll : img_obj.img1,'img1'),document.getElementById('tile1'+this.div_key));
        if (document.getElementById('tile2'+this.div_key) && img_obj.img2)
            ReactDOM.render(this.image_constructor(img_obj.img2 === 'null' ? this.nll : img_obj.img2,'img2'),document.getElementById('tile2'+this.div_key));
        if (document.getElementById('tile3'+this.div_key) && img_obj.img3)
            ReactDOM.render(this.image_constructor(img_obj.img3 === 'null' ? this.nll : img_obj.img3,'img3'),document.getElementById('tile3'+this.div_key));
        if (document.getElementById('tile4'+this.div_key) && img_obj.img4)
            ReactDOM.render(this.image_constructor(img_obj.img4 === 'null' ? this.nll : img_obj.img4,'img4'),document.getElementById('tile4'+this.div_key));
        if (document.getElementById('tile5'+this.div_key) && img_obj.img5)
            ReactDOM.render(this.image_constructor(img_obj.img5 === 'null' ? this.nll : img_obj.img5,'img5'),document.getElementById('tile5'+this.div_key));
	}
	sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
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

	image_constructor(new_img,img_num){
		var element = (
			<div className="tile is-parent is-vertical">
			<article className="tile is-child notification light-yellow">
				{/* <div className="file is-small">
					<a className="button is-light subtitle is-small" onClick={this.rm1} >Remove</a>
					<label onChange={this.globalhander} className="file-label">
						<input id="1" className="file-input" type="file" name="resume" />
						<span className="file-cta">
							<span className="file-icon">
								<i className="fa fa-upload"></i>
							</span>
							<span className="file-label">
								Choose a file…
					</span>
						</span>
					</label>
					<button className="file-name" onClick={this.fileUploadHandlerimg1}>Upload</button>
					<div onClick={e => this.globalimg(e)}>
						<button id="1" className="file-name" value="upload">upload</button>
						<button id="1" className="file-name" value="delete">delete</button>
					</div>
				</div> */}
				<figure className="image s-image">
				<img id={img_num + this.div_key} alt="Asuna" class="m_image" src={new_img}/>
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

	text_edit_constructor(user){
		return (
			<div>
				<div className="field">
					<label className="label">Current Email: {user.email}</label>
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
					<label className="label">Current Name: {user.name}</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="email" placeholder="New Name" value={this.state.new_name} onChange={this.onChangeName} required />
					</div>
				</div>
				<div className="field">
					<label className="label">Current Surname: {user.last}</label>
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
					<label className="label">Current Tags: {user.tag}</label>
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