import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Inbox from './message-and-notification';

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
		this.lol = 'is-active';
		this.nll = require("../images/chibi.jpg");
		this.load = require("../images/load.gif");
		this.buffer = [];
		this.imgUploadBusy = [0,0,0,0,0,0];
		this.state = {
			new_sexual_pref: Number,
			new_gender: Number,
			user : {},
			"lastBuff": '',
			"bioBuff": '',
			"nameBuff": '',
      "emailBuff": '',
      "sexualBuff": '',
      "genderBuff": '',
			"burger": "navbar-burger burger ",
			"bar": "navbar-menu ",
			"lol": ""
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
      this.onTagAdd = this.onTagAdd.bind(this)
      this.onTagDel = this.onTagDel.bind(this)
			this.userData_getter = this.userData_getter.bind(this);
     		this.imageUploader = this.imageUploader.bind(this);
     		this.onChangeName = this.onChangeName.bind(this)
     	this.onChangeEmail = this.onChangeEmail.bind(this)
     	this.onChangeLast = this.onChangeLast.bind(this)
     	this.onChangeBio = this.onChangeBio.bind(this)
      this.onBasicSubmit = this.onBasicSubmit.bind(this)
      this.onChangeGender = this.onChangeGender.bind(this)
      this.onChangeTag = this.onChangeTag.bind(this)
      this.onChangeSexual_pref = this.onChangeSexual_pref.bind(this)
      this.onSubmitSexAndGender = this.onSubmitSexAndGender.bind(this)
			this.onBasicSubmit = this.onBasicSubmit.bind(this)
			this.why = this.why.bind(this);
			this.busy = 0;
			this.state = {
				"res" : '',
				"html" : '',
        "user" : res,
        "lastBuff": '',
        "bioBuff": '',
        "nameBuff": '',
        "emailBuff": '',
        "tagBuff": '',
			};
			if (this.props.location.user){
				this.setState({"user":this.props.location.user});
				this.eve_mount();
			} else
				this.userData_getter();
		}).catch(err => {console.log(err);})//this.props.history.push('/logout')});
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
        this.setState({ "sexualBuff": this.state.user.sexual_pref.toString() })
        this.setState({ "genderBuff": this.state.user.gender.toString() })
				this.eve_mount();
		}).catch(err => {console.log(err);})//this.props.history.push('/logout')})
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
			// if (document.getElementById('navMenu'+this.div_key)){
			// 	ReactDOM.render(this.nav_constructor(), document.getElementById('navMenu'+this.div_key));
			// }
     		if (document.getElementById('mid_img'+this.div_key))
				ReactDOM.render(this.image_edit_constructor(), document.getElementById('mid_img'+this.div_key));
			this.imageRenderer(this.state.user.img,'init');
			// this.notification_updater();
		}
	}
	why(){
		if (this.state.lol === 'is-active')
			this.setState({"lol":""});
		else this.setState({"lol":"is-active"})
	}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//						<<<< Page logic >>>>
