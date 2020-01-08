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
        var reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile.files[0]);
        reader.onloadend = function() {
            var data = {};
            data.img = {};
            data.img.img1 = reader.result;
            data.img.img2 = reader.result;
            data.img.img3 = reader.result;
            data.img.img4 = reader.result;
            data.img.img5 = reader.result;
            data.email = logged;
            console.log(data);
            axios.post('http://localhost:5001/users/edit_spec', data);
        }
    }

    render () {
        return (
        <div className="App">
            <input type="file" onChange={this.fileSelectedHandler} />
            <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
        )
    }
} 