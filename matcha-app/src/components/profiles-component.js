
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/overload.css'
import '../styles/helpers.css'
import '../styles/index.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Fade } from 'react-slideshow-image'
import Axios from 'axios'
import Inbox from './message-and-notification'

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
}

export default class Profiles extends Component {
  constructor (props) {
    super(props)
    this.div_key = Date.now();
    localStorage.setItem('div_key',this.div_key);
    this.jwt = localStorage.token
    this.ip = require('../server.json').ip
    this.nll = require('../images/chibi.jpg')
    this.id = this.props.match.params.id
    this.handleRedirect = this.handleRedirect.bind(this)
    this.pageHandler = this.pageHandler.bind(this)
    this.globalBtnHandler = this.globalBtnHandler.bind(this)
    this.isUserLiked = this.isUserLiked.bind(this)
    this.state = {
      viewedUser: undefined,
      loggedInUser: undefined
    }

    async function getLoggedInUserEmail (ip, jwt) {
      const promise = await Axios.post(ip + '/users/getEmail', {}, { headers: { authorization: `bearer ${jwt}` } })
      if (promise.status === 200) {
        return promise.data
      }
    }

    async function getViewedUser (ip, id, jwt, target) {
      const promise = await Axios.post(ip + '/users/get_soft_by_id', { id, target }, { headers: { authorization: `bearer ${jwt}` } })
      if (promise.status === 200) {
        return promise.data
      }
    }

    async function getLoggendInUserData (ip, email, target, jwt) {
      const promise = await Axios.post(ip + '/users/get_spec', { email, target, token: jwt })
      if (promise.status === 200) {
        return promise.data
      }
    }

    async function addView (ip, email, target, jwt) {
      const promise = await Axios.post(ip + '/users/viewed', { email, target, token: jwt })
      if (promise.status === 200) {
        return promise.data
      }
    }

    getLoggedInUserEmail(this.ip, this.jwt).then(res => {
      getLoggendInUserData(this.ip, res.email, 'name email last bio tag img likes liked viewed gender ping sexual_pref fame location', this.jwt).then(res => {
        this.setState({ loggedInUser: res[0] })
        getViewedUser(this.ip, this.id, this.jwt, 'name email last bio tag img likes liked fame gender location ping').then(res => {
          this.setState({ viewedUser: res })
          this.pageHandler()
          addView(this.ip, this.state.loggedInUser.email, this.state.viewedUser.email, this.jwt).then(res => {
          }).catch(err => { console.log(err) })
        }).catch(err => {
          this.props.history.push('/logout')
        })
      }).catch(err => {
        this.props.history.push('/logout')
      })
    }).catch(err => {
      this.props.history.push('/logout')
    })
  }

  // ///////////////////////////////////////////////
  //                                             //
  //       Page Handlers                        //
  //                                           //
  // ///////////////////////////////////////////

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
  navHandler () {
    const navbar = this.navConstructor()
    if (document.getElementById('navMenu' + this.div_key)) {
      ReactDOM.render(navbar, document.getElementById('navMenu' + this.div_key))
    }
  }

