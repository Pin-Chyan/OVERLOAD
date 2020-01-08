import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import axios from 'axios'; 

var lol = "why me!";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangePwdCon = this.onChangePwdCon.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSexual_pref = this.onChangeSexual_pref.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            name: '',
            surname: '',
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
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: ''
        };
    }

    componentDidMount () {
        axios.post('http://localhost:5001/users/get_spec', {"email": "meave@gmail.com", "target":""}).then(res => {
            console.log(res.data[0].img.img1);
            this.setState({
                img1: res.data[0].img.img1,
                img2: res.data[0].img.img2,
                img3: res.data[0].img.img3,
                img4: res.data[0].img.img4,
                img5: res.data[0].img.img5,
            });
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

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);

        this.setState({
            selectedFile: event.target
        }
        )
    }
    
    fileUploadHandlerimg1 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img1 = reader.result;
            data.email = "meave@gmail.com";
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
        }
    }

    fileUploadHandlerimg2 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img2 = reader.result;
            data.email = "meave@gmail.com";
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
        }
    }

    fileUploadHandlerimg3 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img3 = reader.result;
            data.email = "meave@gmail.com";
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
        }
    }

    fileUploadHandlerimg4 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img4 = reader.result;
            data.email = "meave@gmail.com";
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
        }
    }

    fileUploadHandlerimg5 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img5 = reader.result;
            data.email = "meave@gmail.com";
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
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
                "email" : "meave@gmail.com"
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

            axios.post('http://localhost:5001/users/edit_spec', data)

            //const errors = this.refs.form.showFieldErrors();
            
            this.setState({
                    name: '',
                    surname: '',
                    pwd: '',
                    pwdCon: '',
                    email: '',
                    gender: '',
                    sexual_pref: '',
                    imgSet: '',
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
                        <a href="#" className="navbar-item has-text-info">Home</a>
                        <a href="#" className="navbar-item has-text-info">Profile</a>
                        <a href="#" className="navbar-item has-text-info">Edited Profile</a>
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
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button onClick={this.fileUploadHandlerimg1}>Upload</button>
                                </div>
                              <figure className="image is-4by3">
                              <img alt="Asuna" className="m_image" src={this.state.img1} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                            <div className="file is-small">
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button onClick={this.fileUploadHandlerimg2}>Upload</button>
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
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button onClick={this.fileUploadHandlerimg3}>Upload</button>
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
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button onClick={this.fileUploadHandlerimg4}>Upload</button>
                                </div>
                              <figure className="image is-4by3">
                                <img alt="Asuna" className="m_image" src={this.state.img4} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                            <div className="file is-small">
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" onChange={this.fileSelectedHandler} name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                    <button onClick={this.fileUploadHandlerimg5}>Upload</button>
                                </div>
                              <figure className="image is-4by3">
                                <img alt="Asuna" className="m_image" src={this.state.img5} />
                              </figure>
                            </article>
                          </div>
                          {/* <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow-p">
                              <p className="title has-text-white">Profile Image</p>
                              <div className="file is-small">
                                    <a href="" className="button is-light subtitle is-small" type="remove">Remove</a>
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="resume" />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                    </label>
                                </div>
                              <figure className="image is-4by3">
                                <img alt="Asuna" className="m_image" src={require('../images/profile.jpg')} />
                              </figure>
                            </article>
                          </div> */}
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
                            {/* <p className="help is-danger">This email is required</p> */}
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
                                <input class="is-checkradio is-white pad" id="exampleCheckboxWhite" type="checkbox" name="exampleCheckboxWhite" />
                                <label for="exampleCheckboxWhite">#Gamer</label>

                                <input class="is-checkradio is-white pad" id="exampleCheckboxWhite2" type="checkbox" name="exampleCheckboxWhite2" />
                                <label for="exampleCheckboxWhite2">#Sports</label>
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