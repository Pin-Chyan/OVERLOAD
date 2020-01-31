import React, { Component } from 'react';
import axios from 'axios';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import decode from 'jwt-decode';
const ip = require("../server.json").ip;

export default class Inbox extends Component {
  constructor(props) {
    super(props)
    this.ip = ip
    this.state ={
      notifyCount: 0
    }
  }
  componentDidMount () {
    const jwt = localStorage.token
    if (!jwt) {
      this.props.redirectHandler()
    }
    
    async function getEmail () {
      const promise = await axios.post(ip + '/users/getEmail', {}, { headers: { authorization: `bearer ${jwt}` } })
      return promise
    }
    getEmail().then( res => {
      this.ping(res.data.email,jwt,ip);
    })

  }
  ping = (email,jwt,ip) => {
    async function update(email,jwt,ip){
        let promise = await axios.post(ip + '/inbox/getNotifications', { "email": email }, { headers: { authorization: `bearer ${jwt}` } });
        if (promise.status === 200)
            return (promise.data);
    }
    if (localStorage.logged === 'live'){
      update(email,jwt,ip).then(res => {
        let notifyCount = 0
        for (let i = 0; i < res.notifications.length; i++) {
          if (res.notifications[i].viewed === false) {
            notifyCount++
          }
        }
        this.setState({ notifyCount })
        localStorage.setItem('liked', res.liked.toString());
        localStorage.setItem('likes', res.likes.toString());
        localStorage.setItem('notify', JSON.stringify(res.notifications));
        this.sleep(200).then(() => {
          this.ping(email,jwt,ip);
        })
      }).catch(() => {
        if (localStorage.logged === 'die') return;
        else this.ping(decode(localStorage.token).email,localStorage.token,this.ip);
      })
    }
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  render () {
    return (
        <div className="fa fa-inbox" onClick={this.props.redirectHandler}>
          <NotificationBadge count={this.state.notifyCount} effect={Effect.SCALE}/>
        </div>
      )
    }
  }