  calcDistance (lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1) return Math.round(d);
    else if (d<=1) return Math.round(d*1000);
    return d;
  }

  carouselHandler (user) {
    const distance = this.calcDistance(user.location[4], user.location[5], this.state.loggedInUser.location[4], this.state.loggedInUser.location[5])
    const carouselData = {
      carousel_distance: distance,
      carousel_fame: user.fame,
      carousel_ping: user.ping,
      carousel_gender: user.gender,
      carousel_name: user.name,
      carousel_last: user.last,
      carousel_bio: user.bio,
      carousel_tag: user.tag,
      carousel_img1: user.img.img1 === 'null' ? this.nll : user.img.img1,
      carousel_img2: user.img.img2 === 'null' ? this.nll : user.img.img2,
      carousel_img3: user.img.img3 === 'null' ? this.nll : user.img.img3,
      carousel_img4: user.img.img4 === 'null' ? this.nll : user.img.img4,
      carousel_img5: user.img.img5 === 'null' ? this.nll : user.img.img5
    }
    if (document.getElementById('cont' + this.div_key)) {
      ReactDOM.render(this.bodyConstructor(carouselData), document.getElementById('cont' + this.div_key))
    }
    const liked = this.isUserLiked()
    if (document.getElementById('button' + this.div_key)) {
      ReactDOM.render(this.buttonConstructor(liked), document.getElementById('button' + this.div_key))
    }
  }

  pageHandler () {
    this.navHandler()
    this.carouselHandler(this.state.viewedUser)
  }

  handleRedirect (e) {
    this.props.history.push({
      pathname: e.target.id
    })
  }

  isUserLiked () {
    const likedArray = this.state.loggedInUser.liked
    const likesArray = this.state.loggedInUser.likes
    if (likedArray.includes(this.id) && likesArray.includes(this.id)) {
      return true
    } else {
      return false
    }
  }

  globalBtnHandler (e) {
    const buttonval = e.target.value

    async function asyncHell (ip, user, target, jwt) {
      let data = {}
      data.img = {}
      data.email = user
      data.token = jwt
      data.target = target
      if (buttonval === 'Like') {
        const req = await Axios.post(ip + '/users/like', data)
        if (req.status === 200) {
          if (req.data === 'Already Liked!') {
            alert('Already Liked!')
          } else {
            alert('liked!')
          }
        }
      } else if (buttonval === 'Unlike') {
        const req = await Axios.post(ip + '/users/Del_like', data)
        if (req.status === 200) {
          if (req.data === 'Not Liked') {
            alert('You have not Liked this user')
          } else {
            alert('Unliked')
          }
        }
      } else if (buttonval === 'Report') {
        Axios.post(ip+'/users/report', { user, reported_email: target }, { headers: { Authorization: `bearer ${jwt}` } }).then(res => {
          alert('You have reported them')
        })
      } else if (buttonval === 'Message') {
          return ('redirect')
      } else {
          console.log('you missed the button!')
      }
    }

    asyncHell(this.ip, this.state.loggedInUser.email, this.state.viewedUser.email, this.jwt).then(res => {
      if (res === 'redirect') {
        this.props.history.push({
          pathname: '/chat/new',
          user: this.state.loggedInUser,
          data: this.state.viewedUser.email
        })
      }
    })
  }

  // ///////////////////////////////////////////////
  //                                             //
  //       Page constructors                    //
  //                                           //
  // ///////////////////////////////////////////

  navConstructor () {
    return (
      <div className='navbar-end'>
        <div className='control is-small has-icons-right search-margin'>
          <input className='input is-hovered is-small is-rounded' type='text' placeholder='Search' onChange={this.searchHandle} onKeyDown={(e) => this.keyHandle(e)}/>
          <span className='icon is-small is-right'>
            <i className='fa fa-search'></i>
          </span>
        </div>
        <button className='navbar-item nav-color' style={{ color: this.state.other_page }} onClick='{}'><Inbox /></button>
        <button className='navbar-item nav-color' style={{ color: this.state.other_page }} id='/' onClick={this.handleRedirect}>Home</button>
        <button className='navbar-item nav-color' style={{ color: this.state.curr_page }} id='/user' onClick={this.handleRedirect}>Profile</button>
        <button className='navbar-item nav-color' style={{ color: this.state.other_page }} id='/edit' onClick={this.handleRedirect}>Profile Editor</button>
        <button className='navbar-item nav-color' style={{ color: this.state.other_page }} id='/logout' onClick={this.handleRedirect}>Logout</button>
      </div>
    )
  }

  listTags (tags) {
    if (Array.isArray(tags) && tags.length) {
      return tags.map(tag => {
        return <span className="tag is-warning">{tag}  </span>
      })
    } else {
      return <span>No tags ...</span>
    }
  }

  getFormatedDate (ping) {
    const currDate = new Date(ping)
    let formattedDate = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" 
    + currDate.getDate() + " " + currDate.getHours() + ":" + currDate.getMinutes() + ":" 
    + currDate.getSeconds()
    return formattedDate
  }

  bodyConstructor (data) {
    return (
      <div className='column is-centered shadow'>
        <div className='column is-half bg_white_1'>
          <figure className='image'>
            <div className='slide-container'>
              <Fade {...fadeProperties}>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img1} alt="profile img/img 1" />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img2} alt="img2" />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img3} alt="img3" />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img4} alt="img4" />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img5} alt="img5" />
                  </div>
                </div>
              </Fade>
            </div>
          </figure>
          <div id={'button' + this.div_key} className='column center_b' onClick={e => this.globalBtnHandler(e)}>
          </div>

          <div className='column center'>
            <div className='column center'>
              <article className='media center'>
                <figure className='media-left'>
                  <figure className='image is-64x64'>
                    <img alt='Asuna' src={data.carousel_img1} />
                  </figure>
                </figure>
                <div className='media-content'>
                  <div className='content'>
                    <strong>{data.carousel_distance + 'km'}</strong> <br />
                    <strong>{data.carousel_name} {data.carousel_last}  </strong>
                    {data.carousel_gender === -1 && <span className='fa fa-mars' style={{ color: '#1E90FF' }} />}
                    {data.carousel_gender === 1 && <span className='fa fa-venus' style={{ color: '#FF1493' }} />}
                    <br></br>
                    <span className='fa fa-fire is-danger' style={{ color: 'red' }}>{data.carousel_fame}</span><br />
                    <time dateTime='2018-04-20'>{data.carousel_ping === 0 && <span>last online: <span style={{color: 'red'}}>never</span></span>}</time>
                    <time dateTime='2018-04-20'>{(((Date.now() - data.carousel_ping) <= 60000) && (data.carousel_ping !== 0))&& <strong style={{color: 'green'}}>Online</strong>}</time>
                    <time dateTime='2018-04-20'>{(((Date.now() - data.carousel_ping) > 60000) && (data.carousel_ping !== 0)) && <strong>last online: {this.getFormatedDate(data.carousel_ping)}</strong>}</time>
                  </div>
                  <span className='has-text-grey'>{this.listTags(data.carousel_tag)}</span>
                </div>
              </article>
              <br />
              <hr />
              {data.carousel_bio}
              <div>
                {/* <Inbox /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  buttonConstructor (isLiked) {
    if (isLiked) {
      return (
        <div>
          <button id='3' value='Like' className='button is-success fa fa-heart'></button>
          <button id='4' value='Unlike' className='button is-danger fa fa-heart-o'></button>
          <button id='5' value='Report' className='button is-hovered fa fa-exclamation'></button>
          <button id='6' value='Message' className='button is-info fa fa-comment'></button>
        </div>
      )
    } else {
      return (
        <div>
          <button id='3' value='Like' className='button is-success fa fa-heart'></button>
          <button id='4' value='Unlike' className='button is-danger fa fa-heart-o'></button>
          <button id='5' value='Report' className='button is-hovered fa fa-exclamation'></button>
        </div>
      )
    }
  }

  render () {
    return (
      <section className='section hero'>
        <nav className='navbar hero-head'>
          <div className='container'>
            <div className='navbar-brand'>
              <figure className='navbar-item image'>
                <img src={require('../images/logo.png')} className='logo_use' alt='Why is this logo broken' />
              </figure>
              <span className='navbar-burger burger' data-target='navMenu'>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id={'navMenu'+this.div_key} className='navbar-menu'></div>
          </div>
        </nav>
        <div id={'cont'+this.div_key} className='container'></div>
      </section>
    )
  }
}
