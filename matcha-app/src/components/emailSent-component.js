import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class EmailSent extends Component {
    
    render () {
        var div_key = Date.now();
        localStorage.setItem('div_key',div_key);
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
                <div id={"navMenu" + div_key} className="navbar-menu">
                    <div className="navbar-end">
                        <Link to="/login" className="navbar-item has-text-info">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                        <div className="column center has-text-centered">
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <figure className="image">
                                    <img src={require('../images/email.gif')} alt="../images/load.gif" />
                                </figure>
                                <br></br>
                                <br></br>
                                <h2>An email was sent to reset your password.</h2>
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
