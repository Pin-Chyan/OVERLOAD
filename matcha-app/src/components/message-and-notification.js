import React, { Component } from 'react';
import axios from 'axios';
const ip = require("../server.json").ip;

export default class Inbox extends Component {
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
      console.log(res);
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
        localStorage.setItem('liked', res.liked.toString());
        localStorage.setItem('likes', res.likes.toString());
        localStorage.setItem('notify', res.notify.toString());
        this.sleep(100).then(() => {
          this.ping(email,jwt,ip);
        })
    })
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  render () {return (<div className="App"></div>)}
  // renderInbox () {
  //   return this.state.notifications.map(item => {
  //     return <Notification message={item.message} />
  //   })
  // }
  // const Notification = (props) => {
  //   return(
  //     <tr>
  //       <td>{props.message}</td>
  //     </tr>
  //   )
  // }
}
