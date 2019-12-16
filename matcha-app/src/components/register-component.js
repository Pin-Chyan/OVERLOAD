import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
// import "../styles/debug.css";

export default class Register extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render () {
        return (
            <section class="section hero">
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
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <p className="navbar-item has-text-white desktop">SIGN IN </p>
                    <figure className="navbar-item image has-text-white center">
                        <i className="fas fa-bars"></i>
                    </figure>
                </div>
            </div>
        </div>
            <div class="container">
                <div class="columns is-centered shadow">
                    <div class="column is-half bg_white">
                         <figure class="image is-3by4"> {/* is-3by4 */}
                            <img className="overflow" src={require('../images/profile.jpg')} alt="Asuna_img" />
                        </figure>
    
                        <div className="column center_b">
                        <p>
                            <button className="button is-warning">
                                <span className="icon">
                                    <i className="fas fa-arrow-left"></i>
                                </span>
                            </button>
                            <button className="button is-danger">
                                <span className="icon">
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>
                            <button className="button is-primary">
                                <span className="icon is-small">
                                    <i className="fas fa-star"></i>
                                </span>
                            </button>
                            <button className="button is-success">
                                <span className="icon is-small">
                                    <i className="fas fa-heart"></i>
                                </span>
                            </button>
                            <button className="button is-hovered">
                                <span className="icon is-small">
                                    <i className="fas fa-exclamation"></i>
                                </span>
                            </button>
                        </p>
                    </div>
    
                        <div class="column center_b">
                        <div class="column center">
                <article className="media center">
                    <figure className="media-left">
                        <figure className="image is-64x64">
                            <img alt="Asuna" src={require('../images/profile.jpg')} />
                        </figure>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>Asuna Yuuki</strong> <a>@Asuna_Yuuki</a><br />
                                <span className="has-text-grey">SAO, player<br />
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