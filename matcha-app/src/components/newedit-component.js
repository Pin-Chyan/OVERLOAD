import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import FilePickerManager from 'react-native-file-picker';
import ReactDOM, { createPortal, render } from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import decode from 'jwt-decode';
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
			this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeLast = this.onChangeLast.bind(this);
            this.reset_state = this.reset_state.bind(this);
            this.onChangeSurname = this.onChangeSurname.bind(this);
            this.onChangePwd = this.onChangePwd.bind(this);
            this.onChangePwdCon = this.onChangePwdCon.bind(this);
            this.onChangebio = this.onChangebio.bind(this);
            this.onChangeAge = this.onChangeAge.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onChangeSexual_pref = this.onChangeSexual_pref.bind(this);
            this.onChangeTag = this.onChangeTag.bind(this);
            this.setDefault = this.setDefault.bind(this);
            this.setDefaultGender = this.setDefaultGender.bind(this);
            this.onChangeGender = this.onChangeGender.bind(this);
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
	img_render(img_obj){
		if (document.getElementById('img1'+this.div_key) && img_obj.img1)
            ReactDOM.render(this.image_constructor(img_obj.img1 === 'null' ? nll : img_obj.img1,'img1'),document.getElementById('img1'+this.div_key));
        if (document.getElementById('img2'+this.div_key) && img_obj.img2)
            ReactDOM.render(this.image_constructor(img_obj.img2 === 'null' ? nll : img_obj.img2,'img2'),document.getElementById('img2'+this.div_key));
        if (document.getElementById('img3'+this.div_key) && img_obj.img3)
            ReactDOM.render(this.image_constructor(img_obj.img3 === 'null' ? nll : img_obj.img3,'img3'),document.getElementById('img3'+this.div_key));
        if (document.getElementById('img4'+this.div_key) && img_obj.img4)
            ReactDOM.render(this.image_constructor(img_obj.img4 === 'null' ? nll : img_obj.img4,'img4'),document.getElementById('img4'+this.div_key));
        if (document.getElementById('img5'+this.div_key) && img_obj.img5)
            ReactDOM.render(this.image_constructor(img_obj.img5 === 'null' ? nll : img_obj.img5,'img5'),document.getElementById('img5'+this.div_key));
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
		// var front = '<img alt="Asuna" className="m_image" src=';
		// var back  = ' />';
		// return(front + new_img + back);
		var element = (
		<div className="tile is-parent is-vertical"><article className="tile is-child notification" style={{backgroundColor: "rgb(240, 240, 240)"}}>
		<div className="file is-small"></div>
		<figure className="image is-4by3">
		<img id={img_num + this.div_key + ' the actual img'} alt="Asuna" class="m_image" src={new_img}/>
		</figure></article></div>
		)
		return (element);
	}
	image_edit_constructor(images){
		var element = (
			<div className="tile is-vertical">
				<div id={"img1" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div id={"img2" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div id={"img3" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div id={"img4" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div id={"img5" + this.div_key} onClick={e => this.listener(e)} className="tile"></div>
				<div className="tile"></div>
			</div>
		)
		return (element);
	}

	redirecthandler = e => {
        this.props.history.push({
            pathname:e.target.id,
            user: this.state.user
        });
    }
    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    keyHandle = e => {
        if (e.key == 'Enter'){
            var search_input = 'null';
            if (this.state.search){
                if (this.state.search.trim() != '')
                    search_input = this.state.search;
            }
            this.props.history.push({
                pathname: '/search',
                user: this.state.user,
                search_in: search_input 
            });
        }
    }
    
    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        }
        else {
            this.selectedCheckboxes.add(label);
        }
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

	reset_state() {
		var poes = this.state;
		poes.new_email = undefined;
		poes.new_name = undefined;
		poes.new_surname = undefined;
		poes.new_bio = undefined;
		poes.new_tag = undefined;
		this.setState({poes})
	}

	onChangeSexual_pref(e) {
      
        this.setState({
                new_sexual_pref: parseInt(e.target.value, 10),
                checked: !this.state.checked
            });

            console.log(this.state.new_sexual_pref)
    }

	onChangeName(e) {
        this.setState({
            new_name: e.target.value
        });
    }

    onChangeTag(e) {
        this.setState({
            new_tag: e.target.value
        });
    }

    onChangeLast(e) {
        this.setState({
            new_last: e.target.value
        });
    }

    onChangeSurname(e) {
        this.setState({
                surname: e.target.value
            });
    }

    onChangePwd(e) {
        this.setState({
                pwd: e.target.value
            });
    }    

    onChangeEmail(e) {
        this.setState({
                new_email: e.target.value
            });
    }
    
    onChangebio(e) {
        this.setState({
                bio: e.target.value
            });
    }

    onChangePwdCon(e) {
        this.setState({
                pwdCon: e.target.value
            });
    }

    onChangeGender(e) {
        this.setState({
                new_gender: parseInt(e.target.value, 10),
                checked2: !this.state.checked2
            });
            console.log('--- new gender --- ')
          console.log(this.state.new_gender)
    }
    
    onChangeAge(e) {
        this.setState({
                age: e.target.value
            });
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

	tag_handle(tag_arr, new_tag, mode){
        if (mode === "upload"){
            var tag  = tag_arr;
            new_tag = new_tag.trim();
            if (!tag.find(function (res){return res === new_tag;}) && new_tag !== ''){
                tag.push(new_tag);
                return (tag);
            }
            return (tag);
        } else if (mode === "delete") {
            var tag  = tag_arr;
            new_tag = new_tag.trim();
            if (tag.find(function (res){return res === new_tag;}) && new_tag !== ''){
                var pos = tag.findIndex(function (res){return res === new_tag;});
                tag.splice(pos,1);
                return (tag);
            }
            return (tag);
        }
	}

	onTagSubmit = e => {
        console.log(e.target.id);
        if (this.state.new_tag)
            var new_tag = this.state.new_tag;
        else
			var new_tag = '';
		console.log(this.state.user.tag);
		var res = this.tag_handle(this.state.user.tag,new_tag,e.target.id);
		var obj = this.state.user;
		obj.tag = res;
        console.log(res);
        axios.post(this.ip+"/users/edit_spec", {"email": this.state.user.email,"token":this.jwt, "tag":res}).then(res => {
			this.reset_state();
			this.setState({"user":obj});
			var mid_text = this.text_edit_constructor(this.state.user);
			ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
		})
	}
	
	onSubmit = async e => {
            e.preventDefault();

            var data = {
                "email" : this.state.user.email,
                "token" : this.jwt
            };
            var state_data = this.state.user;
            if (this.state.new_name){
                data.name = this.state.new_name.trim();
                state_data.name = data.name; 
            }
            if (this.state.new_last){
                data.last = this.state.new_last;
                state_data.last = data.last; 
            }
            if (this.state.bio){
                data.bio = this.state.bio;
                state_data.bio = data.bio; 
            }
            if (this.state.new_sexual_pref !== undefined) {
              data.sexual_pref = this.state.new_sexual_pref;
              state_data.sexual_pref = data.sexual_pref; 
            }
            if (this.state.new_gender !== undefined) {
              data.gender = this.state.new_gender;
              state_data.gender = data.gender; 
            }
            axios.post(this.ip+"/users/edit_spec", data);
            this.setState({
                "user" : state_data
			})
            if (this.state.new_email){
				var tester = this.state.new_email;
				axios.post(this.ip+"/users/check_dup", {"email":tester}).then(res => {
					if (res.data != "none"){
						alert("email already exists");
					}
					else {
						if (tester.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/)){
							axios.post(this.ip+"/users/email", {"email":this.state.new_email}).then(res => {
							if (res.data.present !== 1){
								data.target = "password";
								axios.post(this.ip+"/users/get_spec", data).then(docs => {
										var user = {};
										user.password = decode(this.jwt).password;
										user.email = this.state.new_email;
										var email_reset = {};
										email_reset.token = this.jwt;
										email_reset.email = this.state.user.email;
										email_reset.new_email = this.state.new_email;
										axios.post(this.ip+"/users/edit_spec", email_reset).then( res => {
											axios.post('http://localhost:5001/auth/getToken', user)
											.then(res => {
												if (res.data.resCode === 1) {
													alert("You are not who you say you are!");
													this.props.history.push("/logout");
												} else {
													localStorage.setItem('token', res.data.token);
													this.jwt = res.data.token;
													state_data.email = this.state.new_email;
													this.reset_state();
													this.setState({"user":state_data});
												}
												console.log(this.state);
												var mid_text = this.text_edit_constructor(this.state.user);
												ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
												///
											})
											console.log("done");
										});
									})
								} else {
									state_data.new_email = "email in use!";
									this.reset_state();
									this.setState({"user":state_data});
									var mid_text = this.text_edit_constructor(this.state.user);
									ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
									///
								}
							})
						} else {
							state_data.new_email = "Invalid email";
							this.reset_state();
							this.setState({"user":state_data});
							var mid_text = this.text_edit_constructor(this.state.user);
							ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
							///
						}
					}
				})
		}
		this.reset_state();
		this.setState({"user":state_data});
		var mid_text = this.text_edit_constructor(this.state.user);
		ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
    }

	text_edit_constructor(user){
		this.reset_state();
		console.log(this.state.user.tag);
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