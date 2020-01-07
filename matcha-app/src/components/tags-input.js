import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import "../styles/tags.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
// import "../styles/debug.css";

function App() {
    const [tags, setTags] = React.useState(["NodeJs", "MongoDb"]);
    const addTags = event => {
        if (event.key === "Enter") {
            setTags([... tags, event.target.value])
            event.target.value = "";
        }
    };
    console.log(tags);
}
export default class Register extends Component {
    // constructor(props) {
    //     super(props);
    // }


    render () {
        return (
            <div className="App">
                <div className="tag-input">
                    <ul>
                        tags.map((tag, index) => (
                            <li key={index}>
                            <span>{tag}</span>
                            <i className="material-icons" onClick={() => removeTags(index)}>close</i>
                        </li>)
                        <li>
                            <span>Tag2</span>
                                <i className="material-icons">close</i>
                        </li>
                    </ul>
                    <input type="text" placeholder="press enter ot add tags" onKeyUp={addTags}/>
                </div>
            </div>
        )
    }
}