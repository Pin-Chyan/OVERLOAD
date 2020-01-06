import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios'; 

export default class Home extends Component {

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
    
    render () {
        return (
        <div className="App">
            <input type="file" onChange={this.fileSelectedHandler} />
            <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
        )
    }
}