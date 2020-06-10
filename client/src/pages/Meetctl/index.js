import React, { Component } from 'react';
import EnhanceTable from './components/EnhanceTable';

export default class Meetctl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="meetctl-page">
        {/* 附带简单表单筛选功能的增强筛选表单 */}
        <EnhanceTable />
      </div>
    );
  }
}
