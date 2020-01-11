import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import axios from 'axios';
import { func } from 'prop-types';

var ip = require("../server.json").ip;
console.log(ip);
var sesh = "meave@gmail.com";
var token = "admin";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var nll = require("../images/err.jpg");

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
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangePwdCon = this.onChangePwdCon.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSexual_pref = this.onChangeSexual_pref.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
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
            tags: '',
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

    componentDidMount () {
        axios.post(ip+"/users/get_spec", {"email": sesh, "target":"img name", "token":token}).then(res => {
            console.log(res);
            if (res.data == "invalid token" || res.data == "token not present"){
                return (window.location.href = ip+"/login");
            }
            else if (res.data[0].name){
                this.setState({
                    img1: res.data[0].img.img1,
                    img2: res.data[0].img.img2,
                    img3: res.data[0].img.img3,
                    img4: res.data[0].img.img4,
                    img5: res.data[0].img.img5,
                });
            }
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
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
                email: e.target.value
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
        console.log(event.target.files[0]);
    }
    globalrm(img){
        var img_data = {};
        img_data[img] = load;
        this.setState(img_data);
        async function ok() {
            var data = {};
            data.img = {};
            data.img.img5 = nll;
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status == 200)
                return (1);
        }
        ok().then( res => {
            img_data[img] = nll;
            this.setState(img_data);
        });
    }
    globalimg(img){
        var file = "selectedFile" + img.target.id;
        var img_num = "img" + img.target.id;
        console.log(file);
        console.log(img_num);
        if (this.state[file] && img.target.value == "upload"){
            console.log("file read start");
            var reader = new FileReader();
            reader.readAsDataURL(this.state[file].files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img[img_num] = reader.result;
                data.email = sesh;
                data.token = token;
                console.log("start upload");
                var img_data = {};
                img_data[img_num] = load;
                this.setState(img_data);
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200){
                    var res = {};
                    res[img_num] = data.img[img_num]; 
                    this.setState({img1:data.img.img1});
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


    onChangeTags = e => {
        this.setState({
                tags: e.target.value
            });
    }

    onChangeAge(e) {
        this.setState({
                age: e.target.value
            });
    }
    
    onSubmit = async e => {
            e.preventDefault();

            var data = {
                "email" : sesh,
                "token" : token
            };

            if (this.state.name){
                data.name = this.state.name;
            }
            if (this.state.email){
                data.email = this.state.email;
            }
            if (this.state.sexual_pref){
                data.sexual_pref = this.state.sexual_pref;
            }
            if (this.state.bio){
                data.bio = this.state.bio;
            }
            if (this.state.tags) {
                data.tags = this.state.tags;
            }

            axios.post(ip+"/users/edit_spec", data)

            //const errors = this.refs.form.showFieldErrors();
            
            this.setState({
                    name: '',
                    surname: '',
                    pwd: '',
                    pwdCon: '',
                    email: '',
                    gender: '',
                    sexual_pref: '',
                    tags: '',
                    imgSet: '',
                    bio: '',
                    registered: true,
                });
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
                    </div>
                </div>
            </div>
        </nav>
        {/* <div className="container"> */}
            <div className="columns is-centered shadow">
                <div className="column is-half bg_white">
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
                                <input className="input" type="email" placeholder="New E-mail" value={this.state.email} onChange={this.onChangeEmail} required />
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
                                <input className="input" type="email" placeholder="New Name" value={this.state.name} onChange={this.onChangeName} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Update Bio</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="New bio" value={this.state.bio} onChange={this.onChangebio} required />
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
                            <label className="label">Selectable Tags:</label>
                            <div className="control">
                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === 'male'} />
                                <label>
                                    #Gamer
                                </label>

                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Sports'} />
                                <label>
                                    #Sports
                                </label>

                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Adventurer'} />
                                <label>
                                    #Adventurer
                                </label>

                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Funny'} />
                                <label>
                                    #Funny
                                </label>

                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Outside'} />
                                <label>
                                    #Outdoors
                                </label>

                                <input className="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Love'} />
                                <label>
                                    #Love
                                </label>
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
                        
                        </div>
                    </div>
                </div>
            {/* </div> */}
    </section>
        )
    }
}