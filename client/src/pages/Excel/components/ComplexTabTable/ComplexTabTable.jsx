/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import { Table, Pagination, Tab, Search, Upload, Button } from '@alifd/next';
import {Table} from '@alifd/next';
import {Pagination} from '@alifd/next';
import {Tab} from '@alifd/next';
import {Search} from '@alifd/next';
import {Upload} from '@alifd/next';
import {Button} from '@alifd/next';

import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import SubCategoryItem from './SubCategoryItem';
import data from './data';
import axios from 'axios';
import './ComplexTabTable.scss';
const rootUrl = 'http://localhost:3000'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default class ComplexTabTable extends Component {
    static displayName = 'ComplexTabTable';

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.queryCache = {};
        this.state = {
            isMobile: false,
            currentTab: 'solved',
            currentCategory: '1',
            tabList: [
                {
                    text: '已解决',
                    count: '123',
                    type: 'solved',
                    subCategories: [
                        {
                            text: '申请账号失败',
                            id: '1',
                        },
                        {
                            text: '粉丝数为0',
                            id: '2',
                        },
                        {
                            text: '空间不足',
                            id: '3',
                        },
                        {
                            text: '系统报错',
                            id: '4',
                        },
                        {
                            text: '网络异常',
                            id: '5',
                        },
                        {
                            text: '不在范围',
                            id: '6',
                        },
                    ],
                },
                {
                    text: '待解决',
                    count: '10',
                    type: 'needFix',
                    subCategories: [
                        {
                            text: '网络异常',
                            id: '21',
                        },
                        {
                            text: '空间不足',
                            id: '22',
                        },
                    ],
                },
                {
                    text: '待验证',
                    count: '32',
                    type: 'needValidate',
                    subCategories: [
                        {
                            text: '系统报错',
                            id: '34',
                        },
                        {
                            text: '网络异常',
                            id: '35',
                        },
                        {
                            text: '不在范围',
                            id: '36',
                        },
                    ],
                },
            ],
            viewlist: [],
        };
    }

    componentDidMount() {
        const _this = this;
        axios.get(`${rootUrl}/api/getlist?pageno=1&&pagesize=10&&count=1`)
            .then(function (response) {
                _this.setState({
                    viewlist: response.data.file,
                    dataCount: response.data.count
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

    componentWillUnmount() {
        source.cancel('Operation canceled by the user.');
      }

    renderTitle = (value, index, record) => {
        return (
            <div style={styles.titleWrapper}>
                <span style={styles.title}>{record.company}</span>
            </div>
        );
    };

    editItem = (record, e) => {
        e.preventDefault();
        // TODO: record 为该行所对应的数据，可自定义操作行为
    };

    detialItem = (record, e) => {
        console.log(this.context.router)

        

        e.preventDefault();
        // TODO: record 为该行所对应的数据，可自定义操作行为
    }

    renderOperations = (value, index, record) => {
        const id = record.id
        return (
            <div style={styles.complexTabTableOperation}>
                <a
                    href="#"
                    style={styles.operation}
                    target="_blank"
                    onClick={this.editItem.bind(this, record)}
                >
                    解决
                </a>
                <Link 
                    to={'/exceldetail?id=' + id}
                    style={styles.operation}
                >
                    详情
                </Link>
                <a href="#" style={styles.operation} target="_blank">
                    分类
                </a>
            </div>
        );
    };

    renderPos = (value, index, record) => {
        return (<span>{record.positionId}</span>)
    }

    renderMedisanTime = (value, index, record) => {
        return (<span>{this.unixTimeToTime(record.medisanPurchaseValidDate)}</span>)
    }

    renderLxTime = (value, index, record) => {
        return (<span>{this.unixTimeToTime(record.lxMedisanPurchaseValidDate)}</span>)
    }

    renderLicenseValidDate = (value, index, record) => {
        return (<span>{this.unixTimeToTime(record.licenseValidDate)}</span>)
    }

    renderPositionId = (value, index, record) => {
        return (<span>{record.positionId}</span>)
    }

    renderMedisanJudgement = (value, index, record) => {
        const timesNow = Date.parse(new Date()) / 1000;
        const basicVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        const medisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'medisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        const lxMedisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'lxMedisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        let sign = record.medisanPurchaseValidDate
        for(let i = 0; i<basicVerify.length; i++){
            if(sign){
                if(record[basicVerify[i]] > 10000){
                    record[basicVerify[i]] > timesNow ? sign = 1 : sign = 0
                }else{
                    sign = record[basicVerify[i]]
                }
            }
        }
        record.medisanTag = sign
        return sign ? <span>合格</span> : <span>不合格</span>
    }
    
    renderLxJudgement = (value, index, record) => {
        const timesNow = Date.parse(new Date()) / 1000;
        const basicVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        const medisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'medisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        const lxMedisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'lxMedisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        let sign = record.lxMedisanPurchaseValidDate
        for(let i = 0; i<basicVerify.length; i++){
            if(sign){
                if(record[i] > 10000){
                    record[i] > timesNow ? sign = 0 : sign = 1
                }else{
                    sign = record[i]
                }
            }
        }
        record.medisanTag = sign
        return sign ? <span>合格</span> : <span>不合格</span>
    }

    renderStatus = (value) => {
        return (
            <IceLabel inverse={false} status="default">
                {value}
            </IceLabel>
        );
    };

    changePage = (currentPage) => {
        this.queryCache.page = currentPage;
        this.fetchData();
    };

    onTabChange = (tabKey) => {
        const firstTabCatId = this.state.tabList.find((item) => {
            return item.type === tabKey;
        }).subCategories[0].id;

        this.setState({
            currentTab: tabKey,
            currentCategory: firstTabCatId,
        });
        this.queryCache.catId = firstTabCatId;
        this.fetchData();
    };

    unixTimeToTime = (unixTime) => {
        if(unixTime){
            var time = new Date(unixTime * 1000);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            return y + '年' + this.add0(m) + '月' + this.add0(d) + '日';
        }else if(unixTime === 0){
            return '长期'
        }else{
            return ''
        }
    }

    add0 = (m) => {return m<10?'0'+m:m }

    onSubCategoryClick = (catId) => {
        this.setState({
            currentCategory: catId,
        });
        this.queryCache.catId = catId;
        this.fetchData();
    };

    fetchData = () => {
        console.log("add fetch data response")
    }

    renderTabBarExtraContent = () => {
        return (
            <div style={styles.tabExtra}>
                <Search
                    style={styles.search}
                    type="secondary"
                    placeholder="搜索"
                    searchText=""
                    onSearch={(info) => {this.onSearch(info)}}
                />
            </div>
        );
    };

    onSearch = (info) => {
        console.log(info)
        const _this = this;
        axios.get(`${rootUrl}/api/getlist?pageno=1&&pagesize=10&&count=1&&key="company"&&selectval=${info}`)
            .then(function (response) {
                _this.setState({
                    viewlist: response.data.file,
                    dataCount: response.data.count,
                    search: info.key
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

    beforeUpload = (info) => {
        console.log("beforeUpload callback : ", info);
    }

    onChange = (info) => {
        console.log("onChane callback : ", info);
    }

    onSuccess = (info) => {
        console.log('onSuccess callback:', info)
    }

    onRemove = (info) => {
        console.log('onRemove callback:', info)
    }

    onError = (err) => {
        console.log('onError callback:', err)
    }

    handleChange = (pageno) => {
        const _this = this;
        let api = `${rootUrl}/api/getlist?pageno=${pageno}&&pagesize=10`
        if(this.state.search){
            api = api + `&&count=1&&key="company"&&selectval=${this.state.search}`
        }
        axios.get(api)
            .then(function (response) {
                _this.setState({
                    viewlist: response.data.file,
                });
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    isLoaded: false,
                    error: error
                })
            })
    }

    render() {
        const { tabList } = this.state;
        return (
            <div className="complex-tab-table">
                <IceContainer>
                    <Upload
                        listType="text"
                        action={`${rootUrl}/api/uploadfile`} // 该接口仅作测试使用，业务请勿使用
                        accept="*"
                        // accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                        data={{ token: "abcd" }}
                        beforeUpload={this.beforeUpload}
                        onChange={this.onChange}
                        onSuccess={this.onSuccess}
                        onRemove={this.onRemove}
                        onError={this.onError}
                        defaultValue={[]}
                    >
                        <Button type="primary" style={{ margin: "0 0 10px" }}>
                            上传文件
                        </Button>
                    </Upload>
                    <Tab
                        onChange={this.onTabChange}
                        shape="pure"
                        currenttab={this.state.currentTab}
                        contentStyle={{
                        padding: 0,
                        }}
                        extra={
                        !this.state.isMobile ? this.renderTabBarExtraContent() : null
                        }
                    >
                        {tabList && tabList.length > 0
                        ? tabList.map((tab) => {
                            return (
                                <Tab.Item
                                key={tab.type}
                                title={
                                    <span>
                                    {tab.text}
                                    <span style={styles.tabCount}>{tab.count}</span>
                                    </span>
                                }
                                >
                                {tab.subCategories && tab.subCategories.length > 0
                                    ? tab.subCategories.map((catItem, index) => {
                                        return (
                                        <SubCategoryItem
                                            {...catItem}
                                            isCurrent={
                                            catItem.id === this.state.currentCategory
                                            }
                                            onItemClick={this.onSubCategoryClick}
                                            key={index}
                                        />
                                        );
                                    })
                                    : null}
                                </Tab.Item>
                            );
                            })
                        : null}
                    </Tab>
                </IceContainer>
                <IceContainer>
                    <Table
                        dataSource={this.state.viewlist}
                        className="basic-table"
                        style={styles.basicTable}
                        hasBorder={false}
                    >
                        <Table.Column
                            title="资质企业"
                            cell={this.renderTitle}
                            width={200}
                        />
                        <Table.Column
                            title="档案存放代码" 
                            dataIndex="type" 
                            width={30} 
                            cell={this.renderPos}
                        />
                        <Table.Column
                            title="哈三联委托有效期"
                            dataIndex="publishTime"
                            width={60}
                            cell={this.renderMedisanTime}
                            
                        />
                        <Table.Column
                            title="兰西委托有效期"
                            dataIndex="publishStatus"
                            width={60}
                            cell={this.renderLxTime}
                        />
                        <Table.Column
                            title="许可证有效期"
                            dataIndex="publishStatus"
                            width={60}
                            cell={this.renderLicenseValidDate}
                        />
                        <Table.Column
                            title="资质合格-三联"
                            dataIndex="publishStatus"
                            width={30}
                            cell={this.renderMedisanJudgement}
                        />
                        <Table.Column
                            title="资质合格-兰西"
                            dataIndex="publishStatus"
                            width={30}
                            cell={this.renderLxJudgement}
                        />
                        <Table.Column
                            title="操作"
                            dataIndex="operation"
                            width={60}
                            cell={this.renderOperations}
                        />
                    </Table>
                    <div style={styles.pagination}>
                        <Pagination
                            pageSize = {10}
                            onChange = {(current)=>{this.handleChange(current)}}
                            total={this.state.dataCount}
                        />
                    </div>
                </IceContainer>
            </div>
        );
    }
}

const styles = {
    complexTabTableOperation: {
        lineHeight: '28px',
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        marginLeft: '10px',
        lineHeight: '20px',
    },
    operation: {
        marginRight: '12px',
        textDecoration: 'none',
    },
    tabExtra: {
        display: 'flex',
        alignItems: 'center',
    },
    search: {
        marginLeft: 10,
    },
    tabCount: {
        marginLeft: '5px',
        color: '#3080FE',
    },
    pagination: {
        textAlign: 'right',
        paddingTop: '26px',
    },
};
