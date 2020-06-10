
import React, { Component } from 'react'
//without 路由跳转依赖
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
//without 路由跳转依赖结束
import { Table, Progress, Pagination, Button } from '@alifd/next'
import { Link } from 'react-router-dom'
import IceContainer from '@icedesign/container'
import styles from  './index.module.scss'
import axios from 'axios'
import qs from 'qs'
const rootUrl = 'http://localhost:3000'

@withRouter
export default class ProgressTable extends Component {
  static displayName = 'ProgressTable';

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.componentData,
      current: 1,
    };
  }

  renderCellProgress = (value) => (
    <Progress percent={parseInt(value, 10)} />
  );

  onPageChange = (pageNo) => {
    this.setState({
      current: pageNo,
    });
  };

  addProgressNode = () => {
    const { history } = this.props;
    history.push({
      pathname: '/rdprogressadd', // 待跳转的页面URL
      state: { pageId: this.props.pageId }, // 跳转时传入的参数
    })
  }

  renderTime = (value) => {
    return (
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{moment(parseInt(value)*1000).format("YYYY-MM-DD")}</span>
      </div>
    );
  };
  
  editItem = (record, e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push({
      pathname: '/rdprogressEdit', // 待跳转的页面URL
      state: { 
        pageId: this.props.pageId,
        progressId: record.progressId,
        dataId: record.id
      }, // 跳转时传入的参数
    })
  };

  delete = (id) => {
    let pageData = this.state.dataSource
    
    for(let i = 0; i < pageData.length; i++){
      if(pageData[i]['id'] == id) {
        pageData.splice(i, 1)
      }
    }
    this.setState({
      dataSource: pageData
    })
  }

  deleteItem = (record, index, e) => {
    e.preventDefault();
    const _this = this
    let submitData = {
      'id': record.id
    }
    axios.post(`${rootUrl}/api/deleteProgressId`, qs.stringify(submitData))
      .then(res=>{
          console.log('res=>',res);
          _this.delete(record.id)     
      })
      .catch(error=>{
          console.log('res=>',error);            
      })
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        className={styles.filterTableOperation}
      >
        <a
          href="#"
          className={styles.operationItem}
          target="_blank"
          onClick={this.editItem.bind(this, record)}
        >
          编辑
        </a>
        <a href={'http://localhost:4444/#/rdprogress?id=' + record.id} className={styles.operationItem}>
          详情
        </a>
        <a 
          href="#" 
          className={styles.operationItem}
          target="_blank"
          onClick={this.deleteItem.bind(this, record, index)}
        >
          删除
        </a>
      </div>
    );
  };

  render() {
    const {location} = this.props
    return (
      <div className="progress-table">
        <IceContainer className="tab-card" title="项目节点信息">
          <Button
            onClick={this.addProgressNode}
            style={{marginBottom: '20px'}}
          >
            增加节点
          </Button>
          <Table
            getRowProps={(record, index) => {
              return {
                className: `progress-table-tr progress-table-tr${index}`
              };
            }}
            dataSource={this.state.dataSource}
          >
            <Table.Column title="序号" dataIndex="progressId" width={80} />
            <Table.Column title="项目名" dataIndex="projectName" width={200} />
            <Table.Column title="项目节点计划时间"
              dataIndex="progressTime"
              width={140}
              cell={this.renderTime}
            />
            <Table.Column title="项目主要实施节点" dataIndex="progressDetail" width={300} />
            <Table.Column title="项目节点计划费用" dataIndex="progressMoney" width={140} />
            <Table.Column title="项目节点实际费用" dataIndex="progressRealMoney" width={140} />
            <Table.Column title="项目节点完成时间"
              dataIndex="progressDeadline"
              width={140}
              cell={this.renderTime}
            />
            <Table.Column title="项目节点完成情况" dataIndex="progressDeadlineDetail" width={140} />
            <Table.Column
              title="项目节点进度"
              dataIndex="progressPercent"
              cell={this.renderCellProgress}
              width={300}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={160}
              cell={this.renderOperations}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}
