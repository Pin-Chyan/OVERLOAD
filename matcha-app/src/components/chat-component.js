import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import ReactDOM from 'react-dom'
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
var sesh = "solivari@gmail.com";
var target = "lkrielin@gmail.com";
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
        this.get_id = this.get_id.bind(this);
        this.messages = this.messages.bind(this);
        this.jwt = localStorage.token;
        this.state = {
            name: '',
            last: '',
            bio: '',
            _id1:'',
            _id2: '',
            target: {},
            ag: 0,
            tags: '#tags',
            display: load,
            display2: load2,
            msg: ["shit"]
        }
    }

    componentDidMount () {
        this.get_id();
    }

    get_id() {
        async function get_id1(jwt){
            let res = await axios.post(ip+"/users/get_spec", {"email": sesh, "target":"_id name last img.img1", "token" : token});
            if (res.status === 200){
                if (res.data == "invalid token"){
                    return (window.location.href = ip+"/home");
                }
                else {
                    var data = {};
                    data.img = {};
                    data._id1 = res.data[0]._id;
                    data.name = res.data[0].name;
                    data.last = res.data[0].last;
                    if (res.data[0].img.img1 == "null")
                        data.display = nll;
                    else
                        data.display = res.data[0].img.img1;
                   	return (data);
                }
            }
            else 
                console.log("error");
        }
        async function get_id2(){
            let docs = await axios.post(ip+"/users/get_spec", {"email": target, "target":"_id name last img.img1", "token" : token});
            if (docs.status === 200){
                if (docs.data[0].name){
                    var set = {};
                    set.target = {};
                    set._id2 = docs.data[0]._id;
                    set.target.name = docs.data[0].name;
                    set.target.last = docs.data[0].last;
                    if (docs.data[0].img.img1 && docs.data[0].img.img1 != "null")
                        set.target.display = docs.data[0].img.img1;
                    else 
                        set.target.display = nll;
                    set.target.email = target;
                    console.log(set);
                    return (set);
                }
            }
            else
                console.log("error");
		}
		async function get_msg(target){
			console.log("inside get_msg");
			let promise = await axios.post(ip+"/chats/get_msg", {"email":sesh, "target":target, "token":token});
			if (promise.status === 200){
				var data = {};
				data.chat = promise.data.message;
				console.log(data.chat);
				return (data);
			}
		}
	/////////////////////		<<<<<<Get the messages for the chat>>>>>>			/////////////////////
		get_id1(this.jwt).then(ret => {
			this.setState(ret);
			get_id2().then(doc => {
				this.setState(doc);
				get_msg(target).then(res => {
					var msg = res.chat;
                    this.state.msg = msg;
                    var stuff = this.messages();
                    ReactDOM.render(ReactHtmlParser(stuff), document.getElementById("fuck you"));
				})
			})
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
                <div className="columns bg_white_1">
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
                                        <span><time dateTime="2018-04-20">Apr 20</time> Author</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="column">
                        <article className="media center">
                            <figure className="media-left">
                                <figure className="image is-64x64">
                                    <img alt="Asuna" src={this.state.target.display} />
                                </figure>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{this.state.target.name}</strong> <a>{this.state.target.last}</a><br />
                                        <span><time dateTime="2018-04-20">Apr 20</time> target</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                        
                    </div>


                    </div>
                </div>


                    <div className="hero-body">
                    <div id="fuck you" className="chat-box">
                    </div>
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

    messages(){
        var element1 = ("<p style={{ padding: '.25em', textAlign: center_b");
        var element2 = ("msgClass: left}}><span style={float: left, overflow-wrap: normal} class={tag chat-wrap ${msgClass:'is-success'}}>");
        var element3 = ("</span></p>");
        var i = 0;
        var max = this.state.msg.length;
        var res = '';
        
        console.log(max);
        console.log(this.state.msg);

        while(i < max){
            var msg = this.state.msg;
            var author = this.state.msg[i].author;
            var res = res+element1+element2+author+msg[i].msg+element3;
            i++;
        }
        return (res);
    }

}

const Chat = ({ saveMsg }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      saveMsg(e.target.elements.userInput.value);
      e.target.reset();
    }}>
      <div className="field has-addons">
        <div className="control chat-t">
          <input className="input" name="userInput" type="text" placeholder="Type your message" />
        </div>
        <div className="control chat-e">
          <button className="button is-info">
            Send
          </button>
        </div>
      </div>
    </form>
  )