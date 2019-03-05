import React, { Component } from 'react';
import ColumnForm from './components/ColumnForm';

export default class Exceldetail extends Component {
  static displayName = 'Exceladddetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="excelAddDetail-page">
        <ColumnForm {...this.props}/>
      </div>
    );
  }
}
