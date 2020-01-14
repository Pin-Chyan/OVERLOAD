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

export default class test extends Component {
    state = {
        chat: ['hello', 'hi!', 'do you want to chat?']
      }
    
      saveMsg = (msg) => this.setState({
        chat: [
          ...this.state.chat,
          msg
        ]
      })
    
      render() {
        return (
          <section className="hero is-fullheight">
            
            <div className="hero-head">
              <header className="hero is-link is-bold">
                <div className="hero-body">
                  <div className="container">
                    <p className="title">
                      Chat Messenger
                    </p>
                    <p className="subtitle">
                      With React + Bulma
                    </p>
                  </div>
                </div>
              </header>
            </div>
    
            <div className="hero-body">
              <Messages chat={this.state.chat} />
            </div>
    
            <div className="hero-foot">
              <footer className="section is-small">
                <Chat saveMsg={this.saveMsg} />
              </footer>
            </div>
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
      <div style={{ heigth: '100%', width: '100%' }}>
        {chat.map((m, i) => {
          const msgClass = i === 0 || i % 2 === 0 // for demo purposes, format every other msg
          return (
            <p style={{ padding: '.25em', textAlign: msgClass ? 'left' : 'right', overflowWrap: 'normal' }}>
              <span key={i} className={`tag is-medium ${msgClass ? 'is-success' : 'is-info'}`}>{m}</span>
            </p>
          )}
        )}
      </div>
    );
    