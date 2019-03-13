import React,  { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';
import SubCategoryItem from './../../../Excel/components/ComplexTabTable/SubCategoryItem';
import { Upload, Input, Button, Select, Grid, Tab, Search, DatePicker, CascaderSelect, Switch  } from '@alifd/next';
import axios from 'axios';
import moment from 'moment';
import distData from '../../../../components/DistPickerData/distPickerData'
moment().format();
const rootUrl = 'http://172.16.11.17:3000'
// const rootUrl = 'http://localhost:3000'
const { Row, Col } = Grid;


export default class ColumnForm extends Component {
    static displayName = 'ColumnForm';

    static propTypes = {};

    static defaultProps = {};


    constructor(props, context) {
        super(props, context);
        this.state = {
            distValue: null,
            distSelectData: [],
            edit: false,
            value: {
                contractId: '',
                operator: '',
                settleAccount: '',
                period: '',
                currency: '',
                editor: '',
                businessLicenseValidDate: '',
                businessLicenseValidForever: '',
                licenseValidDate: '',
                licenseValidForever: '',
                GSPLicenseValidDate: '',
                GSPLicenseValidForever: '',
                medisanPurchaseValidDate: '',
                medisanPurchaseValidForever: '',
                lxMedisanPurchaseValidDate: '',
                lxMedisanPurchaseValidForever: '',
                purchasePersonName: '',
                receivingEntrusted: '',
                qualityAgreement: '',
                openAccountPermission: '',
                billingInformation: '',
                surveySystem: '',
                sealImpression: '',
                recordDate: '',
                positionId: '',
                company: '',
                province: '',
                legalPersonName: '',
                registeredCapital: '',


            },
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
            ],
        };
    }

    componentWillMount(){
        if(this.props.location.search && this.props.location.search.indexOf('id') != -1){
            this.resetDetail()
        }
    }

    resetDetail = (ctx) => {
        const _this = this;
        const id = this.props.location.search
        axios.get(`${rootUrl}/api/detail${id}`)
            .then(function (response) {
                const res = response.data.file
                const timeKey = ['businessLicenseValidDate', 'licenseValidDate', 'GSPLicenseValidDate', 'medisanPurchaseValidDate', 'lxMedisanPurchaseValidDate', 'recordDate']
                for(let key in res){
                    if(res[key]){
                        console.log(timeKey.indexOf(key))
                        if(timeKey.indexOf(key) != -1){
                            res[key] = moment(res[key] * 1000)
                        }
                    }
                }
                _this.setState({
                   value: res
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

    onFormChange = (value) => {
        this.setState({
            value,
        });
    };

    reset = () => {
        this.setState({
            value: {
                contractId: '',
                operator: '',
                settleAccount: '',
                period: '',
                currency: '',
            },
        });
    };

    submit = () => {
        this.formRef.validateAll((error, value) => {
            console.log('error', error, 'value', value);
            if (error) {
                // 处理表单报错
            }
            // 提交当前填写的数据
        });
    };

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

    distSelected = (obj) => {
        console.log(obj)
    }

    distHandleChange = (value, data, extra) => {
        this.setState({
            distValue: value
        });
    }

    dateForeverOnChange = (checked) => {
        console.log(`switch to ${checked}`);
    }
    

    render() {
        const { tabList } = this.state;
        return (
            <div className="column-form">
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
                        headers={{'Access-Control-Allow-Credentials': true}}
                        defaultValue={[
                            {
                                name: "IMG.png",
                                status: "done",
                                size: 1024,
                                downloadURL:
                                    "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                                fileURL:
                                    "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                                imgURL:
                                    "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                            }
                        ]}
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
                <IceContainer title="资质详情" style={styles.container}>
                    <IceFormBinderWrapper
                        ref={(formRef) => {
                            this.formRef = formRef;
                        }}
                        value={this.state.value}
                        onChange={this.onFormChange}
                    >
                        <div>
                            <Row wrap>
                                <Col xxs="24" s="12" l="12">
                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            录入人编号：
                                        </Col>

                                        <Col s="12" l="12">
                                            <IceFormBinder
                                                name="editor"
                                                required
                                                asterisk
                                                message="合同编号必须填写"
                                            >
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="editor" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            公司名称：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder
                                                name="company"
                                                message="公司名称必须填写"
                                            >
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="company" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            省市区县：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="province">
                                                <CascaderSelect 
                                                    style={{ width: '100%' }} 
                                                    changeOnSelect={true} 
                                                    value={this.state.value.province} 
                                                    dataSource={distData} 
                                                    onChange={this.distHandleChange} 
                                                    listStyle={{ width: 'auto', height: '260px' }}
                                                />
                                            </IceFormBinder>
                                            <IceFormError name="province" />
                                        </Col>
                                    </Row>
                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            法人：
                                        </Col>

                                        <Col s="12" l="12">
                                            <IceFormBinder
                                                name="legalPersonName"
                                                message="法人必须填写"
                                            >
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="legalPersonName" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            注册资金（万元）：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="registeredCapital">
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="registeredCapital" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            采购人：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="purchasePersonName">
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="purchasePersonName" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            营业执照有效期：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="businessLicenseValidDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                            <Switch checkedChildren="on" onChange={this.dateForeverOnChange} unCheckedChildren="off" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            许可证有效期：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="licenseValidDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            GSP证书有效期：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="GSPLicenseValidDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            哈三联采购委托有效期：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="medisanPurchaseValidDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            兰西采购委托有效期：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="lxMedisanPurchaseValidDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            收货委托协议：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="receivingEntrusted">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            质保协议：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="qualityAgreement">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            开户许可：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="openAccountPermission">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            开票信息：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="billingInformation">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            调查体系：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="surveySystem">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            印章印模：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="sealImpression">
                                                <Select
                                                    className="next-form-text-align"
                                                    style={{ width: '100%' }}
                                                    dataSource={[
                                                        { label: '完备', value: 1 },
                                                        { label: '不具备', value: 0 },
                                                        { label: '不需要', value: 2 },
                                                    ]}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            档案存放代码：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="positionId">
                                                <Input style={{ width: '100%' }} />
                                            </IceFormBinder>
                                            <IceFormError name="positionId" />
                                        </Col>
                                    </Row>

                                    <Row style={styles.formItem}>
                                        <Col xxs="8" s="6" l="5" style={styles.formLabel}>
                                            整理时间：
                                        </Col>
                                        <Col s="12" l="12">
                                            <IceFormBinder name="recordDate">
                                                <DatePicker
                                                    format="YYYY年MM月DD日" 
                                                    onChange={console.log(123)} 
                                                    style={{ width: '100%' }}
                                                />
                                            </IceFormBinder>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row style={styles.btns}>
                                <Col xxs="8" s="2" l="2" style={styles.formLabel}>
                                    {' '}
                                </Col>
                                <Col s="12" l="10">
                                    <Button type="primary" onClick={this.submit}>
                                        保存
                                    </Button>
                                    <Button style={styles.resetBtn} onClick={this.reset}>
                                        重置
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </IceFormBinderWrapper>
                </IceContainer>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingBottom: 0,
    },
    formItem: {
        height: '28px',
        lineHeight: '28px',
        marginBottom: '30px',
    },
    formLabel: {
        textAlign: 'right',
    },
    btns: {
        margin: '25px 0',
    },
    resetBtn: {
        marginLeft: '20px',
    },
    tabExtra: {
        display: 'flex',
        alignItems: 'center',
    },
};
