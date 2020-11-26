export default class Search extends React.Component {

    onChangeNameOfPerson = (e) => {
        this.setState({value: e.target.value})
    }
    
    onChangeFinderEmail = (e) => {
        this.setState({value: e.target.value})
    }

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Min-Age</label>
                    <div className="control has-icons-left has-icons-right">
                        {/* <input className="input" type="text" placeholder="Email" onChange={this.onChangeFinderEmail} required /> */}
                        <input className="input" type="text" placeholder="Enail" required />
                    </div>
                </div>
                
                <div className="field">
                    <label className="label">Max-Age</label>
                    <div className="control has-icons-left has-icons-right">
                        {/* <input className="input" type="text" placeholder="Name Of Person" onChange={this.onChangeNameOfPerson} required /> */}
                        <input className="input" type="text" placeholder="Name" required />
                    </div>
                </div>
            </div>
        )
    }
}