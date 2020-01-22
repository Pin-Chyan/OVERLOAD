import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import decode from 'jwt-decode';
import ReactDOM from 'react-dom'
// import "../styles/debug.css";
import axios from 'axios';

var token;
var sesh = "";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var nll = require("../images/chibi.jpg");
var ip = require("../server.json").ip;

// TODO:  Add ablitity to change sexual pref and gender,
//        (optional) show fame rating
//        show people liked you and people how viewed your profile   

export default class Edit extends Component {
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                  <<<< eve protocol >>>>
//

    constructor(props) {
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
        this.state = {};
        console.log(this.ip);
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            console.log('eve online');
            //     <<<< begin binding after database online >>>>
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeLast = this.onChangeLast.bind(this);
            this.onChangeSurname = this.onChangeSurname.bind(this);
            this.onChangePwd = this.onChangePwd.bind(this);
            this.onChangePwdCon = this.onChangePwdCon.bind(this);
            this.onChangebio = this.onChangebio.bind(this);
            this.onChangeAge = this.onChangeAge.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onChangeSexual_pref = this.onChangeSexual_pref.bind(this);
            this.onChangeTag = this.onChangeTag.bind(this);
            this.setDefault = this.setDefault.bind(this)
            this.busy = 0;
            this.curr_page = [0,0,0];
            this.other_page = [0,0,0];
            this.state = {
                "user": res,
                checked: true
            };
            if (this.props.location.user){
                this.setState({"user":this.props.location.user});
                this.eve_mount();
            }
            else
                this.userData_getter();
        }).catch(err => {console.log('eve redirect' + err)});
    }
    userData_getter(){
        console.log('getting data......');
        async function get_data(email,jwt,ip,target){
            console.log(email);
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target}, { headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img gender sexual_pref").then(userGet_res => {
                this.setState({"user":userGet_res[0]});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount(){
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
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

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

    tag_handle(tag_arr, new_tag, mode){
        if (mode === "upload"){
            var tag  = tag_arr;
            new_tag = new_tag.trim();
            if (!tag.find(function (res){return res === new_tag;}) && new_tag !== ""){
                tag.push(new_tag);
                return (tag);
            }
            return (tag);
        } else if (mode === "delete") {
            var tag  = tag_arr;
            new_tag = new_tag.trim();
            if (tag.find(function (res){return res === new_tag;}) && new_tag !== ""){
                var pos = tag.findIndex(function (res){return res === new_tag;});
                tag.splice(pos,1);
                return (tag);
            }
            return (tag);
        }
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
                gender: e.target.value
            });
    }


    globalhander = event => {
        var data = {};
        data["selectedFile" + event.target.id] = event.target;
        this.setState(data);
    }
    globalrm(img){
        var img_data = {};
        img_data[img] = load;
        this.setState(img_data);
        async function async_edit() {
            var data = {};
            data.img = {};
            data.img[img] = 'null';
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status === 200)
                return (1);
        }
        async_edit().then( res => {
            img_data[img] = nll;
            this.setState(img_data);
        });
    }
    globalimg(img){
        var file = "selectedFile" + img.target.id;
        var img_num = "img" + img.target.id;
        console.log(sesh);
        // console.log(img_num);
        if (this.state[file] && img.target.value === "upload"){
            console.log("file read start");
            var reader = new FileReader();
            reader.readAsDataURL(this.state[file].files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img[img_num] = reader.result;
                console.log("start upload");
                data.email = sesh;
                data.token = token;
                var img_data = {};
                img_data[img_num] = load;
                this.setState(img_data);
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status === 200){
                    var res = {};
                    res[img_num] = data.img[img_num];
                    this.setState(res);
                }
                var reset = {};
                reset[file] = ""; 
                this.setState(reset);
            }.bind(this);
        }
        else if (img.target.value === "delete")
            this.globalrm(img_num);
    }

    onChangeSexual_pref(e) {
      
        this.setState({
                new_sexual_pref: parseInt(e.target.value, 10),
                checked: !this.state.checked
            });

            console.log(this.state.new_sexual_pref)
    }

    
    onChangeAge(e) {
        this.setState({
                age: e.target.value
            });
    }

    onTagSubmit = e => {
        console.log(e.target.id);
        if (this.state.new_tag)
            var new_tag = this.state.new_tag;
        else
            var new_tag = '';
        var res = this.tag_handle(this.state.tag_arr,new_tag,e.target.id);
        console.log(res);
        axios.post(ip+"/users/edit_spec", {"email": sesh,"token":token, "tag":res});
        this.setState({tag:res.toString()});
        // this.forceUpdate();
    }
    
    onSubmit = async e => {
        console.log(this.state.user);
            e.preventDefault();

            var data = {
                "email" : this.state.user.email,
                "token" : this.jwt,
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
            console.log('line ------ 328')
            console.log(data);
            axios.post(ip+"/users/edit_spec", data);
            this.setState({
                "user" : state_data
            })
            // console.log(this.state.new_email);
            if (this.state.new_email){
                var tester = this.state.new_email;
                if (tester.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/)){
                    axios.post(ip+"/users/email", {"email":this.state.new_email}).then(res => {
                    if (res.data.present !== 1){
                        data.target = "password";
                        console.log(this.state.email);
                        console.log("new email");
                        console.log(this.state.new_email);
                        axios.post(ip+"/users/get_spec", data).then(docs => {
                                console.log("got pass");
                                var user = {};
                                console.log(decode(token).password);
                                user.password = decode(token).password;//docs.data[0].password;
                                user.email = this.state.new_email;
                                var email_reset = {};
                                email_reset.token = token;
                                email_reset.email = sesh;
                                email_reset.new_email = this.state.new_email;
                                axios.post(ip+"/users/edit_spec", email_reset).then( res => {
                                    console.log("users spec");
                                    console.log(user);
                                    axios.post('http://localhost:5001/auth/getToken', user)
                                    .then(res => {
                                        if (res.data.resCode === 1) {
                                            this.setState({ email: "Email or Password incorrect" });
                                        } else {
                                            localStorage.setItem('token', res.data.token);
                                            console.log(res.data.token);
                                            console.log("before");
                                            console.log(token);
                                            token = res.data.token;
                                            sesh = this.state.new_email;
                                            console.log("after");
                                            console.log(token);
                                            // this.props.history.push('/');
                                        }
                                    })
                                    console.log("done");
                                });
                            })
                        } else {
                            this.setState({new_email:"email in use!"});
                        }
                    })
                } else {
                    this.setState({new_email:"invalid email"});
                }
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<<< Redner return >>>>
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
    image_edit_constructor(){
        return (
            <div className="tile is-vertical">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification light-yellow">
                        <div className="file is-small">
                            {/* <a className="button is-light subtitle is-small" onClick={this.rm1} >Remove</a> */}
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
                                {/* <button className="file-name" onClick={this.fileUploadHandlerimg1}>Upload</button> */}
                                <div onClick={e => this.globalimg(e)}>
                                    <button id="1" className="file-name" value="upload">upload</button>
                                    <button id="1" className="file-name" value="delete">delete</button>
                                </div>
                        </div>
                      <figure className="image is-4by3">
                      <img alt="Asuna" className="m_image" src={this.state.user.img.img1} />
                      </figure>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification light-yellow">
                    <div className="file is-small">
                       {/* <a className="button is-light subtitle is-small" onClick={this.rm2} >Remove</a> */}
                                <label onChange={this.globalhander} className="file-label">
                                    <input id="2" className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </label>
                            {/* <button className="file-name" onClick={this.fileUploadHandlerimg2}>Upload</button> */}
                            <div onClick={e => this.globalimg(e)}>
                                    <button id="2" className="file-name" value="upload">upload</button>
                                    <button id="2" className="file-name" value="delete">delete</button>
                            </div>
                        </div>
                      <figure className="image is-4by3">
                        <img alt="Asuna" className="m_image" src={this.state.user.img.img2} />
                      </figure>
                      {/* <span class="tag is-black">Black</span> */}
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification light-yellow">
                    <div className="file is-small">
                            {/* <a className="button is-light subtitle is-small" onClick={this.rm3} >Remove</a> */}
                                <label onChange={this.globalhander} className="file-label">
                                    <input id="3" className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </label>
                            {/* <button className="file-name" onClick={this.fileUploadHandlerimg3}>Upload</button> */}
                            <div onClick={e => this.globalimg(e)}>
                                    <button id="3" className="file-name" value="upload">upload</button>
                                    <button id="3" className="file-name" value="delete">delete</button>
                            </div>
                        </div>
                      <figure className="image is-4by3">
                        <img alt="Asuna" className="m_image" src={this.state.user.img.img3} />
                      </figure>
                    </article>
                  </div>
                </div>
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification light-yellow">
                  <div className="file is-small">
                        {/* <a className="button is-light subtitle is-small" onClick={this.rm4} >Remove</a> */}
                                <label onChange={this.globalhander} className="file-label">
                                    <input id="4" className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </label>
                            {/* <button className="file-name" onClick={this.fileUploadHandlerimg4}>Upload</button> */}
                            <div onClick={e => this.globalimg(e)}>
                                    <button id="4" className="file-name" value="upload">upload</button>
                                    <button id="4" className="file-name" value="delete">delete</button>
                            </div>
                        </div>
                      <figure className="image is-4by3">
                        <img alt="Asuna" className="m_image" src={this.state.user.img.img4} />
                      </figure>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification light-yellow">
                    <div className="file is-small">
                            {/* <a className="button is-light subtitle is-small" onClick={this.rm5} >Remove</a> */}
                                <label onChange={this.globalhander} className="file-label">
                                    <input id="5" className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </label>
                            {/* <button className="file-name" onClick={this.fileUploadHandlerimg5}>Upload</button> */}
                            <div onClick={e => this.globalimg(e)}>
                                    <button id="5" className="file-name" value="upload">upload</button>
                                    <button id="5" className="file-name" value="delete">delete</button>
                            </div>
                        </div>
                      <figure className="image is-4by3">
                        <img alt="Asuna" className="m_image" src={this.state.user.img.img5} />
                      </figure>
                    </article>
                  </div>
                </div>
            </div>
        )
    }

    setDefault(target) {
      if (target === this.state.user.sexual_pref) {
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
                    <label className="radio">
                        <input type="radio" name="question" value="-1" defaultChecked={this.setDefault(-1)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
                        Male
                    </label>
                    <label className="radio">
                        <input type="radio" name="question" value="1" defaultChecked={this.setDefault(1)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
                        Female
                    </label>
                    <label className="radio">
                        <input type="radio" name="question" value="0" defaultChecked={this.setDefault(0)} onChange={this.onChangeSexual_pref} checked={this.state.checked}/>
                        Bisexual
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



