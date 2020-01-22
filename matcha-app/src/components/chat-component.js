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
var sesh = undefined;
var target = "solivari@gmail.com";
var token = "admin";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var nll = require("../images/err.jpg");

//////////        <<Liam>>       //////////////
// create a button on the home page that only renders
// if the person is liked, the button will take you to
// the /chat page for that person, the button needs to be able
// to send the email of the person you wish to chat with
// to the chats page so that i can set the global variable
// target equal to it before the page loads anything else.

export default class cons extends Component {

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Eve protocol >>>>
//

    // constructor(props){
    //     super(props);
    //     this.componentDidMount = this.componentDidMount.bind(this);
    //     this.get_id = this.get_id.bind(this);
    //     this.saveMsg = this.saveMsg.bind(this);
    //     this.message_constructor = this.message_constructor.bind(this);
    //     this.jwt = localStorage.token;
    //     this.state = {
    //         name: '',
    //         last: '',
    //         email: '',
    //         bio: '',
    //         _id1:'',
    //         _id2: '',
    //         target: {},
    //         ag: 0,
    //         tags: '#tags',
    //         display: load,
    //         display2: load2,
    //         msg: ["shit"]
    //     }
    // }
    
    constructor(props){
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
        this.state = {};
        console.log(this.ip);
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            console.log('eve online');
            ///      <<<< begin binding after database online >>>>
            this.eve_mount = this.eve_mount.bind(this);
            this.userData_getter = this.userData_getter.bind(this);
            this.page_handler = this.page_handler.bind(this);
            this.searchHandle = this.searchHandle.bind(this);
            this.busy = 0;
            this.curr_page = [0,0,0];
            this.other_page = [0,0,0];
            this.state = {
                "res" : '',
                "html" : '',
                "user" : res
            };
            if (this.props.location.user){
                this.setState({"user":this.props.location.user});
                this.eve_mount();
            }
            else
                this.userData_getter();
        }).catch(err => {console.log('eve redirect' + err)});
    }
    userData_getter(){
        console.log('getting data......');
        async function get_data(email,jwt,ip,target){
            console.log(email);
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img").then(userGet_res => {
                this.setState({"user":userGet_res[0]});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount(){
        console.log('render');
        this.page_handler();
    }
    // eve_mount(){
    //     const jwt = localStorage.token;
    //     console.log(jwt);
    //     async function get_userdata(){
    //         if (jwt) {
    //             let prom = await axios.post(ip+"/users/getEmail", {} ,{ headers: { Authorization: `bearer ${jwt}` } });
    //             if (prom.status === 200){
    //                 console.log(prom.data.email);
    //                 sesh = prom.data.email;
    //                 return (sesh);
    //             }
    //         } else {
    //             return ("error");
    //         }
    //         console.log(sesh);
    //     }
    //     get_userdata().then(res => {
    //         console.log(res);
    //         if (res !== "error"  || res != "invalid token")
    //             console.log('got data');// this.get_id();
    //         else
    //             this.props.history.push('/logout');
    //         this.page_handler();
    //     });
    // }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler(){
        var nav_bar = this.nav_constructor(1);
        var msgBox = this.msgBox_constructor();
        if (document.getElementById('navMenu'))
            ReactDOM.render(nav_bar, document.getElementById('navMenu')); 
        if (document.getElementById('message foot'))
            ReactDOM.render(msgBox, document.getElementById('message foot'));
        // this.get_id();
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

    redirecthandler = e => {
        this.props.history.push({
            pathname:e.target.id,
            user: this.state.user
        });
    }

    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    keyHandle = e => {
        if (e.key == 'Enter'){
            var search_input = 'null';
            if (this.state.search){
                if (this.state.search.trim() != '')
                    search_input = this.state.search;
            }
            this.props.history.push({
                pathname: '/search',
                user: this.state.user,
                search_in: search_input 
            });
        }
    }
    saveMsg(msg){
            async function post_msg(obj){
                console.log(obj);
                let ret = await axios.post(ip+"/chats/msg", obj);
                if (ret.status === 200)
                    console.log("msg saved");
            }
            var data = {};
            data.email = this.state.email;
            data.target = this.state.target.email;
            data.msg = msg;
            data.token = token;
            post_msg(data)
    }
    
    get_id() {
        async function get_id1(jwt){
            let res = await axios.post(ip+"/users/get_spec", {"email": sesh, "target":"_id name last img.img1 email"}, { headers: { Authorization: `bearer ${jwt}` } });
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
                    data.email = res.data[0].email;
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
        async function get_id2(jwt){
            let docs = await axios.post(ip+"/users/get_spec", {"email": target, "target":"_id name last img.img1"}, { headers: { Authorization: `bearer admin` } });
            console.log(docs);
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
		async function get_msg(target, jwt){
			let promise = await axios.post(ip+"/chats/get_msg", {"email":sesh, "target":target, "token":jwt});
			if (promise.status === 200){
                var data = {};
				data.chat = promise.data.message;
				return (data);
            }
        }

	/////////////////////		<<<<<<Get the messages for the chat>>>>>>			/////////////////////
		get_id1(this.jwt).then(ret => {
			this.setState(ret);
			get_id2(this.jwt).then(doc => {
				this.setState(doc);
                setInterval(() => {
                        get_msg(target, this.jwt).then(res => {
                        console.log(res);
                        var msg = res.chat;
                        this.state.msg = msg;
                        console.log(this.state.msg);
                        var stuff = this.message_constructor();
                        ReactDOM.render(ReactHtmlParser(stuff), document.getElementById("msgBox"));
                    })
				}, 100)
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
                <div id="navMenu" className="navbar-menu"></div>
            </div>
        </nav>
        <div id="user_display_header"></div>
        <div className="hero-body"><div id="msgBox" className="chat-box"></div></div>
        <div id="message foot" className="hero-foot"></div>
        </section>
        )
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Constructor Functions >>>>
//

    nav_constructor(render){
        var element1 = (
            <div  className="navbar-end">
                <div className="control is-small has-icons-right search-margin" >
                    <input id="in" className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
                        <span id="span" className="icon is-small is-right" >
                            <i id="image" className="fa fa-search"></i>
                        </span>
                </div>
                <a className="navbar-item " style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</a>
                <a className="navbar-item " style={{color:this.state.curr_page}}  id='/user' onClick={this.redirecthandler}>Profile</a>
                <a className="navbar-item " style={{color:this.state.other_page}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
                <a className="navbar-item " style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
            </div>
        )
        if (render)
            return element1;
        else
            return <div/>;
    }
    userDisplay_constructor(){
        return (
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
        )
    }
    message_constructor(){
        var r_element1 = "<p class='has-text-right'>";
        var r_element2 = "<span class='tag chat-wrap is-info right'>";
        var r_element3 = "</span></p>";
        var l_element1 = "<p class='has-text-left'>";
        var l_element2 = "<span class='tag chat-wrap is-success left'>";
        var l_element3 = "</span></p>";
        var i = 0;
        var max = this.state.msg.length;
        var res = '';

        while(i < max){
            var msg = this.state.msg;
            var author = this.state.msg[i].author;
            if (author != this.state.name)
                var res = res+r_element1+r_element2+author+"\ "+msg[i].msg+r_element3;
            else
                var res = res+l_element1+l_element2+author+"\ "+msg[i].msg+l_element3;
            i++;
        }
        return (res);
    }
    msgBox_constructor(){
        return (
          <div className="field has-addons">
            <div className="control chat-t">
              <input className="input" name="userInput" type="text" placeholder="Type your message" />
            </div>
            <div className="control chat-e">
                <button className="button is-info">Send</button>
            </div>
        </div>
        )
    }
    // Chat = ({ saveMsg }) => (
    //     <form onSubmit={(e) => {
    //       e.preventDefault();
    //       saveMsg(e.target.elements.userInput.value);
    //       e.target.reset();
    //     }}>
    //       <div className="field has-addons">
    //         <div className="control chat-t">
    //           <input className="input" name="userInput" type="text" placeholder="Type your message" />
    //         </div>
    //         <div className="control chat-e">
    //           <button className="button is-info">
    //             Send
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   )


}
