import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Inbox from './message-and-notification';
import { Fade } from 'react-slideshow-image';
import cons from './chat-component';


var loggedin = "lkrielin@gmail.com" //userid

export default class Home extends Component {

    constructor(props){
        super(props);
        this.jwt = "admin"//localStorage.token;
        this.div_key = Date.now();
        this.ip = require('../server.json').ip;
        this.nll = require("../images/chibi.jpg");
        this.state = {};
        console.log('hi');
    }
    
    componentDidMount(){
        this.page_handler();
    }

    page_handler(){
        console.log(document.getElementById('navMenu'+this.div_key));
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(this.nav_constructor(), document.getElementById('navMenu'+this.div_key))
    }

    render() {
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
                        <div id={"navMenu"+this.div_key} className="navbar-menu"></div>
                    </div>
                </nav>
                <div id={"cont"+this.div_key} className="container"></div>
            </section>
        )
    }

    nav_constructor(){
        var element1 = (
            <div className="navbar-end">
                <div className="control is-small has-icons-right search-margin">
                    <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" /*onChange={this.searchHandle}*/ /*onKeyDown={(e) => this.keyHandle(e)}*//>
                    <span className="icon is-small is-right">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
                <button className="navbar-item nav-color " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox redirectHandler={() => this.props.history.push('/notification')}/></button>
                <button className="navbar-item nav-color " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></button>
                <button className="navbar-item nav-color " style={{color:this.state.other_page}} id='/search' onClick={this.redirecthandler}>Search</button>
                <button className="navbar-item nav-color " style={{color:this.state.curr_page}} id='/user' onClick={this.redirecthandler}>Profile</button>
                <button className="navbar-item nav-color " style={{color:this.state.other_page}} id='/edit' onClick={this.redirecthandler}>Profile Editor</button>
                <button className="navbar-item nav-color " style={{color:this.state.other_page}} id='/logout' onClick={this.redirecthandler}>Logout</button>
            </div>
        )
        return(element1);
    }
}