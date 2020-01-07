import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 

var lol = "i can still code!";

export default class Home extends Component {

    constructor(props){
        super(props);
        this.textChange = this.textChange.bind(this);
        this.state = {
            name: ""
        }
    }

    state = {
        selectedFile : null
    }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        // this.setState({
            // selectedFile: event.target.files[0]
        // }
        // )
    }

    fileUploadHandler = () => {
        // const fd = new FormData();
        // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        // axios.post('http://localhost:5001/users/edit_spec', fd)
        //     .then(res => {
        //         console.log(res);
        //     });
        }
    
    update = (e) => {
        e.preventDefault();
        lol = this.state.name;
        axios.post('http://localhost:5001/users/edit_spec', {"email":"meave@gmail.com", "name":lol})
            .then(res => {
            console.log("your submitting!");
            console.log(lol);
        });
    }
    
    OnchangeName = (e) => {
        this.setState({name: e.target.value})
    }

    textChange = () => {
        axios.post('http://localhost:5001/users/get_spec', {"email":"meave@gmail.com"})
            .then(res => {
            lol = res.data[0].name;
            this.setState({name: lol});
            console.log(res);
        });
        console.log(this.state.name);
    }
    
    render () {
        return (
        <div className="App">
            {/* <form onsubmit={this.update}> */}
            <form>
                <input type="text" value={this.state.name} onChange={this.OnchangeName} />
                <button onClick={this.update}>Submit</button>
            </form>
            <button onClick={this.textChange}>{lol}</button>
        </div>
        )
    }
}