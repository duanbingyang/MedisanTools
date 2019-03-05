import React, { Component } from 'react';
import ColumnForm from './components/ColumnForm';

export default class Exceldetail extends Component {
  static displayName = 'Exceldetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="exceldetail-page">
        <ColumnForm {...this.props}/>
      </div>
    );
  }
}