//

	redirecthandler = e => {
		this.props.history.push({
			pathname:e.target.id,
			user: this.state.user
		});
	}
	imageHandler(e){
		if (this.imgUploadBusy[parseInt(e.target.id)] === 0){
			var target = 'in' + e.target.id[0];
			if (document.getElementById(target)){
				var input = document.getElementById(target);
				input.click();
			}
		}
	}
	deleteHandler(e){
		console.log("img"+e.target.id[3]);
		this.imgUploadBusy[parseInt(e.target.id[3])] = 1;
		async function deleteImg(email, jwt, ip, img){
			let promise = await axios.post(ip+'/users/edit_spec',{"email":email,"token":jwt,"img":img})
			if (promise.status === 200)
				return(promise.data);
		}
		var img = {};
		var id = e.target.id;
		img["img"+e.target.id[3]] = 'null';
		var target = {};
		target["img"+e.target.id[3]] = this.load;
		this.imageRenderer(target);
		target["img"+e.target.id[3]] = this.nll;
		deleteImg(this.state.user.email, this.jwt, this.ip, img).then(res => {
			this.imgUploadBusy[parseInt(id[3])] = 0;
			this.imageRenderer(target);
		})
		console.log(this.imgUploadBusy[parseInt(e.target.id[3])])
	}
	fileHandler(e){
		if (e.target.files.length){
			var fileSplit = e.target.files[0].name.split('.');
			var fileExt = fileSplit[fileSplit.length - 1];
			if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg'){
				var target = {};
				target["img"+e.target.id[2]] = this.load;
				this.imageRenderer(target);
				this.imgUploadBusy[parseInt(e.target.id[2])] = 1;
				this.imageUploader(e.target.id[2],e.target.files[0]);
			}
			else alert('Please select an image');
		}
	}
	imageUploader(id,file){
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async function() {
			var data = {};
			data.email = this.state.user.email;
			data.token = this.jwt;
			data.img = {};
			data.img['img'+id] = reader.result;
			let promise = await axios.post(this.ip+"/users/edit_spec", data);
			if (promise.status === 200){
				var target;
				if (promise.data === 'exceeded'){
					alert("exceeded space allocated for individual user, upload smaller images");
					target = {};
					target["img"+id] = this.state.img["img"+id];
					this.imageRenderer(target);
					this.imgUploadBusy[parseInt(id)] = 0;
				} else {
					var old = this.state.user.img;
					old['img'+id] = reader.result;
					this.setState({"img":old});
					target = {};
					target["img"+id] = reader.result;
					this.imageRenderer(target);
					this.imgUploadBusy[parseInt(id)] = 0;
				}	
			}
		}.bind(this);
	}
	imageRenderer(img,mode){
		var i = 0;
		while (i++ < 5){
			if (img['img'+i] || mode === 'init')
				if (document.getElementById('img'+i+this.div_key))
					ReactDOM.render((<img id={i} alt={this.load} className="m_image" src={img['img'+i] === 'null' ? this.nll : img['img'+i]}/>), document.getElementById('img'+i+this.div_key));
		}
	}
	sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
// ////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< On change functions 
//


onChangeName (e) {
  this.setState({
    nameBuff: e.target.value
  })
}

onChangeLast (e) {
  this.setState({
    lastBuff: e.target.value
  })
}

onChangeEmail (e) {
  this.setState({
    emailBuff: e.target.value
  })
}

onChangeBio (e) {
  this.setState({
    bioBuff: e.target.value
  })
}

onChangeSexual_pref (e) {
  this.setState({
    sexualBuff: e.target.value
  })
}

onChangeGender (e) {
  this.setState({
    genderBuff: e.target.value
  })
}

