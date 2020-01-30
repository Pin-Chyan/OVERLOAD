import React, { Component } from 'react';

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            personname: '',
            personemail: '',
            agegap: '',
            min: '',
            max: '',
        }
    }

    onChangeNameOfPerson = (e) => {
        this.setState({personname: e.target.value})
    }
    
    onChangeFinderEmail = (e) => {
        this.setState({personemail: e.target.value})
    }

    onChangeAgeGap = (e) => {
        this.setState({agegap: e.taget.value})
    }

    render() {
        return (
            <div>
                <button id="Search" className="button is-rounded is-small">Search using filters</button>
                <div className="field">
                    <label className="label center_b search-t">Tags in your search incase them in "". E.g : "tag1,tag2"</label>
                    <label className="label center_b search-t">Search by name/email?</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-small" type="text" placeholder="Name" />
                    </div>
                    <button id="Search" className="button is-rounded is-small">Search using filters</button>
                    <button id="Search" className="button is-rounded is-small">Search using filters</button>
                </div>

            </div>
        )
    }
}