import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
// import "../styles/debug.css";

var token = "";//localStorage.token;
var sesh = "";//decode(localStorage.token);
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var ip = require("../server.json").ip;
var nll = require("../images/chibi.jpg");

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

    get_handle(res){
        if (res.data == "invalid token"){
            return ("invalid token");
        }
        else if (res.data[0].name){
            var data = {};
            data.name = res.data[0].name;
            data.last = res.data[0].last;
            data.bio = res.data[0].bio;
            if (res.data[0].img.img1 == 'null'){
                data.display = nll;
                data.display2 = nll;
            }
            else{
                data.display = res.data[0].img.img1;
                data.display2 = res.data[0].img.img1;
            }
            return (data);
        }
    }

    componentDidMount () {
        const jwt = localStorage.token;

        async function lol(){
            if (jwt) {
                let prom = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
                if (prom.status == 200){
                    let prom2 = axios.post(ip+"/users/get_spec", {"email": prom.data.email, "target":"name last bio img.img1", "token" : jwt});
                    return(prom2);
                }
            } else
                return ("error");
        }
        lol().then(res => {
            if (res !== "error"){
                var data = this.get_handle(res)
                if (data !== "error")
                    this.setState(data);
            }
        });
    }
    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    key_handle = e => {
        if (e.key == 'Enter'){
            var search_input = 'null';
            if (this.state.search){
                if (this.state.search.trim() != '')
                    search_input = this.state.search;
            }
            window.location.href = '/search/' + search_input;
            // this.props.history.push('/search/ok');
        }
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
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.key_handle(e)}/>                           
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <Link to="/" className="navbar-item has-text-info">Home</Link>
                        <Link to="/user" className="navbar-item has-text-info">Profile</Link>
                        <Link to="/edit" className="navbar-item has-text-info">Profile Editor</Link>
                        <Link to="/logout" className="navbar-item has-text-info">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                         <figure className="image is-3by4"> {/* is-3by4 */}
                            <img className="overflow" src={this.state.display} alt="Asuna_img" />
                        </figure>
    
                        <div className="column center">
                        <div className="column center">
                <article className="media center">
                    <figure className="media-left">
                        <figure className="image is-64x64">
                            <img alt="Asuna" src={this.state.display} />
                        </figure>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.state.name}</strong> <a>{this.state.last}</a><br />
                                <span className="has-text-grey">{this.state.tags}<br />
                                <time dateTime="2018-04-20">Apr 20</time> · 20 min read</span>
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