onChangeTag (e) {
  this.setState({
    tagBuff: e.target.value
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//                       <<<< Submit functions

onBasicSubmit (e) {
  e.preventDefault()
  let msg = ''

  let data = {
    email : this.state.user.email,
    token : this.jwt
  }
  
  if (this.state.nameBuff) {
    data.name = this.state.nameBuff.trim()
    msg += ' name'
  }
  if (this.state.lastBuff) {
    data.last = this.state.lastBuff
    msg += ' surname'
  }
  if (this.state.bioBuff) {
    data.bio = this.state.bioBuff
    msg += ' bio'
  }
  axios.post(this.ip+"/users/edit_spec", data).then(res => {
    alert('You have updated your'+msg)
    let newUser = this.state.user
    if (data.name) {
      newUser.name = data.name
    }
    if (data.last) {
      newUser.last = data.last
    }
    if (data.bio) {
      newUser.bio = data.bio
    }
    this.setState({
      user: newUser,
      lastBuff: '',
      nameBuff: '',
	    bioBuff: ''})
	})
}

onSubmitSexAndGender (e) {
  e.preventDefault()

  let data = {
    email : this.state.user.email,
    token : this.jwt
  }

  if (this.state.sexualBuff !== '') {
    data.gender = parseInt(this.state.genderBuff)
  }
  if (this.state.genderBuff !== '') {
    data.sexual_pref = parseInt(this.state.sexualBuff)
  }

  axios.post(this.ip+"/users/edit_spec", data).then(res => {
    let newUser = this.state.user
    newUser.sexual_pref = data.sexual_pref
    newUser.gender = data.gender
    this.setState({
      user: newUser
    })
	})
}

onTagAdd (e) {
  e.preventDefault()

  console.log(this.tagBuff)
}

onTagDel (e) {
  e.preventDefault()
}

listTags (tags) {
  if (Array.isArray(tags) && tags.length) {
    return tags.map(tag => {
      return <span className="tag is-warning" key={tag}>{tag}<button className="delete is-small"></button></span>
    })
  } else {
    return <span>No tags ...</span>
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Render return >>>>
//

	render () {
		return (
			<section className="section hero">
				<nav id={'navMenu'+this.div_key} className="navbar hero-head">			<div className="container">
				<div className="navbar-brand">
					<figure className="navbar-item image">
						<img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
					</figure>
					<span className={this.state.burger + this.state.lol} data-target="navMenu" onClick={this.why}>
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
				<div id={"navMenu"+this.div_key} className={this.state.bar + this.state.lol}>
					<div className="navbar-end">
						<div className="control is-small has-icons-right search-margin">
						<input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
							<span className="icon is-small is-right">
								<i className="fa fa-search"></i>
							</span>
						</div>
            			<button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox /></button>
            			<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/search' onClick={this.redirecthandler}>Search</button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</button>
						<button className="navbar-item nav-color" style={{color:this.state.curr_page}}  id='/user' onClick={this.redirecthandler}>Profile</button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</button>
					</div>
				</div>
			</div></nav>
				<div id={'cont'+this.div_key}  className="container">
				<div className="columns is-centered shadow">
				<div className="column bg_white">
					<div className="column center">
						<div id={'mid_img' + this.div_key} className="tile is-ancestor"></div>
						<div id={'mid_text' + this.div_key}>      <div className="container">
          			<div className="field">
          			  <label className="label">Name: {this.state.user.name}</label>
          			  <div className="control has-icons-left has-icons-right">
          			    <input className="input" type="text" placeholder="Change name" value={this.state.nameBuff} onChange={e => this.onChangeName(e)} />
          			    <span className="icon is-small is-left">
          			    </span>
          			  </div>
          			</div>
          			  <div className="field">
          			  <label className="label">Surname: {this.state.user.last}</label>
          			  <div className="control has-icons-left has-icons-right">
          			    <input className="input" type="text" placeholder="New surname" value={this.state.lastBuff} onChange={this.onChangeLast} />
          			    <span className="icon is-small is-left">
          			    </span>
          			  </div>
          			</div>
          			<div className="field">
          			  <label className="label">Bio: {this.state.user.bio}</label>
          			  <div className="control has-icons-left has-icons-right">
          			    <input className="input" type="text" placeholder="New bio" value={this.state.bioBuff} onChange={this.onChangeBio} />
          			    <span className="icon is-small is-left">
          			    </span>
          			  </div>
          			</div>
          			<button className="button is-rounded is-warning" onClick={this.onBasicSubmit}>Save</button>
          			<br></br>
          			<br></br>
          			  <div className="field">
          			  <label className="label">Email: {this.state.user.email}</label>
          			  <div className="control has-icons-left has-icons-right">
          			    <input className="input" type="email" placeholder="New E-mail" value={this.state.emailBuff} onChange={this.onChangeEmail} />
          			    <span className="icon is-small is-left">
          			    </span>
          			  </div>
          			</div>
          			<button className="button is-rounded is-warning" onClick={this.onEmailSubmit}>Save</button>
      			</div>
              <label className="label">Sexual Preferences:</label>
              <form>
                <select value={this.state.sexualBuff} onChange={this.onChangeSexual_pref}>
                  <option value="-1">Male</option>
                  <option value="1">Female</option>
                  <option value="0">Bisexual</option>
                </select>
                <label className="label">Gender:</label>
                <select value={this.state.genderBuff} onChange={this.onChangeGender}>
                  <option value="-1">Male</option>
                  <option value="1">Female</option>
                </select>
                <br></br>
                <br></br>
                <button className="button is-rounded is-warning" onClick={this.onSubmitSexAndGender}>Save</button>
              </form>
              <br></br>
              <label className="label">Current tags:</label>
              {this.listTags(this.state.user.tag)}
              <br></br>
              <br></br>
              <div className="field">
                <label className="label" onClick={this.onTagAdd}>Add Tags:</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="New tag" value={this.state.tagBuff} onChange={this.onChangeTag} />
                <br></br>
                <br></br>
                <button className="button is-rounded is-warning" onClick={this.onTagAdd}>Add</button>
                </div>
                </div>
              </div>
            </div>
					</div>
				</div>
			</div>
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
					<span className={"navbar-burger burger "+this.lol} data-target="navMenu">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
				<div id={"navMenu"+this.div_key} className={"navbar-menu "+this.lol}>
					<div className="navbar-end">
						<div className="control is-small has-icons-right search-margin">
						<input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
							<span className="icon is-small is-right">
								<i className="fa fa-search"></i>
							</span>
						</div>
            			<button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox /></button>
            			<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/search' onClick={this.redirecthandler}>Search</button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</button>
						<button className="navbar-item nav-color" style={{color:this.state.curr_page}}  id='/user' onClick={this.redirecthandler}>Profile</button>
						<button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</button>
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
						<img id={img_num + this.div_key} alt={this.load} className="m_image" src={new_img}/>
					</figure>
				</article>
			</div>
		)
		return (element);
  	}
  
	image_edit_constructor(){
		var element = (
			<div className="tile is-vertical">
				<div id={"tile1" + this.div_key} className="tile">
					<div className="tile is-parent is-vertical">
						<article className="tile is-child notification light-yellow">
							<figure className="image s-image">
								<div id={"img1"+this.div_key} onClick={e => this.imageHandler(e)}></div>
								<input id="in1" className="btn-hide" type="file" onChange={e => this.fileHandler(e)}></input>
							</figure>
						</article>
					</div>
				</div>
				<div id={"tile2" + this.div_key} className="tile">
					<div className="tile is-parent is-vertical">
						<article className="tile is-child notification light-yellow">
							<figure className="image s-image">
							<div id={"img2"+this.div_key} onClick={e => this.imageHandler(e)}></div>
							<input id="in2" className="btn-hide" type="file" onChange={e => this.fileHandler(e)}></input>
							<button id="del2" onClick={e => this.deleteHandler(e)}>Remove</button>
							</figure>
						</article>
					</div>
				</div>
				<div id={"tile3" + this.div_key} className="tile">
					<div className="tile is-parent is-vertical">
						<article className="tile is-child notification light-yellow">
							<figure className="image s-image">
								<div id={"img3"+this.div_key} onClick={e => this.imageHandler(e)}></div>
								<input id="in3" className="btn-hide" type="file" onChange={e => this.fileHandler(e)}></input>
								<button id="del3" onClick={e => this.deleteHandler(e)}>Remove</button>
							</figure>
						</article>
					</div>
				</div>
				<div id={"tile4" + this.div_key} className="tile">
					<div className="tile is-parent is-vertical">
						<article className="tile is-child notification light-yellow">
							<figure className="image s-image">
								<div id={"img4"+this.div_key} onClick={e => this.imageHandler(e)}></div>
								<input id="in4" className="btn-hide" type="file" onChange={e => this.fileHandler(e)}></input>
								<button id="del4" onClick={e => this.deleteHandler(e)}>Remove</button>
							</figure>
						</article>
					</div>
				</div>
				<div id={"tile5" + this.div_key} className="tile">
					<div className="tile is-parent is-vertical">
						<article className="tile is-child notification light-yellow">
							<figure className="image s-image">
								<div id={"img5"+this.div_key} onClick={e => this.imageHandler(e)}></div>
								<input id="in5" className="btn-hide" type="file" onChange={e => this.fileHandler(e)}></input>
								<button id="del5" onClick={e => this.deleteHandler(e)}>Remove</button>
							</figure>
						</article>
					</div>
				</div>
			</div>
		)
		return (element);
  }
}