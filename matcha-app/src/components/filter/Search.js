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
                <div className="field padding-top">
                    <label className="label center_b search-t">E-Mail</label>
                    <div className="control has-icons-left has-icons-right">
                        {/* <input className="input" type="text" placeholder="Email" onChange={this.onChangeFinderEmail} required /> */}
                        <input className="input is-small" type="text" placeholder="Email" required />
                    </div>
                </div>
                
                <div className="field">
                    <label className="label center_b search-t">Name Of Person</label>
                    <div className="control has-icons-left has-icons-right">
                        {/* <input className="input" type="text" placeholder="Name Of Person" onChange={this.onChangeNameOfPerson} required /> */}
                        <input className="input is-small" type="text" placeholder="Name" required />
                    </div>
                </div>
                
                <div className="field">
                    <label className="label center_b search-t">Age Gap</label>
                    <div className="control has-icons-left has-icons-right">
                        {/* <input className="input" type="text" placeholder="Age Gap" onChange={this.onChangeAgeGap} required /> */}
                        <input className="input is-small" type="text" placeholder="Age Gap" required />
                        <label className="radio c-margin center_t search-r">
                            <input type="radio" name="sort" value="-1" onChange={this.on} />
                            Ascending
                        </label>
                        <label className="radio c-margin center_t search-r">
                            <input type="radio" name="sort" value="1" onChange={this.on} />
                            Descending
                        </label>
                    </div>
                </div>

                <button id="Search" className="button is-warning is-rounded is-small">Search</button>
            </div>
        )
    }
}