import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import axios from 'axios';
import { func } from 'prop-types';
import { getJwt } from "./auth/jwt-helper.js";

var ip = require("../server.json").ip;
console.log(ip);
var sesh = "meave@gmail.com";
var token = "admin";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var nll = require("../images/err.jpg");

export default class cons extends Component {
      saveMsg = (msg) => this.setState({
        chat: [
          ...this.state.chat,
          msg
        ]
      })
    

    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            name: '',
            last: '',
            bio: '',
            ag: 0,
            tags: '#urmomlol',
            display: load,
            display2: load2,
            chat: []
        }
    }

    componentDidMount () {
        var name = "Shane";
        axios.post(ip+"/users/get_spec", {"email": sesh, "target":"name last img.img1", "token" : token}).then(res => {
            console.log(res);
            if (res.data == "invalid token"){
                return (window.location.href = ip+"/home");
            }
            else if (res.data[0].name){
                this.setState({
                    name: res.data[0].name,
                    last: res.data[0].last,
                    display: res.data[0].img.img1,
                    bio: res.data[0].bio
                });
            }
            console.log("this "+ this.state.img5);
        });
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
                        <div className="control is-small has-icons-right search-margin">
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <Link to="/" className="navbar-item has-text-info">Home</Link>
                        <Link to="/user" className="navbar-item has-text-info">Profile</Link>
                        <Link to="/edit" className="navbar-item has-text-info">Profile Editor</Link>
                        <Link to="/logout" className="navbar-item has-text-info">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
        {/* <div className="container"> */}
            <div className="columns is-centered shadow">
                <div className="columns bg_white">
                    <div className="column left">
                        <article className="media center">
                            <figure className="media-left">
                                <figure className="image is-64x64">
                                    <img alt="Asuna" src={this.state.display} />
                                </figure>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{this.state.name}</strong> <a>{this.state.last}</a><br />
                                        <span className="has-text-grey">{this.state.tags}<br />
                                        <time datetime="2018-04-20">Apr 20</time> · 20 min read</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="column">
                        <article className="media center">
                            <figure className="media-left">
                                <figure className="image is-64x64">
                                    <img alt="Asuna" src={this.state.display} />
                                </figure>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{this.state.name}</strong> <a>{this.state.last}</a><br />
                                        <span className="has-text-grey">{this.state.tags}<br />
                                        <time datetime="2018-04-20">Apr 20</time> · 20 min read</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                        
                    </div>


                    </div>
                </div>


                            <div className="hero-body">
                            <Messages chat={this.state.chat} />
                            </div>
                            <div className="hero-foot">
                            <footer className="section is-small">
                                <Chat saveMsg={this.saveMsg} />
                            </footer>
                            </div>




                    
        {/* </div> */}
    </section>
        )
    }
}

const Chat = ({ saveMsg }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      saveMsg(e.target.elements.userInput.value);
      e.target.reset();
    }}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" name="userInput" type="text" placeholder="Type your message" />
        </div>
        <div className="control">
          <button className="button is-info">
            Send
          </button>
        </div>
      </div>
    </form>
  );
  
  const Messages = ({ chat }) => (
    <div className="chat-box">
      {chat.map((m, i) => {
        const msgClass = i === 0 || i % 2 === 0 // for demo purposes, format every other msg
        return (
          <p style={{ padding: '.25em', textAlign: msgClass ? 'left' : 'right', overflowWrap: 'normal' }}>
            <span key={i} className={`tag chat-wrap ${msgClass ? 'is-success' : 'is-info'}`}>{m}</span>
          </p>
        )}
      )}
    </div>
  );