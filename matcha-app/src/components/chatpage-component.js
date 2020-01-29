import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Inbox from './message-and-notification';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// List all current chats
  // Get user
  // Pull all chats
  // Display list of chats
// Add to navbar
// Fix no results showing up

export default class ChatPage extends Component {
  constructor(props){
      super(props);
      this.div_key = Date.now();
      this.jwt = localStorage.token;
      this.ip = require('../server.json').ip;
      this.nll = require("../images/chibi.jpg");
      this.pos = 0;
      this.state = {}
      console.log(this.ip);
      async function server_get(ip,jwt){
          let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
          if (promise.status === 200)
              return promise.data;
      }
      server_get(this.ip,this.jwt).then(res => {
          console.log('eve online');
          ///      <<<< begin binding after database online >>>>
          this.busy = 0;
          this.curr_page = [0,0,0];
          this.other_page = [0,0,0];
          this.state = {
              "user" : res,
              "checked": false
          }
          if (this.props.location.user && this.props.location.user.chatrooms){
              console.log('found all the data')
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
              return promise.data
      }
      ///      <<<< target will be customised for each page for optimisation >>>>
      get_data(this.state.user.email,this.jwt,this.ip,"chatrooms").then(userGet_res => {
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
    console.log(this.state.user)
    if (document.getElementById('navMenu'+this.div_key))
        ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key))
    if (document.getElementById('cont'+this.div_key))
        ReactDOM.render(cont, document.getElementById('cont'+this.div_key))
    console.log('render');
      //this.userData_getter(1);
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
              <a className="navbar-item " style={{color:this.state.other_page}} onClick="{}" ><Inbox redirectHandler={() => this.props.history.push('/notification')}/></a>
              <a className="navbar-item " style={{color:this.state.other_page}} id='/' onClick={this.redirecthandler}>Home</a>
              <a className="navbar-item " style={{color:this.state.curr_page}} id='/user' onClick={this.redirecthandler}>Profile</a>
              <a className="navbar-item " style={{color:this.state.other_page}} id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
              <a className="navbar-item " style={{color:this.state.other_page}} id='/logout' onClick={this.redirecthandler}>Logout</a>
          </div>
      )
      return(element1);
  }

  mid_constructor(data){
      return (
          <div className="column is-centered shadow">
              <div className="column is-half bg_white_4">
                  <div className="column center" id={"notifications"+this.div_key}>
                  </div>
              </div>
          </div>
      )
  }
}