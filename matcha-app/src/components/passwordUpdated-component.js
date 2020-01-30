import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

var token = "admin";//localStorage.token;
var sesh = "cyko@gmail.com";//decode(localStorage.token);
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var ip = require("../server.json").ip;
// const Image = props => (
//     <div>
//         <img alt="Asuna" className="m_image" src={props.image.img} />
//         <p className="legend">{props.image.username}</p>
//     </div>
// )

export default class PasswordUpdated extends Component {
    
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
                        <Link to="/login" className="navbar-item has-text-info">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                        <div className="column center has-text-centered">
                            <p>
                                <hr></hr>
                                <br></br>
                                <br></br>
                                <h2>Your password was successfully updated.</h2>
                                <br></br>
                                <br></br>
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