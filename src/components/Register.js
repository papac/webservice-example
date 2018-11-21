import React, { Component } from "react"
import Footer from './Footer'

class Register extends Component {
  render() {
    return (
      <form className="form-signin">
        <img className="mb-4" src="/img/mail.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Registration</h1>

        <label for="inputName" class="sr-only">Full Name</label>
        <input type="email" id="inputName" class="form-control" placeholder="Full Name" required autofocus />

        <label for="inputEmail" className="sr-only">Adresse mail</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

        <label for="inputPassword" className="sr-only">Mot de passe</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Stay connected
          </label>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
        <Footer />
      </form>
    )
  }
}

export default Register;