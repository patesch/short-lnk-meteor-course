import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9 ) {
      this.setState({error: 'Password must be more than 8 characters long'});
      setTimeout(()=> {this.setState({error: ''});}, 3000);
      return;
    } else if (password.length > 20 ) {
      this.setState({error: 'Password must be at most 20 characters long'});
      setTimeout(()=> {this.setState({error: ''});}, 3000);
      return;
    }

    Accounts.createUser({email, password}, (err) => {
      // console.log('Signup callback', err);
      if (!!err) {
        this.setState({error: err.reason});
        setTimeout(()=>{
          this.setState({error: ''});
        },3000);
        // alert('Error message: '+err.message);
      }
    });

    // this.setState({
    //   error: 'Something went wrong'
    // });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link className="" to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
};
