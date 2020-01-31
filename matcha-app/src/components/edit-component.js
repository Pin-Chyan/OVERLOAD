import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import decode from 'jwt-decode';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Inbox from './message-and-notification';


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
				var obj = userGet_res[0];
				obj.setpref = this.setpref_start(userGet_res[0].sexual_pref);
				obj.setgender = this.setgender_start(userGet_res[0].gender);
				this.setState({"user":obj});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount() {
        this.internal_color = [15,14,14];
        this.setState({"res":'',"links":'rgb(50, 170, 225)'});
        this.Page_states("init");
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page states >>>
//
	Page_states(state){
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

	image_selector = e => {
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
	}

	setpref_start(data){
		if (data === -1)
			return ("Male");
		else if (data === 1)
			return ("Female");
		else if (data === 0)
			return ("Bisexual");
	}
	
	setgender_start(data){
		if (data === -1)
			return ("Male");
		else if (data === 1)
			return ("Female");
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
					this.img_render(imgRender);
					var reader = new FileReader();
					reader.readAsDataURL(new_img[1].files[0]);
					reader.onload = async function() {
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
		this.sleep(5000).then(() => {
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
							{/* <div id={'mid_text' + this.div_key}></div> */}
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

	redirecthandler = e => {
        this.props.history.push({
            pathname:e.target.id
        });
    }
    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    keyHandle = e => {
        if (e.key === 'Enter'){
            var search_input = 'null';
            if (this.state.search){
                if (this.state.search.trim() !== '')
                    search_input = this.state.search;
            }
            this.props.history.push({
                pathname: '/search',
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
		poes.new_last = undefined;
		poes.bio = undefined;
		poes.new_tag = undefined;
		this.setState({poes})
	}

	onChangeSexual_pref(e) {
        this.setState({
                new_sexual_pref: parseInt(e.target.value, 10),
                checked: !this.state.checked
            });
	}
	
    onChangeGender(e) {
        this.setState({
                new_gender: parseInt(e.target.value, 10),
                checked2: !this.state.checked2
            });
    }
	
	setpref(data) {
		var user = this.state.user;
		if (data === -1){
			user.setpref = "Male";
		}
		else if (data === 1)
			user.setpref = "Female";
		else if (data === 0)
			user.setpref = "Bisexual";
		this.setState({user:user});
	}

	setgender(data) {
		var user = this.state.user;
		if (data === -1){
			user.setgender = "Male";
		}
		else if (data === 1)
			user.setgender = "Female";
		this.setState({user:user});
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
    
    onChangeAge(e) {
        this.setState({
                age: e.target.value
            });
    }

	tag_handle(tag_arr, new_tag, mode){
		var tag
        if (mode === "upload"){
        	tag  = tag_arr;
            new_tag = new_tag.trim();
            if (!tag.find(function (res){return res === new_tag;}) && new_tag !== ''){
                tag.push(new_tag);
                return (tag);
            }
            return (tag);
        } else if (mode === "delete") {
            tag  = tag_arr;
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
		var new_tag
        if (this.state.new_tag)
            new_tag = this.state.new_tag;
        else
			new_tag = '';
		var res = this.tag_handle(this.state.user.tag,new_tag,e.target.id);
		var obj = this.state.user;
		obj.tag = res;
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
			  this.setpref(state_data.sexual_pref);
            }
            if (this.state.new_gender !== undefined) {
              data.gender = this.state.new_gender;
			  state_data.gender = data.gender;
			  this.setgender(state_data.gender);
            }
            axios.post(this.ip+"/users/edit_spec", data);
            this.setState({
                "user" : state_data
			})
            if (this.state.new_email){
				var tester = this.state.new_email;
				axios.post(this.ip+"/users/check_dup", {"email":tester}).then(res => {
					if (res.data !== "none"){
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
													console.log("rescode is 1 what?")
													alert("You are not who you say you are!");
													this.props.history.push("/logout");
												} else {
													console.log("changing email");
													localStorage.setItem('token', res.data.token);
													this.jwt = res.data.token;
													state_data.email = this.state.new_email;
													// this.reset_state();
													this.setState({"user":state_data});
													var mid_text = this.text_edit_constructor(this.state.user);
													ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
												}
												///
											})
										});
									})
								} else {
									state_data.new_email = "email in use!";
									// this.reset_state();
									this.setState({"user":state_data});
									var mid_text = this.text_edit_constructor(this.state.user);
									ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
									///
								}
							})
						} else {
							state_data.new_email = "Invalid email";
							// this.reset_state();
							this.setState({"user":state_data});
							var mid_text = this.text_edit_constructor(this.state.user);
							ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
							///
						}
					}
				})
		}
		// this.reset_state();
		this.setState({"user":state_data});
		var mid_text = this.text_edit_constructor(this.state.user);
		ReactDOM.render(mid_text, document.getElementById('mid_text'+this.div_key));
    }

    listTags (tags) {
      if (Array.isArray(tags) && tags.length) {
        return tags.map(tag => {
          return <span class="tag is-warning">{tag}  </span>
        })
      } else {
        return <span>No tags ...</span>
      }
    }

	text_edit_constructor(user){
		this.reset_state();
		console.log(this.state.new_email);
		console.log(user.email);
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
		<label className="label">Currently: {this.state.user.setpref}</label>
				<select id="sexual_pref" onChange={this.onChangeSexual_pref}>
  					<option value="default" >...</option>
  					<option value="-1" >Male</option>
  					<option value="1" >Female</option>
  					<option value="0" >Bisexual</option>
				</select>
					<label className="label">Gender</label>
					<label className="label">Current Gender: {this.state.user.setgender}</label>
				<select id="gender" onChange={this.onChangeGender}>
  					<option value="default" >...</option>
  					<option value="-1" >Male</option>
  					<option value="1" >Female</option>
				</select>
				</div>
				<br></br>
				<div className="field is-grouped">
					<div className="control">
						<button className="button is-warning is-rounded" onClick={(e) => this.onSubmit(e)}>Change</button>
					</div>
					<div className="control">
						<button className="button is-warning is-rounded is-light">Cancel</button>
					</div>
				</div>
				<div className="field">
					<label className="label">Current Tags: {this.listTags(user.tag)}</label>
					<div className="control">
						<div className="field">
							<label className="label">Tag Name</label>
							<div className="control has-icons-left has-icons-right">
								<input className="input" type="text" placeholder="New bio" value={this.state.user.new_tag} onChange={this.onChangeTag} required />
							</div>
						</div>
						<div className="field is-grouped">
							<div className="control" onClick={(e) => this.onTagSubmit(e)}>
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