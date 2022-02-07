import React, { Component } from 'react';
import Nav from './Nav';
import Menu from './Menu';

export default class Wrapper extends Component {
  render() {
    return (
      <>
        <Nav/>
        <Menu/>
        <div className=''>
            {this.props.children}
        </div> 
      </>
    )
  }
}
