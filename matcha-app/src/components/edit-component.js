import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";

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
        

            const data = {
                name: this.state.name,
                surname: this.state.surname,
                pwd: this.state.pwd,
                age: this.state.age,
            };
            console.log(data);
            //const regStatus = 
            //const errors = this.refs.form.showFieldErrors();
            if (this.state.age < 13) {
                this.setState({ageErr : 'You must be at least 13 to join'});
            } else {
                this.setState({ ageErr : ''})
            }

            if (this.state.pwd !== this.state.pwdCon) {
                this.setState({pwdErr : "Passwords don't match"})
            } else {
                this.setState({ pwdErr : ''});
            }

            
            this.setState({
                    name: '',
                    surname: '',
                    pwd: '',
                    pwdCon: '',
                    email: 'liam@gmail.com',
                    gender: '',
                    imgSet: '',
                    registered: true,
                });
        }
    render () {
        return (
        <section className="section hero">
            <div className="hero-head">
                <div className="columns is-mobile is-marginless heading has-text-weight-bold">
                    <div className="column left">
                        <figure className="navbar-item image">
                        <a href="./">
                            <img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
                        </a>
                        </figure>
                    </div>
                    <div className="column right">
                        <div className="control is-small has-icons-right">
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <p className="navbar-item has-text-white desktop">SIGN IN </p>
                        <figure className="navbar-item image has-text-white center">
                            <i className="fa fa-bars"></i>
                        </figure>
                    </div>
                </div>
            </div>
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