import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    if (Meteor.loggingIn())
      window.browserHistory.push('/links');
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      // console.log(err);
      if (!!err) {
        this.setState({error: err.reason});
        setTimeout(()=>{
          this.setState({error: ''});
        },3000);
        // alert('Error message: '+err.message);
      } else {
        window.browserHistory.push('/links');
      }
    });
  }
  render() {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Short Lnk</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined }
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>
            <Link to="/signup">Need an account?</Link>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
};
