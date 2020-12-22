import React, { Component } from 'react';
import './app.pcss';
import { Button } from "../../components/button/index";

export class App extends Component {
  handleClick = () => {
    console.log('Hi');
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        <Button text='Ok' onClick={this.handleClick} />
      </div>
    );
  }
}
