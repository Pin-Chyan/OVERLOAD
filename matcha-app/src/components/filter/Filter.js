import React, { Component } from 'react';

export default class Filter extends React.Component {

    onChangeGender = (e) => {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <div className="control search-t padding-top">
            <label className="label center_b search-t">Sexual Preference</label>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="-1" onChange={this.onChangeGender} />
                        Male
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="1" onChange={this.onChangeGender} />
                        Female
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="0" onChange={this.onChangeGender} />
                        Bisexual
                    </label>
                </div>
            </div>
        )
    }
}