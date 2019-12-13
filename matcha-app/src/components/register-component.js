import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";

export default class Register extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render () {
        return (
            <div className="hero-head">
            <div className="columns is-mobile is-marginless heading has-text-weight-bold">
                <div className="column left">
                    <figure className="navbar-item image">
                        <img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
                    </figure>
                </div>
                <div className="column right">
                    <div className="control is-small has-icons-right">
                        <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                        <span className="icon is-small is-right">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <p className="navbar-item has-text-white desktop">SIGN IN </p>
                    <figure className="navbar-item image has-text-white center">
                        <i className="fas fa-bars"></i>
                    </figure>
                </div>
            </div>
        </div>
        )
    }
}