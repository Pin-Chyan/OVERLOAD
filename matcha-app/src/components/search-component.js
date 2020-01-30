import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactDOM, { createPortal } from 'react-dom'
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import axios from 'axios'; 
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import styled from 'styled-components';
import Slider from './filter/Slider.js';
import Filter from './filter/Filter.js';
import Sort from './filter/Sort.js';
import Inbox from './message-and-notification';
//[1,-1,-2,-2,10,-1,-1] search conditions

const Styles = styled.div`

`;

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
        this.load2 = require("../images/load2.gif");
        this.load3 = require("../images/scifi.gif");
        this.nll = require("../images/chibi.jpg");
        this.sec = require("../images/check.jpg");
        this.req = {};
        this.req.targ = [[0,100],-2,-2,-2,-2,1,-2];
        this.req.in = '';
        this.sort = 0;
        this.method = '';
        this.order = '';
        this.state = {};
        async function server_get(ip,jwt){
            let promise = await axios.post(ip+"/users/getEmail", {} ,{ headers: { authorization: `bearer ${jwt}` } });
            if (promise.status === 200)
                return promise.data;
        }
        server_get(this.ip,this.jwt).then(res => {
            ///////////////////////////////////////////////////////////
            //      <<<< begin binding after database online >>>>
            this.eve_mount = this.eve_mount.bind(this);
            this.userData_getter = this.userData_getter.bind(this);
            this.page_handler = this.page_handler.bind(this);
            this.searchHandle = this.searchHandle.bind(this);
            this.searcher = this.searcher.bind(this);
            this.busy = 0;
            this.state = {
                "res" : '',
                "html" : '',
                "user" : res
            };
            if (this.props.location.user){
                this.setState({"user":this.props.location.user});
                this.eve_mount();
            } else
                this.userData_getter();
        }).catch(err => {console.log('eve redirect')});
    }
    userData_getter(){
        async function get_data(email,jwt,ip,target){
            let promise = await axios.post(ip + '/users/get_spec',{"email":email, "target":target, "token":jwt});
            if (promise.status === 200)
                return promise.data;
        }
        ///      <<<< target will be customised for each page for optimisation >>>>
        get_data(this.state.user.email,this.jwt,this.ip,"name email last age bio tag img likes liked viewed gender ping sexual_pref fame").then(userGet_res => {
                this.setState({"user":userGet_res[0]});
                this.eve_mount();
        }).catch(err => {console.log('eve redirect' + err)})
    }
    eve_mount() {
        this.internal_color = [15,14,14];
        this.state.res = '';
        this.state.links = 'rgb(50, 170, 225)';
        if (this.props.location.search_in && this.props.location.search_in !== 'null'){
            this.req.in = this.props.location.search_in;
            this.searcher(this.req);
        } else
            this.page_handler('init',{});
    }


///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page states >>>>
//

