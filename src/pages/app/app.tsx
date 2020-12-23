import React, { Component } from 'react';
import './app.pcss';
import { Button } from "../../components";

export class App extends Component {
  handleClick = () => {
    console.log('Hi');
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        <Button color={'button_blue'} type='button' onClick={this.handleClick}>Ok</Button>
      </div>
    );
  }
}
