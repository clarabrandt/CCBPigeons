import React, { Component } from 'react';
import './Logo.css'

export default class Logo extends Component {
  render() {
    return (
      <div className="logo"><img src={require("./logo.png")} alt="" height='70px' width= '70px'/></div>
    )
  }
}