page_handler(mode, data){
    var div_onload = (<div className="columns is-centered shadow"><div className="column bg_white_2"><div onClick={e => this.listener(e)} id={"result"+this.div_key}></div></div></div>);
    var div_load = (<div><img src={this.load3}></img></div>);
    var cont_div = 'cont' + this.div_key;
    var menu_div = 'navMenu' + this.div_key;
    var res_div = 'result' + this.div_key;
    if (mode == 'loaded'){
        this.rgb_phaser([15,14,14,1,0],'internal_color','res');
        if (document.getElementById(cont_div))
            ReactDOM.render(div_onload, document.getElementById(cont_div));
        if (document.getElementById(menu_div))
            ReactDOM.render(this.nav_constructor(2), document.getElementById(menu_div));
        this.sort_render(data);
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render(this.filter_constructor(2), document.getElementById("filter"+this.div_key))
        this.sort = 1;
        this.onloaded(this.div_key,data);
    }
    else if (mode === 'searching'){
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render((<div/>), document.getElementById("filter"+this.div_key))
        this.rgb_phaser([0,0,0,1,2],'internal_color','res');
        this.sleep(3).then(() => {
            if (document.getElementById(cont_div))
                ReactDOM.render(div_load, document.getElementById(cont_div));
            if (document.getElementById(menu_div))
                ReactDOM.render(this.nav_constructor(2), document.getElementById(menu_div));              
            var head = this.header_constructor("Senpais are searching");
            var body = this.row_constructor(1,1,[{"name":"Give them a sec","img":{"img1":this.load3}}],0);
            var result = head.concat(body);
        });
    }
    else if (mode == 'init'){
        ReactDOM.render(this.nav_constructor(1), document.getElementById(menu_div));
        if (document.getElementById(cont_div))
            ReactDOM.render(div_onload, document.getElementById(cont_div));
        if (document.getElementById(menu_div))
            ReactDOM.render(this.nav_constructor(2), document.getElementById(menu_div));
        var head = this.header_constructor("Whatcha waiting for");
        var body = this.row_constructor(1,1,[{"name":"type in search bar and press enter to search","img":{"img1":this.load2}}],0);
        var result = head.concat(body);
        if (document.getElementById(res_div))
            ReactDOM.render(ReactHtmlParser(result), document.getElementById(res_div));
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render(this.filter_constructor(1), document.getElementById("filter"+this.div_key))
    }
    else if (mode == 'no_res'){
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render((<div/>), document.getElementById("filter"+this.div_key))
        this.rgb_phaser([15,14,14,1,0],'internal_color','res');
        if (document.getElementById(cont_div))
            ReactDOM.render(div_onload, document.getElementById(cont_div));
        if (document.getElementById(menu_div))
            ReactDOM.render(this.nav_constructor(2), document.getElementById(menu_div));
        var head = this.header_constructor("Cannot Notice senpai");
        var body = this.row_constructor(1,1,[{"name":"try another term to find senpai's, redirecting in a sec","img":{"img1":this.nll}}],0);
        var result = head.concat(body);
        if (document.getElementById(res_div))
            ReactDOM.render(ReactHtmlParser(result), document.getElementById(res_div));
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render((<div/>), document.getElementById("filter"+this.div_key))
        this.sleep(2000).then(() => {
            this.page_handler('init',{});
        })

    }
    else if (mode == 'no_term'){
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render((<div/>), document.getElementById("filter"+this.div_key))
        if (document.getElementById(cont_div))
            ReactDOM.render(div_onload, document.getElementById(cont_div));
        var head = this.header_constructor("gomenasai");
        var body = this.row_constructor(1,1,[{"name":"cannot find nobody , redirecting in a bit","img":{"img1":this.nll}}],0);
        var result = head.concat(body);
        if (document.getElementById(res_div))
            ReactDOM.render(ReactHtmlParser(result), document.getElementById(res_div));
        this.sleep(1500).then(() => {
            this.page_handler('init',{});
        })
    }
    else if (mode == 'nice_try'){
        if (document.getElementById("filter"+this.div_key))
            ReactDOM.render((<div/>), document.getElementById("filter"+this.div_key))
        if (document.getElementById(cont_div))
            ReactDOM.render(div_onload, document.getElementById(cont_div));
        var head = this.header_constructor("Sorry dear user");
        var body = this.row_constructor(1,1,[{"name":"But you appear to have been Reckt, redirecting in a bit","img":{"img1":this.sec}}],0);
        var result = head.concat(body);
        if (document.getElementById(res_div))
            ReactDOM.render(ReactHtmlParser(result), document.getElementById(res_div));
        this.sleep(3000).then(() => {
            this.page_handler('init',{});
        })
    }
    this.busy = 0;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Page logic >>>>
//

    listener = e => {
        this.props.history.push({
            pathname:"/profiles/"+e.target.id,
            user: this.state.user
        });
    }

    //      <<<< Page routers

    redirecthandler = e => {
        this.props.history.push({
            pathname:e.target.id,
            user: this.state.user
        });
    }
    //      the end >>>>


    //      <<<< search functions
    searchHandle = (e) => {
        console.log(e.target.value);
        this.req.in = e.target.value;
    }
    keyHandle = e => {
        if (e.target.id === 'filter' || e.target.id === 'withfilter'){
            var res = {};
            var req = [[-2,-2],-2,-2,-2,-2,-2,-2];
            if (localStorage.age_gap !== 'max')
                req[0] = [this.state.user.age - parseInt(localStorage.age_gap) < 18 ? 18 : this.state.user.age - parseInt(localStorage.age_gap) ,parseInt(localStorage.age_gap) + this.state.user.age];
            if (localStorage.max_fam !== 'anyone')
                req[1] = parseInt(localStorage.max_fam);
            if (localStorage.max_dst !== 'anywhere')
                req[2] = parseInt(localStorage.max_dst);
            req[3] = parseInt(localStorage.filter_gen);
            req[4] = parseInt(localStorage.filter_pref);
            if (e.target.id === 'withfilter'){
                req[5] = 1;
                res.in = this.req.in;
            } else res.in = 'null';
            if (localStorage.max_tag !== 'anyone')
                req[6] = parseInt(localStorage.max_tag);
            res.targ = req;
            console.log(req);
            this.searcher(res);
        }
        if (e.target.id === 'exclude'){
            this.searcher(this.req);
        }
    }
    searcher(req){
        console.log(req);
        async function search(email,jwt,ip,search_req){
            let promise = await axios.post(ip +'/search/engine', {"email":email, "token":jwt, "search_req":search_req})
            if (promise.status === 200){
                return (promise);
            }
        }
        if (this.busy === 0){
            this.busy = 1;
            // this.req.targ = [[0,100],[0,100],-2,-2,-2,1,-1];
            if (req.in !== ''){
                if (req.in.includes('<script>'))
                this.page_handler('nice_try',{});
                else{
                    this.page_handler('searching',{});
                    search(this.state.user.email,this.jwt,this.ip,req).then(res => {
                        if (res.data === 'no_res')
                            this.page_handler('no_res',{});
                        else {
                            this.sleep(0).then(() => {
                                this.page_handler('loaded',res.data);
                            })
                        }
                    })
                }
            } else if (req.targ[5] === 1){
                this.page_handler('no_term');
            }
        }
        this.req.in = '';
    }
    onloaded(div_id, data){
        if (localStorage.sort_order && localStorage.sort_method){
            // console.log('all true')
            if (this.method != localStorage.sort_method || this.order != localStorage.sort_order){
                this.method = localStorage.sort_method;
                this.order = localStorage.sort_order;
                if (this.sort === 1){
                    if (this.method === 'Age')
                        this.age_sort(data, this.order);
                    if (this.method === 'Fame')
                        this.fame_sort(data, this.order);
                    if (this.method === 'Location')
                        this.dist_sort(data, this.order);
                }
            }
        }
        console.log('await new');
        if (this.sort === 1 && document.getElementById('result' + div_id))
            this.sleep(200).then(() => {this.onloaded(div_id, data)});
    }
    age_sort(data, order){
        console.log('age render');
        console.log(order);
        console.log(order === 'ascending');
        console.log(order === 'descending');
        if (order === 'ascending')
            this.sort_render(data.sort(function (a,b){
                if (a.age < b.age)
                    return -1;
                if (a.age > b.age)
                    return 1;
                return (0);
        }));
        if (order === 'descending')
            this.sort_render(data.sort(function (a,b){ 
                if (a.age > b.age)
                    return -1;
                if (a.age < b.age)
                    return 1;
                return (0);
        }));
    }
    dist_sort(data, order){
        console.log('age render');
        console.log(order);
        console.log(order === 'ascending');
        console.log(order === 'descending');
        console.log(data[0].location);
        if (order === 'ascending')
            this.sort_render(data.sort(function (a,b){
                if (a.location[0] < b.location[0])
                    return -1;
                if (a.location[0] > b.location[0])
                    return 1;
                return (0);
        }));
        if (order === 'descending')
            this.sort_render(data.sort(function (a,b){ 
                if (a.location[0] > b.location[0])
                    return -1;
                if (a.location[0] < b.location[0])
                    return 1;
                return (0);
        }));
    }
    fame_sort(data, order){
        console.log('age render');
        console.log(order);
        console.log(order === 'ascending');
        console.log(order === 'descending');
        if (order === 'ascending')
            this.sort_render(data.sort(function (a,b){
                if (a.fame < b.fame)
                    return -1;
                if (a.fame > b.fame)
                    return 1;
                return (0);
        }));
        if (order === 'descending')
            this.sort_render(data.sort(function (a,b){ 
                if (a.fame > b.fame)
                    return -1;
                if (a.fame < b.fame)
                    return 1;
                return (0);
        }));
    }
    sort_render(data){
        var res_div = 'result' + this.div_key;
        var column = window.innerWidth > 1400 ? 3 : 2;
        var row = Math.ceil(data.length/column);
        var head = this.header_constructor("Here you go");
        var body = this.row_constructor(row,column,data,1);
        var result = head.concat(body);
        if (document.getElementById(res_div)){
            ReactDOM.render((<div/>), document.getElementById(res_div));
            ReactDOM.render(ReactHtmlParser(result), document.getElementById(res_div));
        }
    }
    //      end >>>>


    //      <<<< RGB controlers
    rgb_phaser = (altitude,target,state_target) => {
        if (   this[target][0] != altitude[0] 
            || this[target][1] != altitude[1]
            || this[target][2] != altitude[2] ){
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
            altitude[3] += altitude[4];
            this.setState({[state_target]:"rgb(" + this[target][0] + ", " + this[target][1] +", " + this[target][2] + ")"});
            this.sleep(20).then(() => {
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
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    //      end >>>>

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Render Return >>>>
//

    render () {
        return (
        <section className="section hero" style={{backgroundColor: this.state.res,height: (window.innerHeight * 2)+"px"}}>
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
                    <div id={"navMenu"+this.div_key} className="navbar-menu">{this.state.navmenu}</div>
            </div>
        </nav>
            <div id={"filter"+this.div_key}></div>
            <div id={"cont"+this.div_key} className="container" >
            </div>
        </section>
        )
    }

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Contructor functions >>>>
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
                <a className="navbar-item " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox redirectHandler={() => this.props.history.push('/notification')}/></a>
                 <a className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/' onClick={this.redirecthandler}>Home</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/user' onClick={this.redirecthandler}>Profile</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
                <a className="navbar-item " style={{color:this.state.links}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
            </div>
        )
        var element2 = (
            <div  className="navbar-end">
            <div className="control is-small has-icons-right search-margin" ></div>
            <a className="navbar-item " style={{color:this.state.other_page}} id='/notification' onClick={this.redirecthandler}><Inbox redirectHandler={() => this.props.history.push('/notification')}/></a>
             <a className="navbar-item " style={{color:this.state.other_page}}  id='/mychats' onClick={this.redirecthandler}><i className="fa fa-comments" id="/mychats"></i></a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/' onClick={this.redirecthandler}>Home</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/user' onClick={this.redirecthandler}>Profile</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/edit' onClick={this.redirecthandler}>Profile Editor</a>
            <a className="navbar-item " style={{color:this.state.links}}  id='/logout' onClick={this.redirecthandler}>Logout</a>
        </div>
        )
        if (render){
            if (render == 1)
                return element1;
            else
                return element2;
        }
        else
            return <div/>;
    }
    filter_constructor(state){
        var element1 = (
            <div>
                <div className="container bg_white_5 columns center_b">
                    Search Filter
                </div>
                <div className="container bg_white_6 columns">
                    <div className="column">
                        <Styles opacity={this.state.value > 10 ? (this.state.value / 100) : 1} color ={this.props.color}><Slider /></Styles><Filter />
                        <div>
                            <button id="filter" className="button is-rounded is-small" onClick={(e) => this.keyHandle(e)}>Search using filters</button>
                            <div className="field">
                                <label className="label center_b search-t" >Search by name/email</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input is-small" type="text" placeholder="Name" onChange={this.searchHandle}/>
                                    <button id="exclude" className="button is-rounded is-small" onClick={(e) => this.keyHandle(e)}>Search name/email only</button>
                                    <button id="withfilter" className="button is-rounded is-small"  onClick={(e) => this.keyHandle(e)}>Search name/email using filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        var element2 = (
            <div>
            <div className="container bg_white_5 columns center_b">
                Search Filter
            </div>
            <div className="container bg_white_6 columns">
                <div className="column">
                    <Sort />
                </div>
            </div>
        </div>
        )
        if (state === 1)
            return (element1)
        if (state === 2)
            return (element2);
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
            var res = article[0] + name_tag + img_tag + this.button_constructor(id) + article[1];
        }
        else
            var res = article[0] + name_tag + img_tag + article[1];
        return(res);
    }
    button_constructor(id){
        var className = '"button is-warning is-rounded"';
        return ('<button id=' + id +' class=' + className + '>view </button>');
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
            res += '<div className="tile is-ancestor">';
            while (i < columns && data_pos < max){
                if (data[data_pos].img.img1 == 'null')
                    image = this.nll;
                else
                    image = data[data_pos].img.img1;
                temp = this.column_constructor(data[data_pos].name , image, button, data[data_pos]._id);
                res += divs.concat(temp);
                i++;
                data_pos++;
            }
            divs = "";
            i = 0;
            res += '</div>';
            j++;
        }
        return(res);
    }
}