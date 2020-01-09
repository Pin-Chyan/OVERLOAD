import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import "../styles/debug.css";

var load = require("../images/load2.gif");
var load2 = require("../images/load.gif");
var sesh = "meave@gmail.com";
var token = "admin";
// var edit = "http://10.212.6.4:5001/users/edit_spec";
var get = "http://10.212.6.4:5001/users/get_spec";

export default class User extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            name: '',
            last: '',
            bio: '',
            ag: 0,
            tags: '#urmomlol',
            display: load,
            display2: load2
        }
    }

    componentDidMount () {
        var name = "Shane";
        axios.post(get, {"email": sesh, "target":"name last img.img1", "token" : token}).then(res => {
            console.log(res);
            if (res.data == "invalid token"){
                return (window.location.href = "http://localhost:3000/home");
            }
            this.setState({
                name: res.data[0].name,
                last: res.data[0].last,
                bio: res.data[0].bio,
                display: res.data[0].img.img1,
                display2: res.data[0].img.img1
            });
        });
        console.log('updated');
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
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="control is-small has-icons-right search-margin">
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <Link to="/" className="navbar-item has-text-info">Home</Link>
                        <Link to="/user" className="navbar-item has-text-info">Profile</Link>
                        <Link to="/edit" className="navbar-item has-text-info">Profile Editor</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white">
                         <figure class="image is-3by4"> {/* is-3by4 */}
                            <img className="overflow" src={this.state.display} alt="Asuna_img" />
                        </figure>
    
                        <div className="column center">
                        <div className="column center">
                <article className="media center">
                    <figure className="media-left">
                        <figure className="image is-64x64">
                            <img alt="Asuna" src={this.state.display2} />
                        </figure>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.state.name}</strong> <a>{this.state.last}</a><br />
                                <span className="has-text-grey">{this.state.tags}<br />
                                <time datetime="2018-04-20">Apr 20</time> · 20 min read</span>
                            </p>
                        </div>
                    </div>
                </article>
                <br />
                <hr />
                <p>
                    {this.state.bio}
                </p>
            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        )
    }
}