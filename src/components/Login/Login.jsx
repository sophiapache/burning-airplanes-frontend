import React, { Component } from "react";

const Login = ({ user, onSignOut }) => {
  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

class SignInForm extends Component {
  signInControl(e) {
    e.preventDefault();
    let email = this.email.value;
    this.props.onSignIn(email);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.signInControl.bind(this)}>
          <input type="string" id="login" ref="email" placeholder="Email" />
          <input type="submit" value="login" />
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

  signIn(email) {
    this.setState({
      user: {
        email,
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
