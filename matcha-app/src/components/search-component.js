import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactDOM from 'react-dom'
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
var sec = require("../images/check.jpg");
var html = "";
var color = [15,14,14];
var busy = 0;
var rgb_busy = 0;
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class User extends Component {


///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Onmount >>>>
//

    componentDidMount () {
        console.log("exist" + Date.now());
        this.internal_color = [15,14,14];
        this.link_color = [50,170,255];
        this.state.res = '';
        this.state.links = 'rgb(50, 170, 225)';
        console.log(this.props.match.params.input);
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
            this.page_handler('init',{});
            if (this.props.match.params.input != 'null'){
                console.log('searching');
                this.state.search = this.props.match.params.input;
                this.props.match.params.input = 'null';
                this.search_handle('Enter');
            }
            // else
        });
        console.log(this.state);
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

    listener = e => {
        console.log("fuck");
    }
    butt_listener = e => {
        console.log("fuck");
    }
    searchHandle = e => {
        this.setState({search:e.target.value});
    }
    keyhandle = e => {
        if (e.key == 'Enter' && busy == 0){
            this.search_handle(e.key);
        }
    }

    search_handle(input){
        console.log(input);
        async function search(search_bar, token, conditions){
            let res = await axios.post(ip+'/search/hard',{"token":token,"email":sesh, "search_input":search_bar, "search_conditions":conditions});
            if (res.status == 200)
                return(res.data);
        }
        if (input == 'Enter' && busy == 0){
            busy = 1;
            // this.page_handler('searching',{});
            console.log("enter");
            console.log(this.state.search);
            let data = search();
            if (this.state.search){
                if (this.state.search.trim() != ''){
                    if (this.state.search.includes('<script>')){
                        this.page_handler('nice_try',{});
                        busy = 0;
                    }
                    else {
                        this.page_handler('searching',{});
                        search(this.state.search.trim(),token,[1,-1,-2,-2,10,-1,-1]).then(res => {
                            console.log(res);
                            if (res == 'no result')
                                sleep(4000).then(() => {this.page_handler('no_res',{})});
                            else
                                sleep(4000).then(() => {
                                    this.page_handler('loaded',res);
                                })
                            busy = 0;
                        })
                        this.setState({"search":""});
                    }
                } else {
                    this.page_handler('no_term',{});
                    busy = 0;
                }
            }
            else {
                this.page_handler('no_term',{});
                busy = 0;
            }
        }
    }
    
    page_handler(mode, data){
        console.log(window.innerHeight);
        var div_onload = (<div className="columns is-centered shadow"><div className="column bg_white_2"><div onClick={e => this.listener(e)} id="result"></div></div></div>);
        var div_load = (<div><img src={load3}></img></div>);
        if (mode == 'loaded'){
            console.log(mode);
            this.rgb_phaser([15,14,14,1,0],'internal_color','res');
            if (document.getElementById('cont'))
                ReactDOM.render(div_onload, document.getElementById('cont'));
            this.setState({"navmenu":this.nav_constructor(1)});
            var column = window.innerWidth > 1400 ? 3 : 2;
            var row = Math.ceil(data.length/column);
            var head = this.header_constructor("Here you go");
            var body = this.row_constructor(row,column,data,1);
            var result = head.concat(body);
            if (document.getElementById('result'))
                ReactDOM.render(ReactHtmlParser(result), document.getElementById('result'));
        }
        else if (mode === 'searching'){
            console.log(mode);
            this.rgb_phaser([0,0,0,2,4],'internal_color','res');
            this.setState({"navmenu":this.nav_constructor(2)});
            sleep(3).then(() => {
                if (document.getElementById('cont'))
                    ReactDOM.render(div_load, document.getElementById('cont'));
                var head = this.header_constructor("Senpais are searching");
                var body = this.row_constructor(1,1,[{"name":"Give them a sec","img":{"img1":load3}}],0);
                var result = head.concat(body);
            });
        }
        else if (mode == 'init'){
            console.log(mode);
            if (document.getElementById('cont'))
                ReactDOM.render(div_onload, document.getElementById('cont'));
            this.setState({"navmenu":this.nav_constructor(1)});
            var head = this.header_constructor("Whatcha waiting for");
            var body = this.row_constructor(1,1,[{"name":"type in search bar and press enter to search","img":{"img1":load2}}],0);
            var result = head.concat(body);
            if (document.getElementById('result'))
                ReactDOM.render(ReactHtmlParser(result), document.getElementById('result'));
        }
        else if (mode == 'no_res'){
            console.log(mode);
            this.rgb_phaser([15,14,14,1,0],'internal_color','res');
            if (document.getElementById('cont'))
                ReactDOM.render(div_onload, document.getElementById('cont'));
            this.setState({"navmenu":this.nav_constructor(1)});
            var head = this.header_constructor("Cannot Notice senpai");
            var body = this.row_constructor(1,1,[{"name":"try another term to find senpai's","img":{"img1":nll}}],0);
            var result = head.concat(body);
            if (document.getElementById('result'))
                ReactDOM.render(ReactHtmlParser(result), document.getElementById('result'));

        }
        else if (mode == 'no_term'){
            console.log(mode);
            if (document.getElementById('cont'))
                ReactDOM.render(div_onload, document.getElementById('cont'));
            var head = this.header_constructor("gomenasai");
            var body = this.row_constructor(1,1,[{"name":"cannot find nobody","img":{"img1":nll}}],0);
            var result = head.concat(body);
            if (document.getElementById('result'))
                ReactDOM.render(ReactHtmlParser(result), document.getElementById('result'));
            sleep(1500).then(() => {
                this.page_handler('init',{});
            })
        }
        else if (mode == 'nice_try'){
            console.log(mode);
            if (document.getElementById('cont'))
                ReactDOM.render(div_onload, document.getElementById('cont'));
            var head = this.header_constructor("Sorry dear user");
            var body = this.row_constructor(1,1,[{"name":"But you appear to have been Reckt","img":{"img1":sec}}],0);
            var result = head.concat(body);
            if (document.getElementById('result'))
                ReactDOM.render(ReactHtmlParser(result), document.getElementById('result'));
            sleep(3000).then(() => {

            })
        }
    }

    rgb_phaser = (altitude,target,state_target) => {
        // var target = 'internal_color';
        // var state_target = 'res';
        if (   this[target][0] != altitude[0] 
            || this[target][1] != altitude[1]
            || this[target][2] != altitude[2] ){
            // console.log(altitude);
            if (this[target][0] != altitude[0]){
                if (this.toPos(this[target][0] - altitude[0]) < altitude[3])
                    this[target][0] = altitude[0];
                else
                    this[target][0] += this[target][0] > altitude[0] ? -1 * altitude[3] : 1 * altitude[3];
            }
            if (this[target][1] != altitude[1]){
                if (this.toPos(this[target][1] - altitude[1]) < altitude[3])
                    this[target][1] = altitude[1];
                else
                    this[target][1] += this[target][1] > altitude[1] ? -1 * altitude[3] : 1 * altitude[3];
            }
            if (this[target][2] != altitude[2]){
                if (this.toPos(this[target][2] - altitude[2]) < altitude[3])
                    this[target][2] = altitude[2];
                else
                    this[target][2] += this[target][2] > altitude[2] ? -1 * altitude[3] : 1* altitude[3];
            }
            // console.log(altitude);
            altitude[3] += altitude[4];
            this.setState({[state_target]:"rgb(" + this[target][0] + ", " + this[target][1] +", " + this[target][2] + ")"});
            sleep(20).then(() => {
                this.rgb_phaser(altitude,target,state_target);
            });
        } else
            console.log("set " + target + " result posted to this.state." + state_target);
    }

    toPos(num){
        if (num < 0)
            return (num * -1);
        else
            return (num);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Render Return >>>>
//

    render () {
        return (
        <section className="section hero" style={{backgroundColor: this.state.res,height: window.innerHeight+"px"}}>
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
                    <div id="navMenu" className="navbar-menu">{this.state.navmenu}</div>
            </div>
        </nav>
            <div id="cont" className="container" >
                {/* <div className="columns is-centered shadow">
                    <div className="column bg_white_2"><div onClick={e => this.listener(e)} id="result"></div></div>
                </div> */}
            </div>
        </section>

        )
    }

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Contructor functions >>>>
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
    nav_constructor(render){
        var element1 = (
            <div  className="navbar-end">
                <div className="control is-small has-icons-right search-margin" >
                    <input id="in" className="input is-hovered is-small is-rounded" type="text" placeholder="Search" onChange={this.searchHandle} onKeyDown={(e) => this.keyhandle(e)}/>
                        <span id="span" className="icon is-small is-right" >
                            <i id="image" className="fa fa-search"></i>
                        </span>
                </div>
                <Link to="/" className="navbar-item" style={{color:this.state.links}}>Home</Link>
                <Link to="/user" className="navbar-item " style={{color:this.state.links}}>Profile</Link>
                <Link to="/edit" className="navbar-item " style={{color:this.state.links}}>Profile Editor</Link>
                <Link to="/logout" className="navbar-item " style={{color:this.state.links}}>Logout</Link>
            </div>
        )
        var element2 = (
            <div  className="navbar-end">
            <div className="control is-small has-icons-right search-margin" ></div>
            <Link to="/" className="navbar-item " style={{color:this.state.links}} >Home</Link>
            <Link to="/user" className="navbar-item " style={{color:this.state.links}} >Profile</Link>
            <Link to="/edit" className="navbar-item " style={{color:this.state.links}} >Profile Editor</Link>
            <Link to="/logout" className="navbar-item " style={{color:this.state.links}} >Logout</Link>
        </div>
        )
        console.log(this.state.links);
        if (render){
            if (render == 1)
                return element1;
            else
                return element2;
        }
        else
            return <div/>;
    }
    header_constructor(heading){
        var start = '<div class="tile is-ancestor"><div class="tile is-parent"><article class="tile is-child box"><p class="title center_b">';
        var header = '<p class="title center_b">' + heading + '</p></article></div></div>';
        return start + header;
    }
    column_constructor(name, image , button, id){
        var article = ['<div class="tile is-parent" style="width=800px "><article class="tile is-child box">','</article></div>'];
        var name_tag = '<h1 class="center_b">' + name + '</h1>';
        var img_tag = '<figure class="image is-3by4"><img class="overflow" src=' + image + ' alt="Asuna_img" /></figure>';
        if (button === 1){
            var res = article[0] + name_tag + img_tag + this.button_constructor() + article[1];
        }
        else
            var res = article[0] + name_tag + img_tag + article[1];
        return(res);
    }
    button_constructor(){
        var className = '"button is-warning is-rounded"';
        return ('<button class=' + className + '>like</button><button class=' + className + '>dislike</button><button class=' + className + '>report</button>');
    }
    row_constructor(rows, columns, data, button){
        var i = 0;
        var divs = "";
        var temp = "";
        var res = "";
        var j = 0;
        var data_pos = 0;
        var max = data.length;
        var image;
        while (j < rows){
            res += '<div class="tile is-ancestor">';
            while (i < columns && data_pos < max){
                if (data[data_pos].img.img1 == 'null')
                    image = nll;
                else
                    image = data[data_pos].img.img1;
                temp = this.column_constructor(data[data_pos].name , image, button);
                res += divs.concat(temp);
                i++;
                data_pos++;
            }
            // if (data_pos == max)
            //     while (i < columns){
            //         temp = this.column_constructor("PC fix please",nll);
            //         res += divs.concat(temp);
            //         i++;
            //     }
            divs = "";
            i = 0;
            res += '</div>';
            j++;
        }
        return(res);
    }
}