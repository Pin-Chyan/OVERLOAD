
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

// Create button constructor
// Link buttons to their actions

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`)
  }
}

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.div_key = Date.now()
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
      getLoggendInUserData(this.ip, res.email, 'name email last bio tag img likes liked', this.jwt).then(res => {
        this.setState({ loggedInUser: res[0] })
      }).catch(err => {
        console.log('fake eve redirect' + err)
      })
      getViewedUser(this.ip, this.id, this.jwt, 'name email last bio tag img likes liked').then(res => {
        this.setState({ viewedUser: res })
        // console.log(res)
        this.pageHandler()
        addView(this.ip, this.state.loggedInUser.email, this.state.viewedUser.email, this.jwt).then(res => {
          // console.log(res)
        }).catch(err => { console.log(err) })
      }).catch(err => {
        console.log('fake eve redirect' + err)
      })
    }).catch(err => {
      console.log('fake eve redirect' + err)
    })
  }

  // ///////////////////////////////////////////////
  //                                             //
  //       Page Handlers                        //
  //                                           //
  // ///////////////////////////////////////////

  navHandler () {
    const navbar = this.navConstructor()
    if (document.getElementById('navMenu' + this.div_key)) {
      ReactDOM.render(navbar, document.getElementById('navMenu' + this.div_key))
    }
  }

  carouselHandler (user) {
    const carouselData = {
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
    console.log(this.state.viewedUser)
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
      console.log(ip + ',' + user + ',' + target)
      let data = {}
      data.img = {}
      data.email = user
      data.token = jwt
      data.target = target
      if (buttonval === 'Like') {
        const req = await Axios.post(ip + '/users/like', data)
        if (req.status === 200) {
          if (req.data === 'Already Liked!') {
            console.log('Already Liked!')
          } else {
            console.log('liked!')
          }
        }
      } else if (buttonval === 'Unlike') {
        const req = await Axios.post(ip + '/users/Del_like', data)
        if (req.status === 200) {
          if (req.data === 'Not Liked') {
            console.log('Not Liked')
          } else {
            console.log('Unliked')
          }
        }
      } else if (buttonval === 'Report') {
        console.log('reported!')
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
          user: this.state.loggedInUser.email,
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
        <a className='navbar-item ' style={{ color: this.state.other_page }} onClick='{}'><Inbox redirectHandler={() => this.props.history.push('/notification')} /></a>
        <a className='navbar-item ' style={{ color: this.state.other_page }} id='/' onClick={this.handleRedirect}>Home</a>
        <a className='navbar-item ' style={{ color: this.state.curr_page }} id='/user' onClick={this.handleRedirect}>Profile</a>
        <a className='navbar-item ' style={{ color: this.state.other_page }} id='/edit' onClick={this.handleRedirect}>Profile Editor</a>
        <a className='navbar-item ' style={{ color: this.state.other_page }} id='/logout' onClick={this.handleRedirect}>Logout</a>
      </div>
    )
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
                    <img src={data.carousel_img1} />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img2} />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img3} />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img4} />
                  </div>
                </div>
                <div className='each-fade'>
                  <div className='image-container'>
                    <img src={data.carousel_img5} />
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
                    <p>
                      <strong>{data.carousel_name}</strong> <a>{data.carousel_name}_{data.carousel_last}</a><br />
                      <span className='has-text-grey'>{data.carousel_tag}<br />
                        <time datetime='2018-04-20'>Apr 20</time> · 20 min read</span>
                    </p>
                  </div>
                </div>
              </article>
              <br />
              <hr />
              <p>
                {data.bio}
              </p>
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
