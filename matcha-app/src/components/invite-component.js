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
var ip = require("../server.json").ip;
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
// export default class Profiles extends Component {
//     var names;
//     var img;
// }


    componentDidMount () {
        axios.post(ip+"/users/get_spec", {"email":sesh,"target":"name last bio img","token":token}).then(res => {
            console.log(res);
            if (res.data === "invalid token" || res.data === "token not present"){
                return (window.location.href = ip+"/login");
            }
            else if (res.data[0].name){
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
            //console.log("this "+ this.state.img5);
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
                    <div className="column is-half bg_white_1">
                        <figure class="image"> {/* is-3by4 */}
                            <img src="https://media2.giphy.com/media/aldA8c4X6mk9O/source.gif" />
                        </figure>
                        <div className="column center has-text-centered">
                            <p>
                                <hr></hr>
                                Thank you for Register to Wotaku.
                                <br></br>
                                <br></br>
                                An email was sent to you master.
                                <br></br>
                                <br></br>
                                We hope you will find your matching lover as soon as possible.
                                <br></br>
                                <br></br>
                                Keeping you happy everyday.
                                <hr></hr>
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        )
    }
}
