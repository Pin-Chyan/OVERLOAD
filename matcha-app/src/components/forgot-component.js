import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
var ip = require("../server.json").ip;



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
		} else {
			axios.post(ip+'/users/email', { email: this.state.email })
			.then(res => {
				if (res.data.present === 1) {
					axios.post(ip+'/users/sendResetLink',{ email: this.state.email }).then(res => {
						this.props.history.push('/emailSent');
					});
				} else {
					this.setState({ emailErr: 'Account not found.'});
				}
			});
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