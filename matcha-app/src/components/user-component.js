import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import ReactDOM from 'react-dom'

var token = "";//localStorage.token;
var sesh = "";//decode(localStorage.token);
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var ip = require("../server.json").ip;
var nll = require("../images/chibi.jpg");

export default class User extends Component {

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< eve protocol >>>>
//

    constructor(props){
        super(props);
        this.div_key = Date.now();
        this.jwt = localStorage.token;
        this.ip = require('../server.json').ip;
        this.state = {};
        console.log(this.ip);
        async function server_check(ip){
            let promise = await axios.post(ip + '/ping/ms');
            if (promise.status === 200){
                return ('eve online');
            }
            else
                return ('eve offline');
        }
        server_check(this.ip).then(res => {
            if (res === 'eve online'){
                console.log('eve online');
                ///////////////////////////////////////////////////////////
                //      <<<< begin binding after database online >>>>
                this.eve_mount = this.eve_mount.bind(this);
                this.userData_getter = this.userData_getter.bind(this);
                this.page_handler = this.page_handler.bind(this);
                this.searchHandle = this.searchHandle.bind(this);
                this.busy = 0;
                this.state = {
                    "res" : '',
                    "html" : '',
                    "user" : '',
                    "display" : load,
                    "dsiplay" : load2
                };
                this.userData_getter();
            }
            else
                console.log('eve redirect');///     <<<< replace with redirect
        });
    }
    userData_getter(){
        console.log('getting data......');
        async function get_email(jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
            else
                return 'eve redirect';
        }
        async function get_data(email,token,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "token":token, "target":target});
            if (promise.status === 200)
                return promise.data;
            else
                return 'eve redirect';
        }
        //
        //      <<<< target will be customised for each page for optimisation >>>>
        //
        get_email(this.jwt).then(emailGet_res => {
            if (emailGet_res !== 'eve redirect')
                get_data(emailGet_res.email,this.jwt,this.ip,"name email last bio img.img1").then(userGet_res => {
                    if (userGet_res !== 'eve redirect'){
                        this.setState({"user":userGet_res[0]});
                        this.eve_mount();
                    }
                    else
                        console.log('eve redirect');///     <<<< replace with redirect
                })
            else
                console.log('eve redirect');///     <<<< replace with redirect
        })
    }
    eve_mount(){
        this.page_handler();
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

    page_handler(){
        console.log('render');
        var nav = this.nav_constructor(1);
        var mid = this.mid_constructor();
        ReactDOM.render(nav, document.getElementById('navMenu'));
        ReactDOM.render(mid, document.getElementById('cont'));
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

    //      <<<< Page routers

    redirecthandler = e => {
        // console.log(e.target.id);
        this.props.history.push(e.target.id);
    }
    //      the end >>>>


    //      <<<< search fucntions
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
            this.props.history.push({
                pathname: '/search',
                data: search_input
            });
        }
    }
    //      end >>>>

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
                <div id="navMenu" className="navbar-menu"></div>
            </div>
        </nav>
            <div id="cont" className="container"></div>
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
                <a className="navbar-item " style={{color:this.state.links}}  id='/' onClick={this.redirecthandler}>Home</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/user' onClick={this.redirecthandler}>Profile</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
            </div>
        )
        var element2 = (
            <div  className="navbar-end">
            <div className="control is-small has-icons-right search-margin" ></div>
            <a className="navbar-item " style={{color:this.state.links}}  id='/' onClick={this.redirecthandler}>Home</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/user' onClick={this.redirecthandler}>Profile</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
        </div>
        )
        if (render)
            return element1;
        else
            return <div/>;
    }

    mid_constructor(){
        var element1 = (
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                         <figure className="image is-3by4"> 
                            <img className="overflow" src={this.state.user.img.img1} alt="Asuna_img" />
                        </figure>
    
                        <div className="column center">
                        <div className="column center">
                <article className="media center">
                    <figure className="media-left">
                        <figure className="image is-64x64">
                            <img alt="Asuna" src={this.state.user.img.img1} />
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
        )
        return (element1);
    }
}