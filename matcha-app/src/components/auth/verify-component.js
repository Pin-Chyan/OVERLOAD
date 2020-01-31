import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../../styles/overload.css";
import "../../styles/helpers.css";
import "../../styles/index.css";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
var ip = require("../../server.json").ip;

function DisplayStatus(props) {
    if (props.status === 'not found' || props.status === 'something went wrong') {
        return <h1 className="label"> Error! invalid link. </h1>
    }
    if (props.status === 'already used') {
        return <h1 className="label"> Error! link already used. </h1>
    }
    if (props.status === 'activated') {
        return <h1 className="label"> Success! your account has been activated. </h1>
    }
    return <h1> Loading... </h1>
}

export default class Verify extends Component {
    constructor(props) {
        super(props);
        this.load = require("../../images/load.gif");
        this.state = {
            verifStatus: ''
        }
    }

    componentDidMount() {
        const { vkey } = this.props.match.params;

        axios.post(`${ip}/users/emailVerify/${vkey}`).then(res => {
            this.setState({status: res.data.status});
        }).catch(err => console.log(err));

        
    }

    render() {
        return(
            <section className="section hero">
            <nav className="navbar hero-head">
                <div className="container">
                    <div className="navbar-brand">
                        <figure className="navbar-item image">
                            <img src={require('../../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
                        </figure>
                        <span className="navbar-burger burger" data-target="navMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                </div>
            </nav>
                <div className="container">
                    <div className="columns is-centered shadow">
                        <div className="column is-half bg_white_1">
                            <div className="column center has-text-centered">
                                    <hr></hr>
                                    <DisplayStatus status={this.state.status}/>
                                    <hr></hr>
                                    <figure className="image"> {/* is-3by4 */}
                            	    	<img src={require('../../images/verify.gif')} alt={this.load}/>
                        		    </figure>
                                    <hr></hr>
                                        <Link to="/login" className="button is-warning is-rounded">Login-Page</Link>
                                    <br></br>
                                    <hr></hr>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
