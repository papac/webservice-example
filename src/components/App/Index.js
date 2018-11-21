import React, { Component } from 'react'
import Compagn from './Campaig'
import Contact from './Contact'
import Navbar from './Navbar'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Compagn />
        <Contact />
      </React.Fragment>
    )
  }
}