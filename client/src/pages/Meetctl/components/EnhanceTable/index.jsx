/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab, Search } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import axios from 'axios';
import data from './data';
import styles from './index.module.scss';
const rootUrl = 'http://localhost:3000'

export default class EnhanceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'solved',
      userInfo: [],
      given: true
    };
  }

  componentDidMount() {
    const _this = this;
    axios.get(`${rootUrl}/api/meetdetail`)
        .then(function (response) {
           console.log(response)
            _this.setState({
                userInfo: response.data.data,
            });
        })
        .catch(function (error) {
            console.log(error);
            _this.setState({
                isLoaded: false,
                error: error
            })
        })
  }

  renderTitle = (value, index, record) => {
    return (
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    const _this = this;
    let api = `${rootUrl}/api/given`

    axios.post(api,{
      phone: record.phone
    })
    .then(function (response) {
        _this.setState({
            viewlist: response.data.file,
        });
    })
    .catch(function (error) {
        console.log(error);
        _this.setState({
            isLoaded: false,
            error: error
        })
    })
  };

  givenFn = (record, e) => {
    e.preventDefault();
    console.log(record,'============')
    const _this = this;
    let newUserInfo = _this.state.userInfo;
    let api = `${rootUrl}/api/given`;
    let index = -1;

    axios.post(api,{
      phone: record.phone,
      given: !record.given
    })
    .then(function (response) {
      newUserInfo.forEach((item, i)=>{
        if (item.id === record.id) {
          index = i;
        }
      })
      if (index !== -1) {
        newUserInfo[index].given = !record.given;
        
        _this.setState({
          userInfo: newUserInfo
        });
      } 
    })
    .catch(function (error) {
        console.log(error);
        _this.setState({
            isLoaded: false,
            error: error
        })
    })
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className={styles.enhanceTableOperation}
      >
        <a
          href="#"
          className={record.given ? styles.operation + ' ' + styles.alreadyGiven : styles.operation}
          target="_blank"
          onClick={this.givenFn.bind(this, record)}
        >
          {record.given ? '撤回' : '发放'}
        </a>
        <a href="#" className={styles.operation} target="_blank">
          详情
        </a>
        <a href="#" className={styles.operation} target="_blank">
          撤回
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  renderGiven= (value) => {
    console.log(value, '======================================')
    return (
      <span className={ value ? styles.unGivenStatus : styles.givenStatus }>
        {value ? '已发放' : '待发放'}
      </span>
    );
    
  }

  handleChange = (pageno, search) => {
    const _this = this;
    let api = `${rootUrl}/api/meetdetail?pageno=${pageno}&&pagesize=10`
    if(!!this.state.search){
        api = api + `&&count=1&&key="company"&&selectval=${this.state.search}`
    }
    axios.get(api)
        .then(function (response) {
            _this.setState({
                viewlist: response.data.file,
                currentPage: pageno
            });
        })
        .catch(function (error) {
            console.log(error);
            _this.setState({
                isLoaded: false,
                error: error
            })
        })
  }

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  onTabChange = (tabKey) => {
    this.setState({
      activeKey: tabKey,
    });
    this.queryCache.activeKey = tabKey;

    if (tabKey === 'solved') {
      this.fetchData();
    } else if (tabKey === 'needFix') {
      this.fetchData();
    } else {
      console.log(`你点击了 ${tabKey}`);
    }
  };

  onSearch = (value) => {
    this.queryCache.keywords = value.key;
    this.fetchData();
  };
  

  render() {
    return (
      <div>
        <IceContainer className={styles.card}>
          <div>
            <Tab
              onChange={this.onTabChange}
              size="small"
              shape="text"
              activeKey={this.state.activeKey}
              contentStyle={{ display: 'none' }}
            >
              <Tab.Item
                key="solved"
                title={
                  <span>
                    已解决 <span className={styles.tabCount}>123</span>
                  </span>
                }
              />
              <Tab.Item
                key="needFix"
                title={
                  <span>
                    待解决 <span className={styles.tabCount}>10</span>
                  </span>
                }
              />
              <Tab.Item
                key="needValidate"
                title={
                  <span>
                    待验证 <span className={styles.tabCount}>2</span>
                  </span>
                }
              />
            </Tab>
          </div>
          <div className={styles.extraFilter}>
            <Search
              className={styles.search}
              type="primary"
              style={{width: 150}}
              placeholder="搜索"
              searchText=""
              onSearch={this.onSearch}
            />
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.userInfo}
            className="basic-table"
            // style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="姓名"
              dataIndex="username"
              width={320}
            />
            <Table.Column
              title="性别"
              dataIndex="sex"
              width={85}
            />
            <Table.Column
              title="手机号"
              dataIndex="phone"
              width={150}
            />
            <Table.Column
              title="所在地"
              dataIndex="address_prov"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="工作单位"
              dataIndex="company"
              width={320}
              cell={this.renderStatus}
            />
            <Table.Column
              title="状态"
              dataIndex="given"
              width={85}
              cell={this.renderGiven}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div className={styles.pagination}>
          <Pagination
          />
          </div>
        </IceContainer>
      </div>
    );
  }
}
