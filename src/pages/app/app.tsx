import React, { Component } from 'react';

import { Button } from "../../components";

import './app.pcss';
import 'normalize.css';

export class App extends Component {
  handleClick = () => {
    console.log('Hi');
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        <Button onClick={this.handleClick}>Ok</Button>
      </div>
    );
  }
}
