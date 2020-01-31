import React from 'react';

export default class Filter extends React.Component {

    onChangeSortMeth = (e) => {
        localStorage.setItem('sort_method', e.target.value)
    }
    onChangeSortOrder = (e) => {
        localStorage.setItem('sort_order', e.target.value)
    }


    render() {
        return (
            <div className="control search-t padding-top">
            <label className="label center_b search-t">Order By</label>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="Location" onChange={this.onChangeSortMeth} />Location
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="Fame" onChange={this.onChangeSortMeth} />Fame
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="method" value="Age" onChange={this.onChangeSortMeth} />Age
                    </label>
                </div>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="order" value="ascending" onChange={this.onChangeSortOrder} />ascending
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="order" value="descending" onChange={this.onChangeSortOrder} />descending
                    </label>
                </div>
            </div>
        )
    }
}