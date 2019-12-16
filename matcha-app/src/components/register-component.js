import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";

export default class Register extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render () {
        return (
        <section className="section hero">
            <div className="hero-head">
                <div className="columns is-mobile is-marginless heading has-text-weight-bold">
                    <div className="column left">
                        <figure className="navbar-item image">
                        <a href="./home-component.js">
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

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Name" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Surname</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Name" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Age</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Age" />
                            </div>
                            <p>your age will be shown public.</p>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-success" type="text" placeholder="Text input" value="Password" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                            <p className="help is-success">This username is available</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger" type="email" placeholder="Email input" value="Email" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-exclamation-triangle"></i>
                                </span>
                            </div>
                            <p className="help is-danger">This email is invalid</p>
                        </div>


                        <div className="field">
                            <label className="label">Gender</label>
                            <div className="control">
                                <label className="radio">
                                    <input type="radio" name="question" />
                                    Male
                                </label>
                                <label className="radio">
                                    <input type="radio" name="question" />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="file has-name is-fullwidth field is-right">
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
                                <span className="file-name">
                                    image...
                                </span>
                            </label>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light">Cancel</button>
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