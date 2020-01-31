import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Inbox from './message-and-notification';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Profile = props => {
  return (
    <article className="media center">
      <figure className="media-left">
        <figure className="image is-64x64">
          <img className="image is-64x64 m-scale" src={props.img} alt="img of personal"/>
        </figure>
      </figure>
      <div className="media-content">
        <div className="content">
              <button onClick={props.handleClick}>
              <strong>{props.name} {props.last}</strong><br />
              <time dateTime='2018-04-20'>{props.ping === 0 && <span>last online: <span style={{color: 'red'}}>never</span></span>}</time>
              <time dateTime='2018-04-20'>{(((Date.now() - props.ping) <= 60000) && (props.ping !== 0))&& <strong style={{color: 'green'}}>Online</strong>}</time>
              <time dateTime='2018-04-20'>{(((Date.now() - props.ping) > 60000) && (props.ping !== 0)) && <strong>last online: {props.Fdate(props.ping)}</strong>}</time>
            </button>
        </div>
      </div>
    </article>
  )
}

export default class ChatPage extends Component {
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
              "chats": undefined

          }
          if (this.props.location.user && this.props.location.user.chatrooms){
              this.setState({"user":this.props.location.user});
              this.getChats();
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
      get_data(this.state.user.email,this.jwt,this.ip,"chatrooms viewed liked name gender sexual_pref ping last img bio tag email fame").then(userGet_res => {
              this.setState({"user":userGet_res[0]});
              this.getChats()
              
      }).catch(err => {this.props.history.push('/logout')})
  }

  getChats () {
    async function getChatsData (ip, token, chatrooms) {
      const promises = []
      for (let userid of chatrooms) {
        const content = await axios.post(ip + '/users/get_soft_by_id', { id: userid , target: 'name last img email ping' }, { headers: { authorization: `bearer ${token}` } })
        promises.push(content.data)
      }
      return promises
    }

    getChatsData(this.ip, this.jwt, this.state.user.chatrooms).then(res => {
      this.setState({ chats: res})
      this.eve_mount()
    }).catch(err => {this.props.history.push('/logout')})
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
    const chats = this.chatContructor()
    if (document.getElementById('navMenu'+this.div_key))
        ReactDOM.render(nav_bar, document.getElementById('navMenu'+this.div_key))
    if (document.getElementById('cont'+this.div_key))
        ReactDOM.render(cont, document.getElementById('cont'+this.div_key))
    if (document.getElementById('chats'+this.div_key))
        ReactDOM.render(chats, document.getElementById('chats'+this.div_key))
      //this.userData_getter(1);
      this.notification_updater();
      var burger = document.querySelector('.burger');
      var nav = document.querySelector('#'+burger.dataset.target+this.div_key);
      burger.addEventListener('click', function(){
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
      })
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

  redirecthandler = e => {
    if (e.target.id === '/logout') window.location.replace('/logout');
    else this.props.history.push({pathname:e.target.id});
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
          })
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
              <button className="navbar-item nav-color" style={{color:this.state.other_page}} ><Inbox redirectHandler={() => this.props.history.push('/notification')}/></button>
              <button className="navbar-item nav-color" style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></button>
              <button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/' onClick={this.redirecthandler}>Home</button>
              <button className="navbar-item nav-color" style={{color:this.state.curr_page}} id='/user' onClick={this.redirecthandler}>Profile</button>
              <button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/edit' onClick={this.redirecthandler}>Profile Editor</button>
              <button className="navbar-item nav-color" style={{color:this.state.other_page}} id='/logout' onClick={this.redirecthandler}>Logout</button>
          </div>
      )
      return(element1);
  }

  getFormatedDate (ping) {
    const currDate = new Date(ping)
    let formattedDate = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" 
    + currDate.getDate() + " " + currDate.getHours() + ":" + currDate.getMinutes() + ":" 
    + currDate.getSeconds()
    return formattedDate
  }

  chatContructor () {
    if (Array.isArray(this.state.chats) && this.state.chats.length) {
      return this.state.chats.map(room => {
        let img = room.img.img1 === 'null' ? this.nll : room.img.img1
        return <Profile ping={room.ping} Fdate={this.getFormatedDate} img={img} name={room.name} last={room.last} handleClick={() => { this.props.history.push('/chat/'+room.email) }} />
      })
    } else {
      return <div>No chats yet...</div>
    }
  }

  mid_constructor(data){
      return (
          <div className="column is-centered shadow">
              <div className="column is-half bg_white_4">
                  <div className="column center" id={'chats'+this.div_key}>
                  </div>
              </div>
          </div>
      )
  }
}