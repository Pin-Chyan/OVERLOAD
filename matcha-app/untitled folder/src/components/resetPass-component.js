import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
var ip = require("../server.json").ip;

// function PasswordUpdated(props) {

// }

function PasswordInput(props){
    if (props.validKey) {
        return (
            <div>
                <div className="field">
                    <label className="label">New Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="Password" value={props.password} onChange={props.onChangePassword} required />
                        <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fa fa-exclamation-triangle"></i>
                        </span>
                        <p className="help is-danger">{props.passwordError}</p>
                    </div>
                    <br></br>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="password" placeholder="Confirm Password" value={props.confirmPassword} onChange={props.onChangeConfirmPassword} required />
                        <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fa fa-exclamation-triangle"></i>
                        </span>
                        <p className="help is-danger">{props.confirmPasswordError}</p>
                    </div>
                </div>
                <br></br>
                <div className="control">
                    <button className="button is-warning is-rounded" onClick={props.onClick}>Submit</button>
                </div>
            </div>
        )
    } else {
        return <h1>This Link is invalid</h1>
    }
    return <h1>Loading...</h1>
}

export default class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            passwordError: '',
            confirmPasswordError: '',
            email: '',
            password: '',
            confirmPassword: '',
            validKey: false
        }
    }

    componentDidMount() {
        const { vkey } = this.props.match.params;

		axios.get(`${ip}/users/verifyKey/${vkey}`).then(res => {
            this.setState({ validKey: res.data.validKey, email: res.data.email });
        }).catch(() => {
			this.setState({ validKey: false });
		}); 
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.setState({ passwordError: '', confirmPasswordError: ''});

        if(this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({ passwordError: (this.state.password === '') ? '* Missing Field' : ''})
            this.setState({ confirmPasswordError: (this.state.confirmPassword === '') ? '* Missing Field' : ''})
        } else if (this.state.password.length < 5) {
            this.setState({ passwordError: 'Password needs to be 5 or more characters'})
        } else if (!this.state.password.match(/[A-Z]+/) || !this.state.password.match(/[0-9]+/)) {
            if (!this.state.password.match(/[0-9]+/) && !this.state.password.match(/[A-Z]+/)) {
                this.setState({ passwordError: 'Password should contain at least one uppercase letter and number'})
            } else {
                this.setState({ passwordError: (!this.state.password.match(/[A-Z]+/)) ? 'Password should contain at least one uppercase letter' : ''})
                this.setState({ confirmPasswordError: (!this.state.confirmPassword.match(/[0-9]+/)) ? 'Password should contain at least one number' : ''})
            }
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordError: "Passwords don't match" });
        } else {
            axios.post(ip+`/users/resetPassword/${this.props.match.params.vkey}`, { email: this.state.email, newPassword: this.state.password }).then(res => {
                if (res.data.updated) {
                    this.props.history.push('/passwordUpdated');
                }
            })
        }
    }

    render() {
        return(
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
                </div>
            </nav>
                <div className="container">
                    <div className="columns is-centered shadow">
                        <div className="column is-half bg_white_1">
                            <div className="column center has-text-centered">
                                <hr></hr>
                                <PasswordInput validKey={this.state.validKey} confirmPassword={this.state.confirmPassword} password={this.state.password} onChangePassword={this.onChangePassword} onClick={this.onSubmit} onChangeConfirmPassword={this.onChangeConfirmPassword} passwordError={this.state.passwordError} confirmPasswordError={this.state.confirmPasswordError}/>
                                <br></br>
                                <br></br>
                                <hr></hr>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}