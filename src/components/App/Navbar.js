import React, { Component } from "redux"

class Navbar extends Component {
  render() {
    return (
      <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-blue rounded shadow-sm">
        <img className="mr-3" src="/img/user.svg" alt="" width="48" height="48" />
        <div className="lh-100">
          <h6 className="mb-0 text-white lh-100">{{ username }} </h6>
          <small>{{ compaign_record }}</small>
        </div>
        <div style="float: right; margin-left: 700px;">
          <ul className="menu-action">
            <li><a href="{{link}}"> <img src="/img/email.svg" alt="" width="32" height="32"/> </a></li>
            <li><a href="{{link}}"> <img src="/img/new-user.svg" alt="" width="32" height="32"/> </a></li>
            <li><a href="{{link}}"> <img src="/img/logout.svg" alt="" width="32" height="32"/> </a></li>
          </ul>
        </div>
      </div>
    )
  }
}