import React, { Component } from "react";
import axios from "axios";

const Login = ({ user, onSignOut }) => {
  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

class SignInForm extends Component {
  constructor() {
    super();
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handlePasswordEdit = this.handlePasswordEdit.bind(this);
  }

  signInControl(e) {
    e.preventDefault();
    console.log(this.state);
    // let email = this.email.value;
    // this.onSignIn(email);
  }

  handleEmailEdit = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordEdit = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="LoginContainer">
        <h1>Login</h1>
        <form onSubmit={this.signInControl.bind(this)}>
          <input
            type="string"
            id="login"
            ref="email"
            onChange={this.handleEmailEdit}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            onChange={this.handlePasswordEdit}
            ref="password"
            placeholder="Password"
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  signIn(email, password) {
    this.setState({
      user: {
        email,
        password,
      },
    });
  }

  signOut() {
    this.setState({
      user: null,
    });
  }

  render() {
    return (
      <div className="LoginForm">
        {this.state.user ? (
          <Login user={this.state.user} onSignOut={this.signOut.bind(this)} />
        ) : (
          <SignInForm onSignIn={this.signIn.bind(this)} />
        )}
      </div>
    );
  }
}

export default UserLogin;
