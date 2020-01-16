import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';
// import "../styles/debug.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { func } from 'prop-types';
// import { get } from 'mongoose';
var token = "admin";//localStorage.token;
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var ip = require("../server.json").ip;
var nll = require("../images/chibi.jpg");
let sesh = undefined;
var target = "meave@gmail.com";


export default class Home extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.globalbtn_handler = this.globalbtn_handler.bind(this);
        this.state = {
            sesh: '',
            name: '',
            last: '',
            position: 0,
            display: load,
            target: 'meave@gmail.com',
            bio: '',
            images: [],
            img1: nll,
            img2: nll,
            img3: nll,
            img4: nll,
            img5: nll
        };
    }

    globalbtn_handler(e){
        var buttonval = e.target.value;
        var count = this.state.position;
        async function async_hell() {
            var data = {};
            data.img = {};
            data.email = sesh;
            data.token = "admin";
            data.target = target;
            data.position = count;
            if (buttonval == "Next"){
                let req = await axios.post(ip+"/users/get_next", data);
                if (req.status == 200){
                    var res = {};
                    res.img = {};
                    res.target = req.data.ret.email;
                    res.img.img1 = req.data.ret.img.img1;
                    res.img.img2 = req.data.ret.img.img2;
                    res.img.img3 = req.data.ret.img.img3;
                    res.img.img4 = req.data.ret.img.img4;
                    res.img.img5 = req.data.ret.img.img5;
                    res.position = data.position + 1;
                    res.bio = req.data.ret.bio;
                    res.name = req.data.ret.name;
                    res.last = req.data.ret.last;
                    res.tag = req.data.ret.tag;
                    return(res);
                }
            }
            else if (buttonval == "Prev"){
                data.position = count - 2;
                let req = await axios.post(ip+"/users/get_next", data);
                if (req.status == 200){
                    var res = {};
                    res.img = {};
                    res.target = req.data.ret.email;
                    res.img.img1 = req.data.ret.img.img1;
                    res.img.img2 = req.data.ret.img.img2;
                    res.img.img3 = req.data.ret.img.img3;
                    res.img.img4 = req.data.ret.img.img4;
                    res.img.img5 = req.data.ret.img.img5;
                    res.position = data.position + 1;
                    res.bio = req.data.ret.bio;
                    res.name = req.data.ret.name;
                    res.last = req.data.ret.last;
                    res.tag = req.data.ret.tag;
                    return(res);
                }
            }
            else if (buttonval == "Like"){
                let req = await axios.post(ip+"/users/like", data);
                if (req.status == 200){
                    if (req.data == "Already Liked!")
                        console.log("Already Liked!");
                    else {
                        let req = await axios.post(ip+"/users/get_next", data);
                        if (req.status == 200){
                            var res = {};
                            res.img = {};
                            res.target = req.data.ret.email;
                            res.img.img1 = req.data.ret.img.img1;
                            res.img.img2 = req.data.ret.img.img2;
                            res.img.img3 = req.data.ret.img.img3;
                            res.img.img4 = req.data.ret.img.img4;
                            res.img.img5 = req.data.ret.img.img5;
                            res.position = data.position + 1;
                            res.bio = req.data.ret.bio;
                            res.name = req.data.ret.name;
                            res.last = req.data.ret.last;
                            res.tag = req.data.ret.tag;
                            console.log("liked");
                            return(res);
                        }
                    }
                }
            }
            else if (buttonval == "Unlike"){
                let req = await axios.post(ip+"/users/Del_like", data);
                if (req.status == 200){
                    if (req.data == "Not Liked")
                        console.log("Not Liked");
                    else
                        console.log("Unliked");
                }
            }
            else if (buttonval == "Report"){
                console.log("reported!");
            }
            else
                console.log("you missed the button!");
        }
        async_hell().then( res => {
            this.setState(res);
        });
    }

    get_handle(res){
            console.log(res);
            if (res.data === "invalid token" || res.data === "token not present"){
                this.props.history.push('/login');
            }
            else if (res.data[0].name){
                var data = {};
                data.name = res.data[0].name;
                data.last = res.data[0].last;
                data.bio = res.data[0].bio;
                if (res.data[0].img.img1 === 'null'){
                    data.img1 = nll;
                    data.display = nll;
                }
                else{
                    data.img1 = res.data[0].img.img1;
                    data.display = res.data[0].img.img1;
                }
                if (res.data[0].img.img2 === 'null')
                    data.img2 = nll;
                else
                    data.img2 = res.data[0].img.img2;
                if (res.data[0].img.img3 === 'null')
                    data.img3 = nll;
                else
                    data.img3 = res.data[0].img.img3;
                if (res.data[0].img.img4 === 'null')
                    data.img4 = nll;
                else
                    data.img4 = res.data[0].img.img4;
                if (res.data[0].img.img5 === 'null')
                    data.img5 = nll;
                else
                    data.img5 = res.data[0].img.img5;
                return(data);
            }
            data.position = 0;
    }
    
    componentDidMount () {
        const jwt = localStorage.token;
        console.log(jwt);
        async function get_userdata(){
            if (jwt) {
                let prom = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
                if (prom.status === 200){
                    console.log(prom.data.email);
                    sesh = prom.data.email;
                    let prom2 = axios.post(ip+"/users/get_spec", {"email": prom.data.email,"target":"name last bio img","token":jwt});
                    return(prom2);
                }
            } else {
                return ("error");
                // console.log('no token');
            }
            console.log(sesh);
        }
        get_userdata().then(res => {
            if (res !== "error"){
                var data = this.get_handle(res)
                if (data !== "error")
                    this.setState(data);
            }
        });
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
                        <Link to="/logout" className="navbar-item has-text-info">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white_1">
                        <figure className="image"> {/* is-3by4 */}
                            <Carousel autoPlay className="image img_carousel">
                                <div>
                                    <img alt="image 1" className="m_image" src={this.state.img1} />
                                    <p className="legend">Legend 1</p>
                                </div>
                                <div>
                                    <img alt="image 2" className="m_image" src={this.state.img2} />
                                    <p className="legend">Legend 2</p>
                                </div>
                                <div>
                                    <img alt="image 3" className="m_image" src={this.state.img3} />
                                    <p className="legend">Legend 3</p>
                                </div>
                                <div>
                                    <img alt="image 4" className="m_image" src={this.state.img4} />
                                    <p className="legend">Legend 4</p>
                                </div>
                                <div>
                                    <img alt="image 5" className="m_image" src={this.state.img5} />
                                    <p className="legend">Legend 5</p>
                                </div>
                            </Carousel>
                        </figure>
                        <div id="div" className="column center_b" onClick={e => this.globalbtn_handler(e)}>
                            <button id="1" value="Prev" className="button is-warning fa fa-arrow-left"></button>
                            <button id="2" value="Next" className="button is-danger fa fa-times"></button>
                            <button id="3" value="Like" className="button is-success fa fa-heart"></button>
                            <button id="4" value="Unlike" className="button is-danger fa fa-heart-o"></button>
                            <button id="5" value="Report" className="button is-hovered fa fa-exclamation"></button>
                        </div>
    
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
                                <strong>{this.state.name}</strong> <a>{this.state.name}_{this.state.last}</a><br />
                                <span className="has-text-grey">{this.state.tags}<br />
                                <time datetime="2018-04-20">Apr 20</time> · 20 min read</span>
                            </p>
                        </div>
                    </div>
                </article>
                <br />
                <hr />
                {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi eveniet neque dignissimos aperiam nemo quas mollitia aspernatur quis alias, odit veniam necessitatibus pariatur recusandae libero placeat magnam voluptas. Odio, in.
                </p> */}
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
