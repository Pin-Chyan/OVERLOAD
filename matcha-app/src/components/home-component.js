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

var sesh = "meave@gmail.com";
var token = "admin";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var edit = "http://10.212.6.4:5001/users/edit_spec";
var get = "http://10.212.6.4:5001/users/get_spec";
// const Image = props => (
//     <div>
//         <img alt="Asuna" className="m_image" src={props.image.img} />
//         <p className="legend">{props.image.username}</p>
//     </div>
// )

export default class Home extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        //this.constructimg = this.constructimg.bind(this);
        this.state = {
            name: '',
            last: '',
            display: load,
            bio: '',
            images: [],
            img1: load2,
            img2: load2,
            img3: load2,
            img4: load2,
            img5: load2
        };
    }


    componentDidMount () {
        axios.post(get, {"email":sesh,"target":"name last bio img","token":token}).then(res => {
            console.log(res);
            if (res.data === "invalid token" || res.data === "token not present"){
                return (window.location.href = "http://localhost:3000/login");
            }
            else {
                this.setState({
                    name: res.data[0].name,
                    last: res.data[0].last,
                    display: res.data[0].img.img1,
                    bio: res.data[0].bio,
                    img1: res.data[0].img.img1,
                    img2: res.data[0].img.img2,
                    img3: res.data[0].img.img3,
                    img4: res.data[0].img.img4,
                    img5: res.data[0].img.img5
                });
            }
            console.log("this "+ this.state.img5);
        });
    }
    
    // imagelist() {
    //     return this.state.images.map(currentimage => {
    //         return <Image image={currentimage} />;
    //     })
    // }
    
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
                        <figure class="image"> {/* is-3by4 */}
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
                        <div className="column center_b">
                        <p>
                            <button className="button is-warning">
                                <span className="icon">
                                    <i className="fa fa-arrow-left"></i>
                                </span>
                            </button>
                            <button className="button is-danger">
                                <span className="icon">
                                    <i className="fa fa-times"></i>
                                </span>
                            </button>
                            <button className="button is-primary">
                                <span className="icon is-small">
                                    <i className="fa fa-star"></i>
                                </span>
                            </button>
                            <button className="button is-success">
                                <span className="icon is-small">
                                    <i className="fa fa-heart"></i>
                                </span>
                            </button>
                            <button className="button is-hovered">
                                <span className="icon is-small">
                                    <i className="fa fa-exclamation"></i>
                                </span>
                            </button>
                        </p>
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
