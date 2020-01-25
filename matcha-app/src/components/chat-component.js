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

var load = require("../images/load.gif");

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
                // console.log(this.props.location.user);
                this.setState({"user":this.props.location.user});
                this.external_data1();
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
        get_data(this.state.user.email,this.jwt,this.ip,"_id name email last bio tag img").then(userGet_res => {
            this.setState({"user":userGet_res[0]});
            console.log(userGet_res[0]);
            this.external_data1();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    external_data1(){
        async function get_targetId(ip,target_email,email,jwt){
            let promise = await axios.post(ip+"/users/get_soft",{"token":jwt,"email":email,"target_email":target_email, "target":"_id name last email img.img1"})
            if (promise.status === 200)
                return promise.data;
        }
        console.log('pulling externals........');
        console.log(this.props.location.data);
        if (this.props.match.params.target === 'new'){
            if (!this.props.location.data){
                this.props.history.push({
                    pathname: '/',
                    user: this.state.user
                })
            }
            else if (this.props.match.params.target === 'new') {
                get_targetId(this.ip,this.props.location.data,this.state.user.email,this.jwt).then(res => {
                    console.log(res);
                    this.setState({
                        "target":res
                    })
                    this.external_data2();
                }).catch(err => {console.log('eve redirect ' + err)})
            }
            else {
                get_targetId(this.ip,this.props.match.params.target,this.state.user.email,this.jwt).then(res => {
                    console.log(res);
                    this.setState({
                        "target":res
                    })
                    this.eve_mount();
                }).catch(err => {console.log('eve redirect ' + err)})
            }
        } else {
            console.log('existing chat room')
            get_targetId(this.ip,this.props.match.params.target,this.state.user.email,this.jwt).then(res => {
                console.log(res);
                this.setState({
                    "target":res
                })
                this.external_data2();
                // this.eve_mount();
            }).catch(err => {console.log('eve redirect ' + err)})
        }
    }
    external_data2(){
        console.log('room');
        async function newroom(email,jwt,id1,id2,ip){
            let promise = await axios.post(ip + "/chats/newroom",{"email":email,"token":jwt,"id1":id1,"id2":id2});
            if (promise.status === 200)
                return (promise.data);
        }
        newroom(this.state.user.email,this.jwt,this.state.user._id,this.state.target._id,this.ip).then(room => {
            console.log(room);
            this.setState({"chatroom":room});
            this.eve_mount();
        }).catch(err => {console.log('eve redirect ' + err)})
    }
    eve_mount(){
        console.log('render');
        this.page_handler();// exit node
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler(){
        var nav_bar = this.nav_constructor(1);
        var user = this.userDisplay_constructor();
        var msgBox = this.msgBox_constructor();
        var user = this.userDisplay_constructor();
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key)); 
        if (document.getElementById('user_display_header'+this.div_key))
            ReactDOM.render(user, document.getElementById('user_display_header'+this.div_key));
        if (document.getElementById('message foot'+this.div_key))
            ReactDOM.render(msgBox, document.getElementById('message foot'+this.div_key));
        if (document.getElementById('user_display_header'+this.div_key))
            ReactDOM.render(user, document.getElementById('user_display_header'+this.div_key));
        this.get_id();
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
    msghandle = e => {
        this.setState({newmsg:e.target.value});
        console.log(this.state.newmsg);
        console.log(e.target.value);
    }
    sendhandle = e => {
        console.log('sending..........');
            async function post_msg(ip,email,jwt,room,target,msg){
                let promise = await axios.post(ip+"/chats/msg", {"email":email,"target":target,"token":jwt,"room":room,"msg":msg});
                if (promise.status === 200)
                    return promise.data;
            }
            console.log(this.state.chatroom);
            post_msg(this.ip,this.state.user.email,this.jwt,this.state.chatroom, this.state.target.email,this.state.newmsg).then(res => {
                console.log(res);
            }).catch(err => 'eve redirect '+err)
    }
    get_id() {
		async function get_msg(email, target, jwt, ip){
			let promise = await axios.post(ip+"/chats/get_msg", {"email":email, "target":target, "token":jwt});
			if (promise.status === 200){
                // var data = {};
				// data.chat = promise.data.message;
				return (promise.data);
            }
        }
        // console.log('hi');
        get_msg(this.state.user.email, this.state.target.email, this.jwt, this.ip).then(res => {
            // console.log('refresh');
            console.log(res);
            if (!res){
                this.props.history.push({
                    pathname: '/',
                    user: this.state.user
                })
            }
            if (document.getElementById("msgBox"+this.div_key) && res){
                ReactDOM.render(ReactHtmlParser(this.message_constructor(res.message)), document.getElementById("msgBox"+this.div_key));
                this.sleep(500).then(() => {
                    this.get_id();
                })
            }
        }).catch(err => {
            this.props.history.push({
                pathname: '/',
                user: this.state.user
            })
        })
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< render Return >>>>
//

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
                <div id={"navMenu"+this.div_key} className="navbar-menu"></div>
            </div>
        </nav>
        <div id={"user_display_header"+this.div_key}></div>
        <div className="hero-body"><div id={"msgBox"+this.div_key}className="chat-box">huh</div></div>
        <div id={"message foot"+this.div_key} className="hero-foot"></div>
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
                <a className="navbar-item " style={{color:this.state.curr_page}}   id='/user' onClick={this.redirecthandler}>Profile</a>
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
            <div>
            <br/>
            <div className="columns is-centered shadow">
            <div className="columns bg_white_1">
                {/* <div className="column left">
                    <article className="media center">
                        <figure className="media-left">
                            <figure className="image is-64x64">
                                <img alt="Asuna" src={this.state.user.img.img1} />
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
                </div> */}
                <div className="column">
                    <article className="media center">
                        <figure className="media-left">
                            <figure className="image is-64x64">
                                <img alt="Asuna" src={this.state.target.img.img1} />
                            </figure>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{this.state.target.name}</strong> <a>{this.state.target.last}</a><br />
                                    <span><time dateTime="2018-04-20"></time> target</span>
                                </p>
                            </div>
                        </div>
                    </article>
                    
                </div>
                </div>
            </div>
            </div>
        )
    }
    message_constructor(msg_data){
        var r_element1 = "<p class='has-text-right'>";
        var r_element2 = "<span class='tag chat-wrap is-info right_m'>";
        var r_element3 = "</span></p>";
        var l_element1 = "<p class='has-text-left'>";
        var l_element2 = "<span class='tag chat-wrap is-success left_m'>";
        var l_element3 = "</span></p>";
        var i = 0;
        var max = msg_data.length;
        var res = '';

        while(i < max){
            if (msg_data[i].author != this.state.user.email)
                var res = res+r_element1+r_element2+this.state.target.name+"\ "+msg_data[i].msg+r_element3;
            else
                var res = res+l_element1+l_element2+this.state.user.name+"\ "+msg_data[i].msg+l_element3;
            i++;
        }
        return (res);
    }
    msgBox_constructor(){
        return (
          <div className="field has-addons">
            <div className="control chat-t">
              <input className="input" type="text" placeholder="Type your message" onChange={this.msghandle}  /*onKeyDown={(e) => this.sendhandle(e)}*//>
            </div>
            <div className="control chat-e">
                <button className="button is-info" onClick={e => this.sendhandle(e)}>Send</button>
            </div>
        </div>
        )
    }
}
