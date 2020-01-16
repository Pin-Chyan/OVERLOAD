import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import decode from 'jwt-decode';
// import "../styles/debug.css";
import axios from 'axios';
import { getJwt } from "./auth/jwt-helper.js";
import { func } from 'prop-types';

var token;
var sesh = "";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var nll = require("../images/chibi.jpg");
var ip = require("../server.json").ip;

const items = [
    'Gamer',
    'Sports',
    'Adventurer',
    'Outdoor',
    'Funny',
    'Love',
  ];
export default class Edit extends Component {
    constructor(props) {
        super(props);

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
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            name: '',
            surname: '',
            bio: '',
            age: 0,
            pwd: '',
            pwdCon: '',
            email: '',
            gender: '',
            sexual_pref: '',
            img: '',
            registered: false,
            pwdErr: '',
            nameErr: '',
            surnameErr: '',
            ageErr: '',
            emailErr: '',
            tags: [],
            img1: load2,
            img2: load,
            img3: load2,
            img4: load2,
            img5: load2
        };
    }
    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
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
            if (!tag.find(function (res){return res == new_tag;}) && new_tag != ""){
                tag.push(new_tag);
                return (tag);
            }
            return (tag);
        } else if (mode === "delete") {
            var tag  = tag_arr;
            new_tag = new_tag.trim();
            if (tag.find(function (res){return res == new_tag;}) && new_tag != ""){
                var pos = tag.findIndex(function (res){return res == new_tag;});
                tag.splice(pos,1);
                return (tag);
            }
            return (tag);
        }
    }
    get_handle(res){
        if (res.data == "invalid token" || res.data == "token not present"){
            return("error");
        }
        else if (res.data[0].name){
            var data = {}
            data.email = res.data[0].email;
            data.name = res.data[0].name;
            data.bio = res.data[0].bio;
            data.tag = res.data[0].tag.toString();
            data.tag_arr = res.data[0].tag;
            if (res.data[0].img.img1 == 'null')
                data.img1 = nll;
            else
                data.img1 = res.data[0].img.img1;
            if (res.data[0].img.img2 == 'null')
                data.img2 = nll;
            else
                data.img2 = res.data[0].img.img2;
            if (res.data[0].img.img3 == 'null')
                data.img3 = nll;
            else
                data.img3 = res.data[0].img.img3;
            if (res.data[0].img.img4 == 'null')
                data.img4 = nll;
            else
                data.img4 = res.data[0].img.img4;
            if (res.data[0].img.img5 == 'null')
                data.img5 = nll;
            else
                data.img5 = res.data[0].img.img5;
            return(data);
        }
        return("error");
    }
    componentDidMount () {
        const jwt = localStorage.token;
        token = localStorage.token;
        console.log(jwt);
        async function get_userdata(){
            if (jwt) {
                let prom = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
                if (prom.status == 200){
                    sesh = prom.data.email;
                    console.log(prom.data.email);
                    let prom2 = axios.post(ip+"/users/get_spec", {"email": prom.data.email,"target":"name last bio img email tag","token":jwt});
                    return(prom2);
                }
            } else {
                return ("error");
            }
        }
        get_userdata().then(res => {
            if (res !== "error"){
                var data = this.get_handle(res);
                console.log(data);
                console.log(res);
                sesh = data.email;
                if (data !== "error")
                    this.setState(data);
            }
        });
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
            if (req.status == 200)
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
        if (this.state[file] && img.target.value == "upload"){
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
                if (req.status == 200){
                    var res = {};
                    res[img_num] = data.img[img_num]; 
                    this.setState(res);
                }
                var reset = {};
                reset[file] = ""; 
                this.setState(reset);
            }.bind(this);
        }
        else if (img.target.value == "delete")
            this.globalrm(img_num);
    }

    onChangeSexual_pref(e) {
        this.setState({
                sexual_pref: e.target.value
            });
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
                "email" : sesh,
                "token" : localStorage.token
            };

            if (this.state.new_name){
                data.name = this.state.new_name.trim();
            }
            if (this.state.new_last){
                data.last = this.state.new_last;
            }
            if (this.state.sexual_pref){
                data.sexual_pref = this.state.sexual_pref;
            }
            if (this.state.bio){
                data.bio = this.state.bio;
            }
            console.log(data);
            axios.post(ip+"/users/edit_spec", data);
            this.setState(data);
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
    render () {
        return (
        <section className="section hero">
        <nav className="navbar hero-head">
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
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <Link to="/" className="navbar-item has-text-info">Home</Link>
                        <Link to="/user" className="navbar-item has-text-info">Profile</Link>
                        <Link to="/edit" className="navbar-item has-text-info">Profile Editor</Link>
                        <Link to="/logout" className="navbar-item has-text-info">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="columns is-centered shadow">
                <div className="column bg_white">
                    <div className="column center">

                    <div className="tile is-ancestor">
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
                              <img alt="Asuna" className="m_image" src={this.state.img1} />
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
                                <img alt="Asuna" className="m_image" src={this.state.img2} />
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
                                <img alt="Asuna" className="m_image" src={this.state.img3} />
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
                                <img alt="Asuna" className="m_image" src={this.state.img4} />
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
                                <img alt="Asuna" className="m_image" src={this.state.img5} />
                              </figure>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>

                        <div className="field">
                            <label className="label">Current Email: {this.state.email}</label>
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
                            <label className="label">Current Name: {this.state.name}</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="New Name" value={this.state.new_name} onChange={this.onChangeName} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Current Surname: {this.state.last}</label>
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

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.onSubmit}>Change</button>
                            </div>
                            <div className="control">
                                <button className="button is-warning is-rounded is-light">Cancel</button>
                            </div>
                        </div>
                        {/* 
                        <div className="field">
                        <label className="label">Sexual Preference</label>
                        <div className="control">
                        <label className="radio">
                        <input type="radio" name="question" value="male" onChange={this.onChangeSexual_pref} checked={this.state.sexual_pref === 'male'}/>
                        Male
                                </label>
                                <label className="radio">
                                <input type="radio" name="question" value="female" onChange={this.onChangeSexual_pref} checked={this.state.sexual_pref === 'female'}/>
                                Female
                                </label>
                                <label className="radio">
                                <input type="radio" name="question" value="bisexual" onChange={this.onChangeSexual_pref} checked={this.state.sexual_pref === 'bisexual'}/>
                                Bisexual
                                </label>
                                </div>
                            </div> */}

                        <div class="field">
                            <label className="label">Current Tags: {this.state.tag}</label>
                            <div className="control">
                                <div className="field">
                                    <label className="label">Tag Name</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input" type="text" placeholder="New bio" value={this.state.new_tag} onChange={this.onChangeTag} required />
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
                    </div>
                </div>
            </div>
    </section>
        )
    }
}