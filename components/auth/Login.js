import React, { Component } from 'react';

import LoginForm from './LoginForm';
import Auth from '../../lib/Auth';

export default class Login extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: 'george@george.com',
        password: 'password'
      }
    };
  }

  handleEmailChange = (e) => {
    const user = Object.assign({}, this.state.user, { email: e.nativeEvent.text });
    this.setState({ user });
    console.log(this.state.user);
  }

  handlePasswordChange = (e) => {
    const user = Object.assign({}, this.state.user, { password: e.nativeEvent.text });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
      .then(response => response.json())
      .then(res => {
        Auth.setToken(res.data.token);
        console.log('logged in');
      })
      .catch(err => console.error(err));

    // Axios
    //   .post('http://localhost:4000/api/login', this.state.user)
    //   .then(res => {
    //     Auth.setToken(res.data.token);
    //     this.props.setUser(res.data.user);
    //     console.log('logged in');
    //   })
    //   .catch(err => {
    //     this.setState({ errors: err.response.data });
    //   });
  }

  render() {
    return (
      <LoginForm
        user={this.state.user}
        errors={this.state.errors}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
