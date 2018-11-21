import React, { Component } from 'react'

const CompagnItem = ({email, name}) => {
  return (
    <div className="media text-muted pt-3">
      <img src="/img/contact.svg" alt="" width="32" height="32" className="mr-2 rounded" />
      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark"> { name } </strong>
        <span>{ email }</span>
      </p>
    </div>
  )
}

class Contact extends Component {
  render() {
    return (
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0"> {title} </h6>
        {[...Array(5)].map(contact => <ContactItem {...contact} />)}
        <small class="d-block text-right mt-3">
          <a href="{{link}}"> All</a>
        </small>
      </div>
    )
  }
}

export default Contact;