import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button } from '@alifd/next';
import styles from './index.module.scss';
import emitter from "./../../ev"

const { Item: StepItem } = Step;
const { Group: ButtonGroup } = Button;

export default class SimpleStep extends Component {
  static displayName = 'SimpleStep';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      totalFinishSign: true,
      itemFinishSign: true,
      currentObj: {},
      pageData: this.props.componentData,
      activeKey: [
        [
          {
            id:1,
            progressId: '1.1',
            progress: 100,
            projectName: 'aaa',
          },{
            id:2,
            progressId: '1.2',
            progress: 30,
            projectName: 'bbb'
          }
        ],[
            {
            id:3,
            progressId: '2',
            progress: 100,
            projectName: 'ccc',
          }
        ],[
          {
            id:1,
            progressId: '1.1',
            progress: 100,
            projectName: 'aaa',
          },{
            id:2,
            progressId: '1.2',
            progress: 30,
            projectName: 'bbb'
          }
        ],[
          {
            id:1,
            progressId: '1.1',
            progress: 100,
            projectName: 'aaa',
          },{
            id:2,
            progressId: '1.2',
            progress: 30,
            projectName: 'bbb'
          }
        ]
      ],
    };
  }

  componentDidMount() {
    const _this = this;
    // 声明一个自定义事件
    // 在组件装载完成以后
    this.eventEmitter = emitter.addListener("callMe", (id)=>{
      
      let Arr = []
      for(let i = 0; i < this.state.activeKey.length; i++){
        let newData = this.state.activeKey[i].filter(function(item) {
          return item['id'] != id;
        });
        if(newData && newData.length) {
          Arr.push(newData)
        }
      }


      this.setState({
        activeKey: Arr
      })
    });
    this.initData(this.state.pageData)
  }

    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener('callMe', this.eventEmitter._events.callMe);
    }

  initData(arr) {
    let initArr = []
    let itemArr = []
    let thisCurrentMain = 0
    let thisCurrentObj = {
      currentMain: '',
      current1: '',
    }
    let childSign = true  //子节点进度中断标记，用于前一子节点没完成，但是后边节点已完成的情况
    let mainSign = true   //主节点进度中断标记，用于前一主节点没完成，但是后边节点已完成的情况
    let mainNodeOfChildNodeAddSign = true   //由于主节点和子节点同在一个数组中，同时主节点的进度与子节点的进度相互独立。所以如果子节点有未完成的，那么图示进度会比实际进度少1，故而以此开关对有子节点的项目增加1平衡差值
    for(let i = 0; i < arr.length; i++) {
      let arrItem = arr[i]
      let progressId = arrItem['progressId']
      let progressIdSplit = progressId.split('.')
      let nextArrItem = i < arr.length-1 ? arr[i + 1] : []
      let nextProgressId = i < arr.length-1 ? nextArrItem['progressId'] : ''
      let nextProgressIdSplit = i < arr.length-1 ?  nextProgressId.split('.') : []

      itemArr.push({
        'id': arrItem.id,
        'progressId': arrItem.progressId,
        'progressPercent': arrItem.progressPercent,
        'projectName': arrItem.projectName
      })

      if( !progressIdSplit[1] ){
        //主节点
        if( arrItem.progressPercent == 100 ) {
          //完成的主节点
          if(progressIdSplit[0] != nextProgressIdSplit[0]) {
            //无子节点的主节点
            mainSign ? thisCurrentObj['currentMain'] = thisCurrentObj['currentMain'] ? thisCurrentObj['currentMain'] + 1 : 1 : ''
            
            initArr.push(itemArr)
            itemArr = []
            mainNodeOfChildNodeAddSign = true
          }
        }else{
          //未完成的主节点
          if(progressIdSplit[0] != nextProgressIdSplit[0]) {
            initArr.push(itemArr)
            itemArr = []
          }
          mainSign = false
        }
        childSign = true
      }else{
        //子节点
          if(mainNodeOfChildNodeAddSign){
            thisCurrentObj['current' + progressIdSplit[0]] = thisCurrentObj['current' + progressIdSplit[0]] ? parseInt(thisCurrentObj['current' + progressIdSplit[0]]) + 1 : 1
            mainNodeOfChildNodeAddSign = false
          }
          if(arrItem.progressPercent == 100) {
            //完成的子节点
            if(childSign) {
              thisCurrentObj['current' + progressIdSplit[0]] = thisCurrentObj['current' + progressIdSplit[0]] ? parseInt(thisCurrentObj['current' + progressIdSplit[0]]) + 1 : 1
            }
            if(progressIdSplit[0] == nextProgressIdSplit[0]) {
              //不是最后一个子节点
            }else{
              //最后一个子节点
              if(childSign) {
                thisCurrentObj['current' + progressIdSplit[0]] = thisCurrentObj['current' + progressIdSplit[0]] ? parseInt(thisCurrentObj['current' + progressIdSplit[0]]) + 1 : 2
                thisCurrentMain = thisCurrentMain + 1
                mainSign ? thisCurrentObj['currentMain'] = thisCurrentObj['currentMain'] ? thisCurrentObj['currentMain'] + 1 : 1 : ''
              }
              initArr.push(itemArr)
              itemArr = []
              mainNodeOfChildNodeAddSign = true
            }
            
          }else{
            //未完成的子节点
            if(progressIdSplit[0] == nextProgressIdSplit[0]) {
            //不是最后一个子节点
            }else{
              //最后一个子节点
              initArr.push(itemArr)
              itemArr = []
              mainNodeOfChildNodeAddSign = true
            }
            childSign = false
            mainSign = false
            
        }
      }
    }
    this.setState({
      activeKey: initArr,
      currentMain: thisCurrentMain,
      currentObj: thisCurrentObj,
    })
  }

  onClick = (currentStep) => {
    this.setState({
      currentStep,
    });
    this.props.nodeClickCallback(currentStep)
  };

  mainProgress = (arr) => {
    let Options =arr.map((station, i)=> {
      return <StepItem title='' key={i} onClick={this.onClick} />
    })
    return (<Step current={ this.state.currentObj.currentMain ? this.state.currentObj.currentMain : 0 } >
      {Options}
    </Step>)
  }

  childProgress = (arr) => {
    let Options = []
    let childProgressItem = arr.map((station, i) => {
      if( station.length > 1){
        Options.push(
          <div key={'childProgress' + i} 
            className="RdStepBox" 
            style={{
              display: 'inline-block', 
              verticalAlign: 'top', 
              width: i==arr.length-1 ? 'auto' : parseInt(100/arr.length) + '%'
            }}
          >
            <Step 
              shape="dot" 
              direction="ver" 
              current={
                this.state.currentObj['current' + station[0].progressId] ? 
                this.state.currentObj['current' + station[0].progressId] :
                this.state.currentObj['current' + station[0].progressId] == 0 ? 
                this.state.currentObj['current' + station[0].progressId] + 1 :
                0 } 
            >
              {station.map((indexData, i) => <StepItem key={'node' + i} title={indexData.progressId + ' ' + indexData.projectName} onClick={this.onClick} />)}
            </Step>
          </div>
        )
      }else{
        Options.push(<div key={'childProgress' + i} className="RdStepBox" style={{display: 'inline-block', verticalAlign: 'top', visibility:'hidden', width: i==arr.length-1 ? 'auto' : parseInt(100/arr.length) + '%'}}><Step shape="dot" direction="ver" ></Step></div>)
      }
    })
    return Options
  }

  render() {
    const { currentStep } = this.state;

    return (
      <IceContainer title="项目节点">
        
        {this.mainProgress(this.state.activeKey)}

        <div style={{textAlign: 'center'}} className={styles.nextStep}> 
          {this.childProgress(this.state.activeKey)}
        </div>
      </IceContainer>
    );
  }
}


