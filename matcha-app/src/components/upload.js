import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 

var logged = "meave@gmail.com";

export default class Home extends Component {

    state = {
        selectedFile : null
    }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);

        this.setState({
            selectedFile: event.target
        }
        )
    }

    fileUploadHandler = () => {
        console.log(this.state.name);
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img3 = reader.result;
            data.email = logged;
            console.log(data);
            axios.post('http://10.212.6.4:5001/users/edit_spec', data);
        }
    }

    render () {
        return (
        <div className="App">
            <input type="file" onChange={this.fileSelectedHandler} />
            <button onClick={this.fileUploadHandler,this.state.name ="ok"}>Upload</button>
        </div>
        )
    }
} 