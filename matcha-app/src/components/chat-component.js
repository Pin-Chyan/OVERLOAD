import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactDOM from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";
import axios from 'axios';
import Inbox from './message-and-notification';

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
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
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
                this.external_data1();
            }
            else
                this.userData_getter();
        }).catch(err => {console.log('eve redirect' + err)});
    }
    userData_getter(){
        async function get_data(email,jwt,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"_id name email last likes liked gender bio tag img liked sexual_pref viewed fame ping").then(userGet_res => {
            this.setState({"user":userGet_res[0]});
            this.external_data1();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    external_data1(){
        async function get_targetId(ip,target_email,email,jwt){
            let promise = await axios.post(ip+"/users/get_soft",{"token":jwt,"email":email,"target_email":target_email, "target":"_id name last email img.img1 ping"})
            if (promise.status === 200)
                return promise.data;
        }
        if (this.props.match.params.target === 'new'){
            if (!this.props.location.data){
                this.props.history.push({
                    pathname: '/',
                    user: this.state.user
                })
            }
            else if (this.props.match.params.target === 'new') {
                get_targetId(this.ip,this.props.location.data,this.state.user.email,this.jwt).then(res => {
                    this.setState({
                        "target":res
                    })
                    this.external_data2();
                }).catch(err => {console.log('eve redirect ' + err)})
            }
            else {
                get_targetId(this.ip,this.props.match.params.target,this.state.user.email,this.jwt).then(res => {
                    this.setState({
                        "target":res
                    })
                    this.eve_mount();
                }).catch(err => {console.log('eve redirect ' + err)})
            }
        } else {
            get_targetId(this.ip,this.props.match.params.target,this.state.user.email,this.jwt).then(res => {
                this.setState({
                    "target":res
                })
                this.external_data2();
            }).catch(err => {console.log('eve redirect ' + err)})
        }
    }
    external_data2(){
        async function newroom(email,jwt,id1,id2,ip){
            let promise = await axios.post(ip + "/chats/newroom",{"email":email,"token":jwt,"id1":id1,"id2":id2});
            if (promise.status === 200)
                return (promise.data);
        }
        newroom(this.state.user.email,this.jwt,this.state.user._id,this.state.target._id,this.ip).then(room => {
            if (this.props.match.params.target === 'new'){
                this.props.history.push({
                    pathname : '/chat/'+this.state.target.email,
                    user : this.state.user
                });
            }
            this.setState({"chatroom":room});
            this.eve_mount();
        }).catch(err => {console.log('eve redirect ' + err)})
    }
    eve_mount(){
        this.page_handler();// exit node
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler(){
        var nav_bar = this.nav_constructor(1);
        var user = this.userDisplay_constructor();
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key)); 
        if (document.getElementById('user_display_header'+this.div_key))
            ReactDOM.render(user, document.getElementById('user_display_header'+this.div_key));
        // if (document.getElementById('message foot'+this.div_key))
        //     ReactDOM.render(msgBox, document.getElementById('message foot'+this.div_key));
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
        if (e.key === 'Enter'){
            var search_input = 'null';
            if (this.state.search){
                if (this.state.search.trim() !== '')
                    search_input = this.state.search;
            }
            this.props.history.push({
                pathname: '/search',
                // user: this.state.user,
                search_in: search_input 
            });
        }
    }
    msghandle = e => {
        this.setState({newmsg:e.target.value});
    }
    sendhandle = e => {
        var newmsg = this.state.newmsg;
        this.setState({"newmsg":''});
        async function post_msg(ip,email,jwt,room,target,msg){
            let promise = await axios.post(ip+"/chats/msg", {"email":email,"target":target,"token":jwt,"room":room,"msg":msg});
            if (promise.status === 200)
            return promise.data;
        }
        post_msg(this.ip,this.state.user.email,this.jwt,this.state.chatroom, this.state.target.email,newmsg).then(res => {
        }).catch(err => 'eve redirect '+err)
    }
    get_id() {
		async function get_msg(email, target, jwt, ip){
			let promise = await axios.post(ip+"/chats/get_msg", {"email":email, "target":target, "token":jwt});
			if (promise.status === 200){
				return (promise.data);
            }
        }
        get_msg(this.state.user.email, this.state.target.email, this.jwt, this.ip).then(res => {
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

    getFormatedDate (ping) {
      const currDate = new Date(ping)
      let formattedDate = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" 
      + currDate.getDate() + " " + currDate.getHours() + ":" + currDate.getMinutes() + ":" 
      + currDate.getSeconds()
      return formattedDate
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
        <div className="hero-body"><div id={"msgBox"+this.div_key}className="chat-box"></div></div>
        <div id={"message foot"+this.div_key} className="hero-foot">          <div className="field has-addons">
            <div className="control chat-t">
              <input className="input" type="text" placeholder="Type your message" value={this.state.newmsg} onChange={this.msghandle}  /*onKeyDown={(e) => this.sendhandle(e)}*//>
            </div>
            <div className="control chat-e">
                <button className="button is-info" onClick={e => this.sendhandle(e)}>Send</button>
            </div>
        </div></div>
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
                <button className="navbar-item " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox redirectHandler={() => this.props.history.push('/notification')}/></button>
                <button className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i class="fa fa-comments" id="/mychats"></i></button>
                <button className="navbar-item " style={{color:this.state.other_page}}  id='/' onClick={this.redirecthandler}>Home</button>
                <button className="navbar-item " style={{color:this.state.curr_page}}   id='/user' onClick={this.redirecthandler}>Profile</button>
                <button className="navbar-item " style={{color:this.state.other_page}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</button>
                <button className="navbar-item " style={{color:this.state.other_page}}  id='/logout' onClick={this.redirecthandler}>Logout</button>
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
                <div className="columns is-centered shadow">
                    <div className="columns bg_white_1">
                        <div className="column">
                            <article className="media center">
                                <figure className="media-left">
<<<<<<< HEAD
                                    <figure>
                                        <img className="image is-64x64 contain" alt="Asuna" src={this.state.target.img.img1} />
=======
                                    <figure className="image is-64x64">
                                        <img className="image is-64x64 adjust" alt="Asuna" src={this.state.target.img.img1} />
>>>>>>> 90f7b55b2e30d9284fbde9028f42db5b8824eb3d
                                    </figure>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
<<<<<<< HEAD
                                            <strong>{this.state.target.name}</strong> <a>{this.state.target.last}</a><br />
=======
                                            <strong>{this.state.target.name}</strong> <button>{this.state.target.last}</button><br />
>>>>>>> 90f7b55b2e30d9284fbde9028f42db5b8824eb3d
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
    
    message_constructor(msg_data) {
        var r_element1 = "<p class='has-text-right'>";
        var r_element2 = "<span class='tag chat-wrap is-info right_m'>";
        var r_element3 = "</span></p>";
        var l_element1 = "<p class='has-text-left'>";
        var l_element2 = "<span class='tag chat-wrap is-success left_m'>";
        var l_element3 = "</span></p>";
        var i = 0;
        var max = msg_data.length;
        var result = '';

        while (i < max) {
            if (msg_data[i].author !== this.state.user.email)
                result = result + r_element1 + r_element2 + this.state.target.name + "\" " + msg_data[i].msg + r_element3;
            else
                result = result + l_element1 + l_element2 + this.state.user.name + "\" " + msg_data[i].msg + l_element3;
            i++;
        }
        return (result);
    }
    msgBox_constructor() {
        return (
            <div className="field has-addons">
                <div className="control chat-t">
                    <input className="input" type="text" placeholder="Type your message" onChange={this.msghandle}  /*onKeyDown={(e) => this.sendhandle(e)}*/ />
                </div>
                <div className="control chat-e">
                    <button className="button is-info" onClick={e => this.sendhandle(e)}>Send</button>
                </div>
            </div>
        )
    }
}