import React from 'react';

export default class Filter extends React.Component {

    onChangeGen = (e) => {
        localStorage.setItem('filter_gen', e.target.value)
    }
    onChangePref = (e) => {
        localStorage.setItem('filter_pref', e.target.value)
    }

    render() {
        return (
            <div className="control search-t padding-top">
            <label className="label center_b search-t">Gender</label>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="-1" onChange={this.onChangeGen} />
                        Male
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="1" onChange={this.onChangeGen} />
                        Female
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="gender" value="-2" onChange={this.onChangeGen} />
                        Either
                    </label>
                </div>
            <label className="label center_b search-t">With sexual pref:</label>
                <div className="center_b">
                    <label className="radio c-margin search-r">
                        <input type="radio" name="pref" value="-1" onChange={this.onChangePref} />
                        Male
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="pref" value="1" onChange={this.onChangePref} />
                        Female
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="pref" value="0" onChange={this.onChangePref} />
                        Bisexual
                    </label>
                    <label className="radio c-margin search-r">
                        <input type="radio" name="pref" value="-2" onChange={this.onChangePref} />
                        any
                    </label>
                </div>
            </div>
        )
    }
}