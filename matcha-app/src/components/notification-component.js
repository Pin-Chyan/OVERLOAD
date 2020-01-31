import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Inbox from './message-and-notification';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Notifications extends Component {
    constructor(props){
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
        this.nll = require("../images/chibi.jpg");
        this.pos = 0;
        this.state = {}
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            ///      <<<< begin binding after database online >>>>
            this.busy = 0;
            this.curr_page = [0,0,0];
            this.other_page = [0,0,0];
            this.state = {
                "user" : res,
                "checked": false
            }
            if (this.props.location.user){
                this.setState({"user":this.props.location.user});
                this.eve_mount();
            }
            else
                this.userData_getter();
        }).catch(err => {console.log('eve redirect' + err)});
    }
    userData_getter(){
        async function get_data(email,jwt,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img likes liked viewed gender ping sexual_pref fame").then(userGet_res => {
                this.setState({"user":userGet_res[0]});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount(){
        this.page_handler()
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler () {
      const nav_bar = this.nav_constructor()
      const cont = this.mid_constructor()
      if (document.getElementById('navMenu'+this.div_key))
          ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key))
      if (document.getElementById('cont'+this.div_key))
          ReactDOM.render(cont, document.getElementById('cont'+this.div_key))
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

    redirecthandler = e => {
        this.props.history.push({
            pathname:e.target.id
            // user: this.state.user
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
                user: this.state.user,
                search_in: search_input 
            });
        }
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
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
                    <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
                    <span className="icon is-small is-right">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
                <button className="navbar-item " style={{color:this.state.other_page}}><Inbox redirectHandler={() => this.props.history.push('/notification')} /></button>
                <button className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i class="fa fa-comments" id="/mychats"></i></button>
                <button className="navbar-item " style={{color:this.state.other_page}} id='/' onClick={this.redirecthandler}>Home</button>
                <button className="navbar-item " style={{color:this.state.curr_page}} id='/user' onClick={this.redirecthandler}>Profile</button>
                <button className="navbar-item " style={{color:this.state.other_page}} id='/edit' onClick={this.redirecthandler}>Profile Editor</button>
                <button className="navbar-item " style={{color:this.state.other_page}} id='/logout' onClick={this.redirecthandler}>Logout</button>
            </div>
        )
        return(element1);
    }

    get_notifications(notifications_array) {
      if (notifications_array.length) {
        return notifications_array.map((item) => {
          return <div>{item.message}</div>
        })
      } else {
        return <div>No messages yet...</div>
      }
    }

    update_notifications () {

      async function readNotifications(email,jwt,ip){
        let promise = await axios.post(ip + '/inbox/viewNotifications', { "email": email }, { headers: { authorization: `bearer ${jwt}` } });
        if (promise.status === 200) {
          return (promise.data)
        }
      }

      if (document.getElementById('notifications'+ this.div_key)){
        readNotifications(this.state.user.email, this.jwt, this.ip).then(res => {
        })
        ReactDOM.render(this.get_notifications(JSON.parse(localStorage.notify)), document.getElementById('notifications' + this.div_key));
      }
      this.sleep(100).then(() => {
        this.update_notifications()
      })
    }

    mid_constructor(data){
        return (
            <div className="column is-centered shadow">
                <div className="column is-half bg_white_4">
                    <div className="column center" id={"notifications"+this.div_key}>
                      {this.update_notifications()}
                    </div>
                </div>
            </div>
        )
    }
}
