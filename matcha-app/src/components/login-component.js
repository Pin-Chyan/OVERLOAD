import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { getJwt } from "./auth/jwt-helper.js";
// import "../styles/debug.css";
var ip = require("../server.json").ip;

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
        this.state = {
            email: '',
            password: '',
            emailErr: '',
            passwordErr: ''
        }
    }

    componentWillMount() {
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.addEventListener('keypress', this.handleKeyPress);
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    onSumbit = async e => {
       // e.preventDefault();
        const user = { email: this.state.email, password: this.state.password};
        this.setState({ emailErr: '', passwordErr: ''});      

        if (!(user.email === "" || user.password === "")) {
            axios.post(ip+'/auth/getToken', user)
            .then(res => {
                //codes [0 : OK] [1 : Inccorect password or username]
                console.log(res);
                if (res.data.resCode === 1) {
                    this.setState({ emailErr: "Email or Password incorrect" });
                } else if (res.data.resCode) {
                    this.setState({ emailErr: "Email has not been confirmed!" });
                } else {
                    localStorage.setItem('token', res.data.token);
                    axios.post(ip+"/users/get_spec", {"email": user.email,"target":"name last bio img tag"},{ headers: { authorization: `bearer ${res.data.token}` } })
                    .then(res => {
                        // this.props.history.push('/');
                        window.location.replace('/');
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            (user.email === '') ? this.setState({ emailErr: 'Please fill in your email!'}) : this.setState({ emailErr: ''});
            (user.password === '') ? this.setState({ passwordErr: 'Please fill in your password!'}) : this.setState({ passwordErr: ''});
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSumbit();
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
                        {/* <div className="control is-small has-icons-right search-margin">
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div> */}
                        {/* <Link to="/" className="navbar-item has-text-info">Home</Link>
                        <Link to="/user" className="navbar-item has-text-info">Profile</Link>
                        <Link to="/edit" className="navbar-item has-text-info">Profile Editor</Link> */}
                        <Link to="/register" className="navbar-item has-text-info">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
        {/* <div className="container"> */}
            <div className="columns is-centered shadow">
                <div className="column is-half bg_white">
                    <div className="column center">

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-exclamation-triangle"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{this.state.emailErr}</p>
                        </div>
                       
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{this.state.passwordErr}</p>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.onSumbit}>Submit</button>
                            </div>
                            <div className="control">
                                <Link to="/register" className="button borrow-btn has-text-info">Register</Link>
                                <Link to="/forgot" className="button borrow-btn has-text-info">Forgot password?</Link>
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