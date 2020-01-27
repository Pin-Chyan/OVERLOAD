import React, { Component } from 'react';

export default class Filter extends React.Component {

    onChangeGender(e) {
        this.setState({
                new_gender: parseInt(e.target.value, 10),
                checked2: !this.state.checked2
            });
            console.log('--- new gender --- ')
          console.log(this.state.new_gender)
    }
    render() {
        return (
            <div className="control search-t padding-top">
            <label className="label center_b search-t">Gender</label>
                <div className="center_b">
                    <label className="radio">
                        <input type="radio" name="gender" value="-1" onChange={this.onChangeGender} checked={this.state.checked2}/>
                        Male
                    </label>
                    <label className="radio">
                        <input type="radio" name="gender" value="1" onChange={this.onChangeGender} checked={this.state.checked2}/>
                        Female
                    </label>
                    <label className="radio">
                        <input type="radio" name="gender" value="0" onChange={this.onChangeGender} checked={this.state.checked2}/>
                        Bisexual
                    </label>
                </div>
            </div>
        )
    }
}