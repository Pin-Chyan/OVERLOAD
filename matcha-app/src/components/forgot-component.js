import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
var ip = require("../server.json").ip;

// function DisplayStatus(props) {
//     if (props.status === 'not found' || props.status === 'something went wrong') {
//         return <h1> Error! invalid link. </h1>
//     }
//     if (props.status === 'already used') {
//         return <h1> Error! link already used. </h1>
//     }
//     if (props.status === 'activated') {
//         return <h1> Success! your account has been activated. </h1>
//     }
//     return <h1> Loading... </h1>
// }

export default class Verify extends Component {
    constructor(props) {
		super(props);
		
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

        this.state = {
			email: '',
			emailErr: ''
        }
	}
	
	onChangeEmail(e) {
        this.setState({email: e.target.value});
	}
	
	onSubmit(e) {
		e.preventDefault();

		this.setState({ emailErr: ''});


		if (this.state.email === '') {
			return this.setState({ emailErr: 'Please fill in your email!' });
		}
		//TODO: Fix multiple api requests problem
		// return axios.post(ip+'/users/email', { email: this.state.email })
		// 	.then(res1 => {
		// 	if (res1.data.present === 1) {
		// 		axios.post('http://localhost:5001/users/sendResetLink',{ emaill: this.state.email }).then(res2 => {
		// 			return Promise.resolve(res2.data);
		// 		});
		// 	} else {
		// 		return Promise.resolve(res1.data);
		// 		this.setState({ emailErr: 'Account not found!'});
		// 	}
		// }).catch(err => console.log(err));
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
                                <p>
                                    <hr></hr>
									<div className="field">
										<label className="label">Email</label>
										<div className="control has-icons-left has-icons-right">
											<input className="input" type="email" pla
											ceholder="Email input" value={this.state.email} onChange={this.onChangeEmail} required />
											<span className="icon is-small is-left">
												<i className="fa fa-envelope"></i>
											</span>
											<span className="icon is-small is-right">
												<i className="fa fa-exclamation-triangle"></i>
											</span>
										</div>
										<p className="help is-danger">{this.state.emailErr}</p>
									</div>
                                    <br></br>
                                    <br></br>
									<div className="control">
										<button className="button is-warning is-rounded" onClick={this.onSubmit}>Send</button>
									</div>
                                    <hr></hr>
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}