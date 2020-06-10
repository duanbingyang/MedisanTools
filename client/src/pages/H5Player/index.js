import React, { Component } from 'react';
import ExcellentHomePage from './components/ExcellentHomePage';

export default class H5Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="h5-player-page">
        {/* 简洁大气首页 */}
        <ExcellentHomePage />
      </div>
    );
  }
}
