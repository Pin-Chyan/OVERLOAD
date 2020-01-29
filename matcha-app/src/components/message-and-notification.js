import React, { Component } from 'react';
import axios from 'axios';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
const ip = require("../server.json").ip;

export default class Inbox extends Component {
  constructor(props) {
    super(props)
    this.state ={
      notifyCount: 0
    }
  }
  componentDidMount () {
    const jwt = localStorage.token
    if (!jwt) {
      this.props.history.push('/login')
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
    })
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  render () {
    return (
        <div>
          <i className="fa fa-inbox"><NotificationBadge count={this.state.notifyCount} effect={Effect.SCALE}/></i>
        </div>
      )
    }
  }
