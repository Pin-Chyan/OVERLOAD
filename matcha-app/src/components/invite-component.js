import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.div_key = Date.now();
    }
    componentDidMount(){
        var burger = document.querySelector('.burger');
		var nav = document.querySelector('#'+burger.dataset.target+this.div_key);
		burger.addEventListener('click', function(){
		burger.classList.toggle('is-active');
		nav.classList.toggle('is-active');
		})
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
                <div id={"navMenu"+this.div_key} className="navbar-menu">
                    <div className="navbar-end">
                        <Link to="/login" className="navbar-item has-text-info">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                        <hr></hr>
                        <figure className="image"> {/* is-3by4 */}
                            <img src={require('../images/welcome.gif')} alt="../images/load.gif" />
                        </figure>
                        <div className="column center has-text-centered">
                            <hr></hr>
                            <p>
                                 Thank you for Register to LoveBug.
                            </p>
                            <br></br>
                            <br></br>
                            <p>
                                An email was sent to confirm your email address.
                            </p>
                            <br></br>
                            <br></br>
                            <p>
                                We hope you will find your matching lover as soon as possible.
                            </p>
                            <br></br>
                            <br></br>
                            <p>
                                Keeping you happy everyday.
                            </p>
                            <hr></hr>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        )
    }
}
