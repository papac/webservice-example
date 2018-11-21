import React, { Component } from 'react'

const CompagnItem = ({title, view, count}) => {
  return (
    <div className="media text-muted pt-3">
      <img src="/img/paper-plane.svg" alt="" width="32" height="32" className="mr-2 rounded" />
      <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <div className="d-flex justify-content-between align-items-center w-100">
          <strong className="text-gray-dark"> {{ title }} </strong>
          <a href={{link}}>{{ view }}</a>
        </div>
        <span className="d-block"> {{ count }} </span>
      </div>
    </div>
  )
}

class Compagn extends Component {
  render() {
    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h6 className="border-bottom border-gray pb-2 mb-0">{title} <span className="badge badge-pill bg-light align-text-bottom">{count}</span></h6>
        {[...Array(5)].map(compagn => <CompagnItem {...compagn} />)}
        <small class="d-block text-right mt-3">
          <a href=" {{link}} "> {{ all_campaigns }} </a>
        </small>
      </div>
    )
  }
}

export default Compagn;