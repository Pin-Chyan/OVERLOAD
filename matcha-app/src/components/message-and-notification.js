import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from "./auth/jwt-helper.js";
const ip = require("../server.json").ip;

const Notification = (props) => {
  return(
    <tr>
      <td>{props.message}</td>
    </tr>
  )
}

export default class Inbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      sender: '',
      reveiver: '',
      notifications: []
    }
  }

  componentDidMount () {
    // Get token
    const jwt = localStorage.token
    if (!jwt) {
      this.props.history.push('/login')
    }

    async function getEmail () {
      const promise = await axios.post(ip + '/users/getEmail', {}, { headers: { authorization: `bearer ${jwt}` } })
      return promise
    }
    // First time call

    getEmail().then( res => {
      axios.post(ip + '/inbox/getNotifications', { email: res.data.email }, { headers: { authorization: `bearer ${jwt}` } })
        .then( res => {
          this.setState({ notifications: res.data })
        })
  
      // Replace default with logged in user
      setInterval(() => {
        axios.post(ip + '/inbox/getNotifications', { email: res.data.email }, { headers: { authorization: `bearer ${jwt}` } })
          .then( res => {
            this.setState({ notifications: res.data })
            console.log('retrieving...')
          })
      }, 4000)
    }
    )

  }

  renderInbox () {
    return this.state.notifications.map(item => {
      return <Notification message={item.message} />
    })
  }

  render () {
    return (
      <div className="App">
        {this.renderInbox()}
      </div>
    )
  }
}
