import React, { Component } from 'react';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Form,
} from '@alifd/next';
import axios from 'axios';
import qs from 'qs';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
// const rootUrl = 'http://localhost:3000'
//腾讯云服务地址
const rootUrl = 'http://49.234.40.20:3000'  


const formItemLayout = {
  labelCol: { xxs: "6", s: "2", l: "2", },
  wrapperCol: { s: "12", l: "10", }
};

export default class Index extends Component {
  static displayName = 'Index';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        projectName: 'test',
        initTime: '',
        department: '',
        submitPerson: '',
        projectManager: '',
        RD_Manager: '',
        money: ''
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {

  };

  submit = (value, error) => {
    if (error) {
      // 处理表单报错
    }else{
      // 提交当前填写的数据
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      value.initTime = moment(value.initTime).unix()
      axios.post(`${rootUrl}/api/addProgress`, qs.stringify(value))
      .then(res=>{
          console.log('res=>',res);            
      })
      .catch(error=>{
          console.log('res=>',error);            
      })
    }
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="新建项目" className={styles.container}>
          <Form
            value={this.state.value}
            onChange={this.onFormChange}
          >
              <FormItem {...formItemLayout} label="项目名称："
                required
                requiredMessage="项目名称必须填写"
              >
                <Input name="projectName" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="申请时间：" >
                <DatePicker name="initTime" />
              </FormItem>

              <FormItem {...formItemLayout} label="所属部门：">
                <Select
                  name="department"
                  dataSource={[
                    { label: '制剂研发部', value: 'location1' },
                    { label: '包材研发部', value: 'location2' },
                    { label: '合成研发部', value: 'location3' },
                  ]}
                />
              </FormItem>

              
              <FormItem {...formItemLayout} label="提交人："
                required
                requiredMessage="提交人必须填写"
              >
                <Input name="submitPerson" className={styles.inputWidth} />
              </FormItem>
              
              <FormItem {...formItemLayout} label="项目经理："
                required
                requiredMessage="项目经理必须填写"
              >
                <Input name="projectManager" className={styles.inputWidth} />
              </FormItem>
              
              <FormItem {...formItemLayout} label="研发平台负责人："
                required
                requiredMessage="研发平台负责人必须填写"
              >
                <Input name="RD_Manager" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="项目预算："
                required
                requiredMessage="项目预算必须填写"
              >
                <Input name="money" className={styles.inputWidth} />
              </FormItem>

              {/* <FormItem {...formItemLayout} label="即时配送：">
                <Switch name="delivery" />
              </FormItem> */}

              {/* <FormItem {...formItemLayout} label="活动性质：">
                <CheckboxGroup
                  name="type"
                  dataSource={[
                    { label: '美食线上活动', value: '美食线上活动' },
                    { label: '地推活动', value: '地推活动' },
                    { label: '线下主题活动', value: '线下主题活动' },
                    { label: '单纯品牌曝光', value: '单纯品牌曝光' },
                  ]}
                />
              </FormItem> */}

              {/* <FormItem {...formItemLayout} label="特殊资源：">
                <RadioGroup
                  name="resource"
                  dataSource={[
                    { label: '线上品牌商赞助', value: '线上品牌商赞助' },
                    { label: '线下场地免费', value: '线下场地免费' },
                  ]}
                />
              </FormItem> */}

              {/* <FormItem {...formItemLayout} label="活动形式：">
                <Input.TextArea name="extra" className={styles.inputWidth} />
              </FormItem> */}

              <FormItem {...formItemLayout} label=" ">
                <Form.Submit type="primary" validate onClick={this.submit}>
                  立即创建
                  </Form.Submit>
                <Form.Reset className={styles.resetBtn} onClick={this.reset}>
                  重置
                  </Form.Reset>
              </FormItem>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

