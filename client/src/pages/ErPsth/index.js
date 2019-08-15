import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class ErPsth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="er-psth-page">
        {/* 可筛选过滤的用户类表格 */}
        <UserTable />
      </div>
    );
  }
}
