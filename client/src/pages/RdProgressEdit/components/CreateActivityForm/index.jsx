import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
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
// const rootUrl = 'http://localhost:3000'
//腾讯云服务地址
const rootUrl = 'http://49.234.40.20:3000'  
const pageHistory = createBrowserHistory()

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: "12", s: "4", l: "4", },
  wrapperCol: { s: "12", l: "10", }
};

@withRouter
export default class Index extends Component {
  static displayName = 'Index';

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pageId: '',
      value: {
        projectName: 'test',
        progressId: '1.1',
        progressTime: '',
        progressDetail: '',
        progressMoney: 0,
        progressRealMoney: 0,
        progressDeadline: '',
        progressDeadlineDetail: '',
        progressPercent: '',
      },
    };
  }

  componentDidMount() {
    const _this = this
    let id = this.props.location.state.dataId
    let pageId = this.props.location.state.pageId
    axios.get(`${rootUrl}/api/selectProgressNodeUseId?id=${id}`)
      .then(res=>{
          console.log('res=>',res)
          let pageData = res.data.data[0]
          pageData.progressDeadline = moment(parseInt(pageData.progressDeadline)*1000).format("YYYY-MM-DD")
          pageData.progressTime = moment(parseInt(pageData.progressTime)*1000).format("YYYY-MM-DD")

          _this.setState({
            value: res.data.data[0]
          })
      })
      .catch(error=>{
          console.log('res=>',error)      
      })



      
    this.setState({
      pageId: pageId
    })
  }


  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {

  };

  
  pageJump = (obj) => {
    this.props.history.push('/rdprogress?id=' + obj.data.pageId)
  }

  submit = (value, error) => {
    const _this = this
    if (error) {
      // 处理表单报错
    }else{
    // 提交当前填写的数据
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      value.progressTime = moment(value.progressTime).unix()
      value.progressDeadline = moment(value.progressDeadline).unix()
      value.projectId = this.state.pageId
      axios.post(`${rootUrl}/api/editProgressNode`, qs.stringify(value))
      .then(res=>{
          console.log('res=>',res);
          _this.pageJump({
            url: '/rdprogress?id=' + _this.state.pageId,
            data: {
              pageId: _this.state.pageId
            }
          })          
      })
      .catch(error=>{
          console.log('res=>',error);            
      })
    }
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="项目进度增加节点" className={styles.container}>
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

              <FormItem {...formItemLayout} label="项目节点序号："
                required
                requiredMessage="项目节点序号必须填写"
              >
                <Input name="progressId" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="项目节点计划时间：" 
                required
                requiredMessage="项目节点计划时间必须填写">
                <DatePicker style={{width: '100%'}} name="progressTime" />
              </FormItem>
              
              {/* <FormItem {...formItemLayout} label="项目节点计划时间：">
                <Select
                  name="area"
                  dataSource={[
                    { label: '区域一', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
              </FormItem> */}


              <FormItem {...formItemLayout} label="项目主要实施节点："
                required
                requiredMessage="项目主要实施节点必须填写"
              >
                <Input name="progressDetail" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="项目节点计划费用："
                required
                requiredMessage="项目节点计划费用必须填写"
              >
                <Input name="progressMoney" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="项目节点实际费用："
              >
                <Input name="progressRealMoney" className={styles.inputWidth} />
              </FormItem>
              
              <FormItem {...formItemLayout} label="项目节点完成时间：" 
              >
                <DatePicker name="progressDeadline" style={{width: '100%'}} />
              </FormItem>
              
              <FormItem {...formItemLayout} label="项目节点完成情况："
              >
                <Input name="progressDeadlineDetail" className={styles.inputWidth} />
              </FormItem>

              <FormItem {...formItemLayout} label="项目节点完成百分比："
              >
                <Input name="progressPercent" className={styles.inputWidth} />
              </FormItem>

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
              </FormItem>

              <FormItem {...formItemLayout} label="特殊资源：">
                <RadioGroup
                  name="resource"
                  dataSource={[
                    { label: '线上品牌商赞助', value: '线上品牌商赞助' },
                    { label: '线下场地免费', value: '线下场地免费' },
                  ]}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="活动形式：">
                <Input.TextArea name="extra" className={styles.inputWidth} />
              </FormItem> */}
              <FormItem {...formItemLayout} label=" ">
                <Form.Submit type="primary" validate onClick={this.submit}>
                  确认修改
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


