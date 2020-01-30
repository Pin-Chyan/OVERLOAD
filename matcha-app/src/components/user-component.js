import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Inbox from './message-and-notification';


var nll = require("../images/chibi.jpg");
   
const Profile = props => {
  return (
    <article className="media center">
      <figure className="media-left">
        <figure className="image is-64x64">
          <img className="image is-64x64 m-scale" alt="Profile picture" src={props.img} />
        </figure>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <a onClick={props.handleClick}>
              <strong>{props.name} </strong>
              <p>{props.last}</p>
            </a>
          </p>
        </div>
      </div>
    </article>
  )
}

const BlockedProfile = props => {
  return (
    <article className="media center">
      <figure className="media-left">
        <figure className="image is-64x64">
          <img className="image is-64x64 m-scale" alt="Profile picture" src={props.img} />
        </figure>
      </figure>
      <div className="media-content">
        <div className="content">
            <div className='button is-rounded is-warning btn-right' onClick={props.unblock}>
              Unblock
            </div>
            <a onClick={props.handleClick}>
              <strong>{props.name} </strong>
              <p>{props.last}</p>
            </a>
        </div>
      </div>
    </article>
  )
}

export default class User extends Component {

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< eve protocol >>>>
//
    constructor(props){
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token
        this.ip = require('../server.json').ip;
        this.state = {
          updating: false
        }
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            ///      <<<< begin binding after database online >>>>
            this.eve_mount = this.eve_mount.bind(this)
            this.userData_getter = this.userData_getter.bind(this)
            this.userHistory_getter = this.userHistory_getter.bind(this)
            this.page_handler = this.page_handler.bind(this)
            this.searchHandle = this.searchHandle.bind(this)
            this.openTab = this.openTab.bind(this)
            this.nll = require("../images/chibi.jpg")
            this.busy = 0;
            this.curr_page = [0,0,0];
            this.other_page = [0,0,0];
            this.state = {
                "res" : '',
                "html" : '',
                "user" : res,
                viewedUsers: null,
                likedUsers: null,
                blockedUsers: null
            }
            if (this.props.location.user && this.props.location.user.liked && this.props.location.user.viewed &&
                this.props.location.user.img && this.props.location.user.blocked) {
                this.setState({"user":this.props.location.user})
                this.userHistory_getter()
            }
            else {
              this.userData_getter()
            }
        }).catch(err => {console.log('eve redirect' + err)});
    }

    userHistory_getter () {
      async function getViewedData (ip, token, viewedArray) {
        const promises = []
        for (let viewer of viewedArray) {
          const content = await Axios.post(ip + '/users/get_soft_by_id', { id: viewer, target: 'name last img' }, { headers: { authorization: `bearer ${token}` } })
          promises.push(content.data)
        }
        return promises
      }
  
      async function getLikedData (ip, token, likedArray) {
        const promises = []
        for (let liked of likedArray) {
          const content = await Axios.post(ip + '/users/get_soft_by_id', { id: liked, target: 'name last img' }, { headers: { authorization: `bearer ${token}` } })
          promises.push(content.data)
        }
        return promises
      }

      async function getBlockedData (ip, token, blockedArray) {
        const promises = []
        for (let userid of blockedArray) {
          const content = await Axios.post(ip + '/users/get_soft_by_id', { id: userid, target: 'name last img email' }, { headers: { authorization: `bearer ${token}` } })
          promises.push(content.data)
        }
        return promises
      }

      async function getAllData (ip, token, likedArray, viewedArray, blockedArray) {
        const viewedRes = await getViewedData(ip, token, viewedArray)
        const likedRes = await getLikedData(ip, token, likedArray)
        const blockedRes = await getBlockedData(ip, token, blockedArray)
        const response = [viewedRes, likedRes, blockedRes]
        return response
      }

      getAllData(this.ip, this.jwt, this.state.user.liked, this.state.user.viewed, this.state.user.blocked).then(res => {
        this.setState({ viewedUsers: res[0], likedUsers: res[1], blockedUsers: res[2] })
        this.eve_mount()
      })
    }

    userData_getter(){
        async function get_data(email,jwt,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"name email last bio tag img viewed liked likes sexual_pref gender blocked").then(userGet_res => {
          this.setState({"user":userGet_res[0]})
          this.userHistory_getter()
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount(){
      this.page_handler()
    }
  
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler(){
        var nav = this.nav_constructor(1);
        var mid = this.mid_constructor(0);
        const viewed = this.viewedConstructor()
        const liked = this.likedConstructor()
        const blocked = this.blockedConstructor()
        if (document.getElementById('navMenu'+this.div_key))
            ReactDOM.render(nav, document.getElementById('navMenu'+this.div_key));
        if (document.getElementById('cont'+this.div_key))
            ReactDOM.render(mid, document.getElementById('cont'+this.div_key));
        if (document.getElementById('viewed'+this.div_key))
            ReactDOM.render(viewed, document.getElementById('viewed'+this.div_key));
        if (document.getElementById('liked'+this.div_key))
            ReactDOM.render(liked, document.getElementById('liked'+this.div_key));
        if (document.getElementById('blocked'+this.div_key))
            ReactDOM.render(blocked, document.getElementById('blocked'+this.div_key));
        this.rgb_phaser([0,0,255,1,0],'other_page','other_page');
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

    rgb_phaser = (altitude,target,state_target) => {
        if (   this[target][0] !== altitude[0] 
            || this[target][1] !== altitude[1]
            || this[target][2] !== altitude[2] ){
            if (this[target][0] !== altitude[0]){
                if (this.toPos(this[target][0] - altitude[0]) < altitude[3])
                    this[target][0] = altitude[0];
                else
                    this[target][0] += this[target][0] > altitude[0] ? -1 * altitude[3] : 1 * altitude[3];
            }
            if (this[target][1] !== altitude[1]){
                if (this.toPos(this[target][1] - altitude[1]) < altitude[3])
                    this[target][1] = altitude[1];
                else
                    this[target][1] += this[target][1] > altitude[1] ? -1 * altitude[3] : 1 * altitude[3];
            }
            if (this[target][2] !== altitude[2]){
                if (this.toPos(this[target][2] - altitude[2]) < altitude[3])
                    this[target][2] = altitude[2];
                else
                    this[target][2] += this[target][2] > altitude[2] ? -1 * altitude[3] : 1* altitude[3];
            }
            altitude[3] += altitude[4];
            this.setState({[state_target]:"rgb(" + this[target][0] + ", " + this[target][1] +", " + this[target][2] + ")"});
            this.sleep(20).then(() => {
                this.rgb_phaser(altitude,target,state_target);
            });
        } else
            console.log("set " + target + " result posted to this.state." + state_target);
    }
    toPos(num){
        if (num < 0)
            return (num * -1);
        else
            return (num);
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Render Return >>>>
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
            <div id={"cont"+this.div_key} className="container"></div>
        </section>
        )
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Contructor Functions >>>>
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
                <a className="navbar-item " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox redirectHandler={() => this.props.history.push('/notification')}/></a>
                 <a className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></a>
                <a className="navbar-item " style={{color:this.state.other_page}} id='/' onClick={this.redirecthandler}>Home</a>
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
//                      <<<< Switch tab function >>>

    openTab = (tabName) => (e) => {
      let tab, tabcontent, link, tablinks

      tabcontent = document.getElementsByClassName('tabcontent')
      for (tab of tabcontent) {
        tab.style.display = "none"
      }

      tablinks = document.getElementsByClassName('tab')
      for (link of tablinks) {
        link.className = link.className.replace("is-active", "")
      }
      document.getElementById(tabName).style.display = "block"
      e.currentTarget.className = 'tab  is-active'
    }

    unblockUser = (email) => e => {
      e.preventDefault()
      async function unblock (ip, token, email, target) {
        const promise = Axios.post(ip+'/users/unblock', { token, email, target })
        if (promise.status === 200) {
          return promise.data
        }
      }
      unblock(this.ip, this.jwt, this.state.user.email, email).then(res => {
      })
    }
        
    viewedConstructor () {
      if (Array.isArray(this.state.viewedUsers) && this.state.viewedUsers.length) {
          return this.state.viewedUsers.map(user => {
            let img = user.img.img1 === 'null' ? this.nll : user.img.img1
            return <Profile img={img} name={user.name} last={user.last} handleClick={() => { this.props.history.push('/profiles/'+user._id) }} />
          })
      } else {
        return <div>Nobody has viewed your profile yet...</div>
      }
    }

    likedConstructor () {
      if (Array.isArray(this.state.likedUsers) && this.state.likedUsers.length) {
        return this.state.likedUsers.map(user => {
          let img = user.img.img1 === 'null' ? this.nll : user.img.img1
          return <Profile img={img} name={user.name} last={user.last} handleClick={() => { this.props.history.push('/profiles/'+user._id) }} />
        })
      } else {
        return <div>Nobody has liked your profile yet...</div>
      }
    }

    blockedConstructor () {
      if (Array.isArray(this.state.blockedUsers) && this.state.blockedUsers.length) {
        return this.state.blockedUsers.map(user => {
          let img = user.img.img1 === 'null' ? this.nll : user.img.img1
          return <BlockedProfile unblock={this.unblockUser(user.email)} img={img} name={user.name} last={user.last} handleClick={() => { this.props.history.push('/profiles/'+user._id) }} />
        })
      } else {
        return <div>You haven't blocked anyone yet...</div>
      }
    }

    mid_constructor(){
        var display1 = this.state.user.img.img1 !== 'null' ? this.state.user.img.img1 : nll;
        var element1 = (

          <section className="section hero">
            <div className="column is-centered shadow_2">
                <div>
                <nav className="tabs is-boxed is-small is-fullwidth">
                    <ul>
                      <li className="tab is-active" onClick={this.openTab('Preview')}>
                        <a>Preview</a>
                      </li>
                      <li className="tab" onClick={this.openTab('Likes')}>
                        <a>Who liked me</a>
                      </li>
                      <li className="tab" onClick={this.openTab('Viewed by')}>
                        <a>Who viewed me</a>
                      </li>
                      <li className="tab" onClick={this.openTab('Preferences')}>
                        <a>Blocked users</a>
                      </li>
                    </ul>
                </nav>
              </div>

              <div className="tabcontent" id="Preview" style={{display:'block'}}>
                    <div className="column is-half bg_white_3">
                      <figure className="image is-3by4"> 
                        <img className="overflow" src={display1} alt="Asuna_img" />
                    </figure>
                    <div className="column center">
                    <div className="column center">
                      <article className="media center">
                          <figure className="media-left">
                            <figure className="image is-64x64">
                              <img alt="Asuna" src={display1} />
                            </figure>
                          </figure>
                          <div className="media-content">
                            <div className="content">
                                <p>
                                  <strong>{this.state.user.name}</strong> <a>{this.state.user.last}</a><br />
                                  <span className="has-text-grey">{this.state.user.tag}<br />
                                  <time dateTime="2018-04-20">Apr 20</time> · 20 min read</span>
                                </p>
                            </div>
                          </div>
                        </article>
                    <br />
                    <hr />
                    <p>
                      {this.state.user.bio}
                    </p>
                    </div>
                  </div>      
                </div>
              </div>

              <div className="tabcontent" id="Likes">
                <div className="column is-half bg_white_3">
                  <div className="column center" id={'liked'+this.div_key}>
                  </div>
                </div>
              </div>

              <div className="tabcontent" id="Viewed by">
                <div className="column is-half bg_white_3">
                  <div className="column center" id={'viewed'+this.div_key}></div>
                </div>
              </div>

              <div className="tabcontent" id="Preferences">
                <div className="column is-half bg_white_3">
                  <div className="column center" id={'blocked'+this.div_key}>
                  </div>
                </div>
              </div>
            
            </div>
          </section>
        )
        return (element1);
    }
}