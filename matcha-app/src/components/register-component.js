import React, { Component } from 'react';
import "../styles/overload.css";
import "../styles/helpers.css";
import "../styles/index.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
// import "../styles/debug.css";

/* check if image was uploaded */

//display error is any field is invalid

//Send post req to add user
    /* display error if email is alredy in use */
    /* display any other error */

//goto login page
    /* route user to login if registration was sucessfull */
    /* route user to home if already logged in */

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangePwdCon = this.onChangePwdCon.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            surname: '',
            age: '',
            pwd: '',
            pwdCon: '',
            email: '',
            gender: '',
            img: '',
            registered: false,
            pwdErr: '',
            pwdConErr: '',
            nameErr: '',
            surnameErr: '',
            ageErr: '',
            emailErr: '',
            genderErr: '',
            imageErr: '',
        };
    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeSurname(e) {
        this.setState({surname: e.target.value});
    }

    onChangePwd(e) {
        this.setState({pwd: e.target.value});
    }    

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    onChangePwdCon(e) {
        this.setState({pwdCon: e.target.value});
    }

    onChangeAge(e) {
        this.setState({age: e.target.value});
    }

    onChangeGender = e => {
        this.setState({gender: e.target.value});
    }

    validateForm = () => {
        const values = this.state;
        let valid = true;

        if (values.name.trim() === "") {
            valid = false;
            this.setState({nameErr: 'Please fill in your name!'});    
        } else if (!values.name.match(/^[A-Za-z]+$/)) {
            valid = false;
            this.setState({nameErr: 'Your name can only contain letters!'});   
        } else {
            this.setState({nameErr: ''});
        }

        if (values.surname.trim() === "") {
            valid = false;
            this.setState({surnameErr: 'Please fill in your surname!'});    
        } else if (!values.surname.match(/^[A-Za-z]+$/)) {
            valid = false;
            this.setState({surnameErr: 'Your surname can only contain letters!'});   
        } else {
            this.setState({surnameErr: ''});
        }

        if (values.age === "") {
            valid = false;
            this.setState({ageErr: 'Please fill in your age!'});    
        } else if (!values.age.match(/^[0-9]+$/)) {
            valid = false;
            this.setState({ageErr: 'Your age can only contain numbers'});
        } else if (values.age.length > 3) {
            valid = false;
            this.setState({ageErr: 'invalid age'});
        } else {
            let age = parseInt(values.age);
            if (age < 18) {
                valid = false;
                this.setState({ageErr: 'You must 18 years or older to join!'});
            } else if (age > 125) {
                valid = false;
                this.setState({ageErr: "You're too old bruh!"});
            }
            else {
                this.setState({ageErr: ''});
            }
        }

        if (values.pwd === "") {
            valid = false;
            this.setState({pwdErr: 'Please fill in your password!'});    
        } else {
            if (values.pwd.length < 5) {
                valid = false;
                this.setState({pwdErr: 'Password has to more than 5 characters'});
            } else if (!values.pwd.match(/[A-Z]+/)) {
                valid = false;
                this.setState({pwdErr: 'Your needs to contain uppercase letters!'});
            } else if (!values.pwd.match(/[0-9]+/)) {
                valid = false;
                this.setState({pwdErr: 'Your needs to contain numbers!'});
            } else {
                this.setState({pwdErr: ''});
            }
        }

        if (values.pwdCon === "") {
            valid = false;
            this.setState({pwdConErr: 'Please fill in your confimation password!'});
        } else {
            if (values.pwd !== values.pwdCon) {
                this.setState({pwdConErr: "Passwords don't match"});
            } else {
                this.setState({pwdConErr: ''});
            }
        }

        if (values.email === "") {
            valid = false;
            this.setState({emailErr: 'Please fill in your email!'});    
        } else {
            if (!values.email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/)){
                valid = false;
                this.setState({emailErr: 'Invalid email address!'});  
            } else {
                this.setState({emailErr: ''});
            }
        }

        if (values.gender === "") {
            valid = false;
            this.setState({genderErr: 'Select your gender!'});    
        } else {
            this.setState({genderErr: ''});
        }
        return valid;
    }


    /* Add onChangeImage */
    
    onSubmit = async e => {
            e.preventDefault();
        

            // const data = {
            //     name: this.state.name,
            //     surname: this.state.surname,
            //     pwd: this.state.pwd,
            //     age: this.state.age,
            // };
            // console.log(data);

            if (this.validateForm()) {
                axios.get()
            }
            //test is email is available

        }
    render () {
        return (
        <section className="section hero">
            <div className="hero-head">
                <div className="columns is-mobile is-marginless heading has-text-weight-bold">
                    <div className="column left">
                        <figure className="navbar-item image">
                        <a href="./">
                            <img src={require('../images/logo.png')} className="logo_use" alt="Why is this logo broken"/>
                        </a>
                        </figure>
                    </div>
                    <div className="column right">
                        <div className="control is-small has-icons-right">
                            <input className="input is-hovered is-small is-rounded" type="text" placeholder="Search" />
                            <span className="icon is-small is-right">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <p className="navbar-item has-text-white desktop">SIGN IN </p>
                        <figure className="navbar-item image has-text-white center">
                            <i className="fa fa-bars"></i>
                        </figure>
                    </div>
                </div>
            </div>
        {/* <div className="container"> */}
            <div className="columns is-centered shadow">
                <div className="column is-half bg_white">
                    <div className="column center">

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Name" value={this.state.name} onChange={this.onChangeName} required/>
                            </div>
                            <p className="help is-danger">{this.state.nameErr}</p>
                        </div>

                        <div className="field">
                            <label className="label">Surname</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Surname" value={this.state.surname} onChange={this.onChangeSurname} required/>
                            </div>
                            <p className="help is-danger">{this.state.surnameErr}</p>
                        </div>

                        <div className="field">
                            <label className="label">Age</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Age" value={this.state.age} onChange={this.onChangeAge} required/>
                            </div>
                            <p className="help is-danger">{this.state.ageErr}</p>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" value={this.state.pwd} onChange={this.onChangePwd} required/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{this.state.pwdErr}</p>
                        </div>

                        <div className="field">
                            <label className="label">Password Comfirm</label>
                            <div className="control has-icons-left">
                                <input className="input" type="password" placeholder="Confirm Password" value={this.state.pwdCon} onChange={this.onChangePwdCon} required/>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{this.state.pwdConErr}</p>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email input" value={this.state.email} onChange={this.onChangeEmail} required />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fa fa-exclamation-triangle"></i>
                                </span>
                            </div>
                            <p className="help is-danger">{this.state.emailErr}</p>
                        </div>


                        <div className="field">
                            <label className="label">Gender</label>
                            <div className="control">
                                <label className="radio">
                                    <input type="radio" name="question" value="male" onChange={this.onChangeGender} checked={this.state.gender === 'male'}/>
                                    Male
                                </label>
                                <label className="radio">
                                    <input type="radio" name="question" value="female" onChange={this.onChangeGender} checked={this.state.gender === 'female'}/>
                                    Female
                                </label>
                            </div>
                            <p className="help is-danger">{this.state.genderErr}</p>
                        </div>

                        <div className="file has-name is-fullwidth field is-right">
                            <label className="file-label">
                                <input className="file-input" type="file" name="resume" />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fa fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span className="file-name">
                                    image...
                                </span>
                            </label>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-warning is-rounded" onClick={this.onSubmit}>Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-warning is-rounded is-light">Cancel</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
    </section>
        )
    }
}