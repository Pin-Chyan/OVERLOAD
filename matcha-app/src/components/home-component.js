import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 
// import "../styles/debug.css";
import Carousel from "../Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            name: '',
            last: '',
            display: ''
        }
    }

    componentDidMount () {
        var user = "CYKO";//this.state.signed;
        axios.post('http://localhost:5001/users/get', {"name":user}).then(res => {
            console.log(res.data[0]);
            this.setState({
                name: res.data[0].name,
                last: res.data[0].last_name
            });
        });
        axios.post('http://localhost:5001/img/r', {"username":user}).then(res2 => {
            console.log(res2.data[0]);
            this.setState({
                display: res2.data[0].img,
            });
        });
        console.log('updated');
    }
    
    render () {
        return (
            <section className="section hero">
            <div className="hero-head">
            <div className="columns is-mobile is-marginless heading has-text-weight-bold">
                <div className="column left">
                    <figure className="navbar-item image">
                        <img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
                    </figure>
                </div>
                <div className="column right">
                    <div className="control is-small has-icons-right">
                        <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                        <span className="icon is-small is-right">
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                    <p className="navbar-item has-text-white desktop">SIGN IN </p>
                    <figure className="navbar-item image has-text-white center">
                        <i className="fa fa-bars"></i>
                    </figure>
                </div>
            </div>
        </div>
            <div className="container">
                <div className="columns is-centered shadow">
                    <div className="column is-half bg_white">
                        <figure class="image"> {/* is-3by4 */}
                            <Carousel />
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
                                <strong>{this.state.name}</strong> <a>@{this.state.name}_{this.state.last}</a><br />
                                <span className="has-text-grey">{this.state.tags}<br />
                                <time datetime="2018-04-20">Apr 20</time> · 20 min read</span>
                            </p>
                        </div>
                    </div>
                </article>
                <br />
                <hr />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi eveniet neque dignissimos aperiam nemo quas mollitia aspernatur quis alias, odit veniam necessitatibus pariatur recusandae libero placeat magnam voluptas. Odio, in.
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