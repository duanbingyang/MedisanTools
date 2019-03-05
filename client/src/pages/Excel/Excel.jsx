import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';

export default class Excel extends Component {
    static displayName = 'Excel';

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="excel-page">
                <ComplexTabTable />
            </div>
        );
    }
}
