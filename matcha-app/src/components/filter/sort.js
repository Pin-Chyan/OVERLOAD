import React, { Component } from 'react';

export default class Filter extends React.Component {

    onChangeSort = (e) => {
        localStorage.setItem('filter_gen', e.target.value)
    }


    render() {
        return (
            <div className="control search-t padding-top">
            <label className="label center_b search-t">Order By</label>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="-1" onChange={this.onChangeSort} />Age
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="1" onChange={this.onChangeGSort} />Location
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="1" onChange={this.onChangeGSort} />Fame
                    </label>
                </div>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="order" value="-1" onChange={this.onChangeSort} />ascending
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="order" value="1" onChange={this.onChangeGSort} />descending
                    </label>
                </div>
            </div>
        )
    }
}