import React, { Component } from 'react';
import './scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      name: '',
    }
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLoginClick() {
    this.setState(state => ({ login: !state.login }));
  }

  submit() {
    if (this.state.login) {
      this.login()
    }else {
      // sign up
    }
  }

  login = async (e) => {

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    });
    const body = await response.text();

    console.log(body)
  }  

  render() {
    const { login, email, password, name } = this.state

    return (
      <div className="App">
        <div className="SignUp">
          <h1 className="primary-heading">{!login ? 'Sign Up' : 'Login'}</h1>

          <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

          <a href="#0" className="btn btn-dark-blue">Continue with BankID</a>
          <a href="#0" className="btn btn-fb-blue">Continue with Facebook</a>

          <div>
            <form className="form">
              <div className="u-margin-top-bottom-small">
                <h2 className="secondary-heading">
                  {!login ? 'Sign Up' : 'Login'} using email
                </h2>
              </div>

              {!login &&
                <div className="form__group">
                  <input name="name" id="name" type="text" className="form__input" placeholder="Full Name" onChange={this.handleChange} value={name} required />
                  <label for="name" className="form__label">First & Last Name</label>
                </div>
              }


              <div className="form__group">
                <input name="email" id="email" type="email" className="form__input" placeholder="Email" onChange={this.handleChange} value={email} required />
                <label for="email" className="form__label">Email</label>
              </div>

              <div className="form__group">
                <input name="password" id="password" type="password" className="form__input" placeholder="Password" onChange={this.handleChange} value={password} required />
                <label for="password" className="form__label">Password</label>
              </div>

              <div className="form__group">
                <input id="terms" type="checkbox" className="form__checkbox" required />
                <label for="terms" className="">
                  I have read and I accept the
                                  <a href="#0">Terms and conditions</a>
                </label>
              </div>

              <div className="u-margin-top-bottom-small">
                <a className="btn btn-light-blue" href="#0" onClick={this.submit}>{!login ? 'Create Account' : 'Login'}</a>
              </div>
            </form>
          </div>
        </div>
        <span>
          {!login ? "Already have an account?" : "Stil not a member?"}
          <a href="#0" onClick={this.handleLoginClick}>
            {!login ? "Login" : "Sign up"}
          </a>
        </span>
      </div>
    );
  }
}

export default App;
