import React, { Component } from 'react';
// import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import axios from 'axios'; 

//var lol = "why me!";

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

        this.state = {
            name: '',
            surname: '',
            age: 0,
            pwd: '',
            pwdCon: '',
            email: '',
            gender: '',
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
            img4: ''
        };
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
            // if (this.state.email){
            //     data.email = this.state.email;
            // }
            if (this.state.sexual_pref){
                data.name = this.state.sexual_pref;
            }

            axios.post('http://localhost:5001/users/edit_spec', data)
            .then(res => {
                
            });

            //const errors = this.refs.form.showFieldErrors();
            
            this.setState({
                    name: '',
                    surname: '',
                    pwd: '',
                    pwdCon: '',
                    email: '',
                    gender: '',
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
                              <p className="title has-text-white">PAN Images 1</p>
                                <div className="file is-small">
                                    <a href="/" className="button is-light subtitle is-small" type="remove">Remove</a>
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
                              <img alt="Asuna" className="m_image" src={require('../images/sup.jpg')} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                              <p className="title has-text-white">PAN Images 2</p>
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
                                <img alt="Asuna" className="m_image" src={require('../images/kawaii.jpg')} />
                              </figure>
                              <span class="tag is-black">Black</span>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                              <p className="title has-text-white">PAN Images 3</p>
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
                                <img alt="Asuna" className="m_image" src={require('../images/err.jpg')} />
                              </figure>
                            </article>
                          </div>
                        </div>
                        <div className="tile">
                          <div className="tile is-parent is-vertical">
                          <article className="tile is-child notification light-yellow">
                              <p className="title has-text-white">PAN Images 4</p>
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
                                <img alt="Asuna" className="m_image" src={require('../images/meave.jpg')} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
                            <article className="tile is-child notification light-yellow">
                              <p className="title has-text-white">PAN Images 5</p>
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
                                <img alt="Asuna" className="m_image" src={require('../images/sen.jpg')} />
                              </figure>
                            </article>
                          </div>
                          <div className="tile is-parent">
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
                            {/* <p className="help is-danger">This email is required</p> */}
                        </div>


                        <div className="field">
                            <label className="label">Sexual Preference</label>
                            <div className="control">
                                <label className="radio">
                                    <input type="radio" name="question" />
                                    Male
                                </label>
                                <label className="radio">
                                    <input type="radio" name="question"/>
                                    Female
                                </label>
                                <label className="radio">
                                    <input type="radio" name="question"/>
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
                        </div>
                    </div>
                </div>
            {/* </div> */}
    </section>
        )
    }
}