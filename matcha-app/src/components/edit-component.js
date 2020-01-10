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
var sesh = "meave@gmail.com";
var token = "admin";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
<<<<<<< HEAD
var nll = require("../images/nll.png");
// console.log(db);
var ip = "http://10.212.6.4:5001";
=======
var nll = require("../images/err.jpg");
>>>>>>> a984419505b8a08b05fae7f643fe8e1619f55c88

export default class Register extends Component {
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
        this.componentDidMount = this.componentDidMount.bind(this);
        this.rm1 = this.rm1.bind(this);
        this.rm2 = this.rm2.bind(this);
        this.rm3 = this.rm3.bind(this);
        this.rm4 = this.rm4.bind(this);
        this.rm5 = this.rm5.bind(this);

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
            img1: load2,
            img2: load,
            img3: load2,
            img4: load2,
            img5: load2
        };
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

    onChangeTags(e) {
        this.setState({
                tags:  e.target.value;
            });
    }

    fileSelectedHandler1 = event => {
        this.setState({selectedFile1: event.target})
    }
    fileSelectedHandler2 = event => {
        this.setState({selectedFile2: event.target})
    }
    fileSelectedHandler3 = event => {
        this.setState({selectedFile3: event.target})
    }
    fileSelectedHandler4 = event => {
        this.setState({selectedFile4: event.target})
    }
    fileSelectedHandler5 = event => {
        this.setState({selectedFile5: event.target})
    }

    rm1 = () => {
        this.setState({img1:load});
        async function ok() {
            var data = {};
            data.img = {};
            data.img.img1 = nll;
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status == 200)
                return (1);
        }
        ok().then( res => {this.setState({img1 : nll})});
    }
    rm2 = () => {
        this.setState({img1:load});
        async function ok() {
            var data = {};
            data.img = {};
            data.img.img2 = nll;
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status == 200)
                return (1);
        }
        ok().then( res => {this.setState({img2 : nll})});
    }
    rm3 = () => {
        this.setState({img3:load});
        async function ok() {
            var data = {};
            data.img = {};
            data.img.img3 = nll;
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status == 200)
                return (1);
        }
        ok().then( res => {this.setState({img3 : nll})});
    }
    rm4 = () => {
        this.setState({img4:load});
        async function ok() {
            var data = {};
            data.img = {};
            data.img.img4 = nll;
            data.email = sesh;
            data.token = token
            console.log("start upload");
            let req = await axios.post(ip+"/users/edit_spec", data);
            if (req.status == 200)
                return (1);
        }
        ok().then( res => {this.setState({img4 : nll})});
    }
    rm5 = () => {
        this.setState({img5:load});
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
        ok().then( res => {this.setState({img5 : nll})});
    }

    fileUploadHandlerimg1 = () => {
        if (this.state.selectedFile1){
            var reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile1.files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img.img1 = reader.result;
                data.email = sesh;
                data.token = token
                console.log("start upload");
                this.setState({img1:load});
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200)
                    this.setState({img1:data.img.img1});
                this.setState({selectedFile1: ""});
            }.bind(this);
        }
    }
    fileUploadHandlerimg2 = () => {
        if (this.state.selectedFile2){
            var reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile2.files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img.img2 = reader.result;
                data.email = sesh;
                data.token = token
                console.log("start upload");
                this.setState({img2:load});
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200)
                    this.setState({img2:data.img.img2});
                this.setState({selectedFile2: ""});
            }.bind(this);
        }
    }
    fileUploadHandlerimg3 = () => {
        if (this.state.selectedFile3){
            var reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile3.files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img.img3 = reader.result;
                data.email = sesh;
                data.token = token
                console.log("start upload");
                this.setState({img3:load});
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200)
                    this.setState({img3:data.img.img3});
                this.setState({selectedFile3: ""});
            }.bind(this);
        }
    }
    fileUploadHandlerimg4 = () => {
        if (this.state.selectedFile4){
            var reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile4.files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img.img4 = reader.result;
                data.email = sesh;
                data.token = token
                console.log("start upload");
                this.setState({img4:load});
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200)
                    this.setState({img4:data.img.img4});
                this.setState({selectedFile4: ""});
            }.bind(this);
        }
    }
    fileUploadHandlerimg5 = () => {
        if (this.state.selectedFile5){
        var reader = new FileReader();
            reader.readAsDataURL(this.state.selectedFile5.files[0]);
            reader.onloadend = async function() {
                var data = {};
                data.img = {};
                data.img.img5 = reader.result;
                data.email = sesh;
                data.token = token
                console.log("start upload");
                this.setState({img5:load});
                let req = await axios.post(ip+"/users/edit_spec", data);
                if (req.status == 200)
                    this.setState({img5:data.img.img5});
                this.setState({selectedFile5: ""});
            }.bind(this);
        }
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
                                    <a className="button is-light subtitle is-small" onClick={this.rm1} >Remove</a>
                                        <label className="file-label">
                                            <input id="1" className="file-input" type="file" onChange={this.fileSelectedHandler1} name="resume" />
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
                                </div>
                              <figure className="image is-4by3">
                              <img alt="Asuna" className="m_image" src={this.state.img1} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                            <div className="file is-small">
                               <a className="button is-light subtitle is-small" onClick={this.rm2} >Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler2} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button className="file-name" onClick={this.fileUploadHandlerimg2}>Upload</button>
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
                                    <a className="button is-light subtitle is-small" onClick={this.rm3} >Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler3} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button className="file-name" onClick={this.fileUploadHandlerimg3}>Upload</button>
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
                                <a className="button is-light subtitle is-small" onClick={this.rm4} >Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler4} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button className="file-name" onClick={this.fileUploadHandlerimg4}>Upload</button>
                                </div>
                              <figure className="image is-4by3">
                                <img alt="Asuna" className="m_image" src={this.state.img4} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                            <div className="file is-small">
                                    <a className="button is-light subtitle is-small" onClick={this.rm5} >Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler5} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button className="file-name" onClick={this.fileUploadHandlerimg5}>Upload</button>
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
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.onSubmit}>Change</button>
                            </div>
                            <div className="control">
                                <button className="button is-warning is-rounded is-light">Cancel</button>
                            </div>
                        </div>
                        <div class="bd-notification is-dark">
                            <div class="field">
                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Gamer'} />
                                <label for="exampleCheckboxWhite">#Gamer</label>

                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Sports'} />
                                <label for="exampleCheckboxWhite2">#Sports</label>

                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Adventurer'} />
                                <label for="exampleCheckboxWhite2">#Adventurer</label>

                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Funny'} />
                                <label for="exampleCheckboxWhite2">#Funny</label>

                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Outside'} />
                                <label for="exampleCheckboxWhite2">#Outdoors</label>

                                <input class="is-checkradio is-white pad"  name="Tags_assigned" id="exampleCheckboxWhite" type="checkbox" onChange={this.onChangeTags} checked={this.state.tags === '#Love'} />
                                <label for="exampleCheckboxWhite2">#Love</label>
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