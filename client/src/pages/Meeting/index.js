import React, { Component } from 'react';
import PlatformLanding from './components/PlatformLanding';
import SimpleFluencyForm from './components/SimpleFluencyForm';

export default class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="meeting-page">
        {/* 平台登陆引导页面 */}
        <PlatformLanding />
        {/* SimpleFluencyForm */}
        <SimpleFluencyForm />
      </div>
    );
  }
}
