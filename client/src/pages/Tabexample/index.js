import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';

export default class Tabexample extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tabexample-page">
        <ComplexTabTable />
      </div>
    );
  }
}
