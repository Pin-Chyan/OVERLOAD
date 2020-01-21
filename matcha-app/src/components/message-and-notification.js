import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
import { getJwt } from "./auth/jwt-helper.js";
const ip = require("../server.json").ip;

const Notification = props => {
  return (
    <div>
      {props.notifications.map((item, index) => {
        <
      })}
    </div>
  )
}

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeSender = this.onChangeSender.bind(this)
    this.onChangeReceiver = this.onChangeReceiver.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      message: '',
      sender: '',
      reveiver: '',
      notifications: [],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnRoZW4udmFuZGVyZWVtc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IkJvYmJpZTAxIiwiaWF0IjoxNTc5NTk2MDg3fQ._4vLyFdNUIH_4nBkVGKZP8LXQEAL_ElNfsuRyqfllgk'
    }
  }

  componentDidMount() {
    setInterval(() => {
      axios.post(ip + '/inbox/getNotifications', { email: 'marthen.vandereems@gmail.com' }, { headers: { authorization: `bearer ${this.state.token}` } })
        .then( res => {
          this.setState({ notifications: res.data })
          console.log(this.state.notifications)
        }
        )
    }, 40000)
  }

  listNotifications() {
    return this.state.notifications.map(currentNotification => {
      return <Notification currentNotification/>
    })
  }

  onChangeSender (e) {
    this.setState({ sender: e.target.value })
  }

  onChangeReceiver (e) {
    this.setState({ receiver: e.target.value })
  }

  onChangeMessage (e) {
    this.setState({ message: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    axios.post(ip + '/inbox/addNotification', { sender: this.state.sender, receiver: this.state.receiver, message: this.state.message }, 
      { headers: { authorization: `bearer ${this.state.token}` } }).then(res => {
      console.log(res)
    })
  }

  render () {
    return (
      <div className="App" onload="console.log('The Script will load now.')">
        <input type="text" placeholder='sender' value={this.state.sender} onChange={this.onChangeSender} /><br/>
        <input type="text" placeholder='receiver' value={this.state.receiver} onChange={this.onChangeReceiver} /><br/>
        <input type="text" onChange={this.onChangeMessage} />
        <button onClick={this.onSubmit}>Upload</button>
        {/* <br/><text>{this.state.notifications}</text> */}
      </div>
    )
  }
}
