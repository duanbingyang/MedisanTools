/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Pagination, Tab, Search, Upload, Button } from '@alifd/next';
// import {Pagination} from '@alifd/next';
// import {Tab} from '@alifd/next';
// import {Search} from '@alifd/next';
// import {Upload} from '@alifd/next';
// import {Button} from '@alifd/next';

import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import SubCategoryItem from './SubCategoryItem';
import data from './data';
import axios from 'axios';
import './ComplexTabTable.scss';
const rootUrl = 'http://172.16.11.17:3000'
// const rootUrl = 'http://localhost:3000'
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
            currentPage: 1,
            search: '',
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
                <Link 
                    to={'/exceldetail?id=' + id}
                    style={styles.operation}
                >
                    详情
                </Link>
                <a href="#" style={styles.operation} target="_blank">
                    分类
                </a>
                <a
                    href="#"
                    style={styles.operation}
                    target="_blank"
                    onClick={this.editItem.bind(this, record)}
                >
                    标记三联合格
                </a>
                <a
                    href="#"
                    style={styles.operation}
                    target="_blank"
                    onClick={this.editItem.bind(this, record)}
                >
                    标记兰西合格
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
        const DateVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'medisanPurchaseValidDate']
        const medisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression', 'medisanPurchaseValidDate']
        const lxMedisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression', 'lxMedisanPurchaseValidDate']
        let sign = 1
        for(let i = 0; i<medisanVerify.length; i++){
            if(i == 5){
                console.log(record)
            }
            if(sign){
                if(record[medisanVerify[i]] > 10000){
                    record[medisanVerify[i]] > timesNow ? sign = 1 : sign = 0
                }else if(medisanVerify[i].indexOf(DateVerify) && record[medisanVerify[i]] === 0){
                    sign = 1
                }else{
                    sign = record[medisanVerify[i]]

                }
            }
        }
        record.medisanTag = sign
        return sign ? <div><span style={styles.goodsign} className="goodsign">合格</span></div> : <div><span style={styles.badsign} className="badsign">不合格</span></div>
    }
    
    renderLxJudgement = (value, index, record) => {
        const timesNow = Date.parse(new Date()) / 1000;
        const DateVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'lxMedisanPurchaseValidDate']
        const medisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'medisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        const lxMedisanVerify = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'lxMedisanPurchaseValidDate', 'receivingEntrusted', 'qualityAgreement', 'openAccountPermission', 'billingInformation', 'surveySystem', 'sealImpression']
        let sign = 1
        for(let i = 0; i<lxMedisanVerify.length; i++){
            if(sign){
                if(record[lxMedisanVerify[i]] > 10000){
                    record[lxMedisanVerify[i]] > timesNow || record[lxMedisanVerify[i]] === 0 ? sign = 1 : sign = 0
                }else if(medisanVerify[i].indexOf(DateVerify) && record[medisanVerify[i]] === 0){
                    sign = 1
                }else{
                    sign = record[lxMedisanVerify[i]]
                }
            }
        }
        record.lxMedisanTag = sign
        return sign ? <div><span style={styles.goodsign} className="goodsign">合格</span></div> : <div><span style={styles.badsign} className="badsign">不合格</span></div>
    }

    mark = (value, index, record) => {
        return (<span>{record.mark}</span>)
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
        const _this = this;
        let api;
        if(info){
            api = `${rootUrl}/api/getlist?pageno=1&&pagesize=10&&count=1&&key="company"&&selectval=${info}`
        }else{
            api = `${rootUrl}/api/getlist?pageno=1&&pagesize=10&&count=1`
        }
        axios.get(api)
            .then(function (response) {
                _this.setState({
                    viewlist: response.data.file,
                    dataCount: response.data.count,
                    search: info,
                    currentPage: 1
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

    handleChange = (pageno, search) => {
        const _this = this;
        let api = `${rootUrl}/api/getlist?pageno=${pageno}&&pagesize=10`
        console.log(search)
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
                            title="许可证有效期"
                            dataIndex="publishStatus"
                            width={60}
                            cell={this.renderLicenseValidDate}
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
                            title="资质合格-三联"
                            dataIndex="publishStatus"
                            width={10}
                            cell={this.renderMedisanJudgement}
                        />
                        <Table.Column
                            title="资质合格-兰西"
                            dataIndex="publishStatus"
                            width={10}
                            cell={this.renderLxJudgement}
                        />
                        <Table.Column
                            title="备注"
                            dataIndex="mark"
                            width={10}
                            cell={this.mark}
                        />
                        <Table.Column
                            title="操作"
                            dataIndex="operation"
                            width={120}
                            cell={this.renderOperations}
                        />
                    </Table>
                    <div style={styles.pagination}>
                        <Pagination
                            current = {this.state.currentPage}
                            pageSize = {10}
                            onChange = {(current)=>{this.handleChange(current, this.state.search)}}
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
    // goodsign: {
    //     display: 'inline-block',
    //     padding: "5px 10px",
    //     color: "rgb(82, 196, 26)",
    //     background: "rgb(246, 255, 237)",
    //     border: "1px solid rgb(183, 235, 143)",
    //     borderRadius: "4px",
    //     minWidth: "58px",
    //     textAlign: "center"
    // },
    // badsign: {
    //     display: 'inline-block',
    //     padding: "5px 10px",
    //     color: "rgb(252,137,137)",
    //     background: "rgb(252,240,240)",
    //     border: "1px solid rgb(252,201,201)",
    //     borderRadius: "4px",
    //     minWidth: "58px",
    //     textAlign: "center"
    // }
};
