import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import { CONNREFUSED } from 'dns';
import { get } from 'https';
import { func } from 'prop-types';
import { cpus } from 'os';
// import "../styles/debug.css";

var sesh = "";
var token = "";
var load = require("../images/load.gif");
var load2 = require("../images/load2.gif");
var load3 = require("../images/scifi.gif");
var ip = require("../server.json").ip;
var nll = require("../images/chibi.jpg");
var html = "";
var busy = 0;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class User extends Component {

    componentDidMount () {
        const jwt = localStorage.token;
        token = localStorage.token;
        console.log(jwt);
        async function get_userdata(){
            if (jwt) {
                let prom = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
                if (prom.status == 200){
                    sesh = prom.data.email;
                    console.log(prom.data.email);
                    let prom2 = axios.post(ip+"/users/get_spec", {"email": prom.data.email,"target":"name last bio img.img1 tag","token":jwt});
                    return(prom2);
                }
            } else {
                return ("error");
            }
        }
        get_userdata().then(res => {
            if (res !== "error"){
                var data = this.get_handle(res)
                console.log(data);
                if (data !== "error")
                    this.setState(data);
            }
        });
        console.log(this.state);
    }
    
    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    keyhandle = e => {
        async function search(search_bar, token){
            let res = await axios.post(ip+'/search/hard',{"token":token,"email":sesh, search:search_bar});
            if (res.status == 200)
                return(res.data);
        }
        if (e.key == 'Enter' && busy == 0){
            busy = 1;
            this.page_handler('searching',{});
            console.log("enter");
            console.log(this.state.search);
            let data = search(this.state.search,"admin");
            search("hi","admin").then(res => {
                console.log(res);
                sleep(2000).then(() => {
                    this.page_handler('loaded',res);
                    busy = 0;
                })
            })
        }
    }
    
    page_handler(mode, data){
        if (mode == 'loaded'){
            var column = 4;
            var row = Math.ceil(data.length/column);
            var head = this.header_constructor("Here you go");
            var body = this.row_constructor(row,column,data);
            var result = head.concat(body);
            this.setState({htmltext:ReactHtmlParser(result)})
        }
        else if (mode === 'searching'){
            var head = this.header_constructor("Senpais are searching");
            var body = this.row_constructor(1,1,[{"name":"Give them a sec","img":{"img1":load}}]);
            var result = head.concat(body);
            this.setState({htmltext:ReactHtmlParser(result)});
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
                        <div className="control is-small has-icons-right search-margin" >
                            <input id="in" className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyhandle(e)}/>
                            <span id="span" className="icon is-small is-right" >
                                <i id="image" className="fa fa-search"></i>
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
            <div className="container"><div className="columns is-centered shadow"><div className="column bg_white_2">
                        {/* <div>{ReactHtmlParser(this.header_constructor("YOUr div dies with small"))}</div> */}
                        <div>{this.state.htmltext}</div>
            </div></div></div>
        </section>

        )
    }

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Extra functions >>>>
//

    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.page_handler = this.page_handler.bind(this);
        this.myref = React.createRef();
        this.html = "";
        this.state = {
            name: '',
            last: '',
            bio: '',
            ag: 0,
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
            data.tag = res.data[0].tag;
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
    header_constructor(heading){
        var start = '<div class="tile is-ancestor"><div class="tile is-parent"><article class="tile is-child box"><p class="title center_b">';
        var header = '<p class="title center_b">' + heading + '</p></article></div></div>';
        return start + header;
    }
    column_constructor(name, image , id){
        var article = ['<div class="tile is-parent" style="width=800px "><article class="tile is-child box">','</article></div>'];
        var name_tag = '<h1 class="center_b">' + name + '</h1>';
        var img_tag = '<figure class="image is-3by4"><img class="overflow" src=' + image + ' alt="Asuna_img" /></figure>';
        var res = article[0] + name_tag + img_tag + article[1];
        return(res);
    }
    row_constructor(rows, columns, data){
        var i = 0;
        var divs = "";
        var temp = "";
        var res = "";
        var j = 0;
        var data_pos = 0;
        var max = data.length;
        while (j < rows){
            res += '<div class="tile is-ancestor">';
            while (i < columns && data_pos < max){
                temp = this.column_constructor(data[data_pos].name , data[data_pos].img.img1);
                res += divs.concat(temp);
                i++;
                data_pos++;
            }
            if (data_pos == max)
                while (i < columns){
                    temp = this.column_constructor("PC fix please",nll);
                    res += divs.concat(temp);
                    i++;
                }
            divs = "";
            i = 0;
            res += '</div>';
            j++;
        }
        return(res);
    }
}