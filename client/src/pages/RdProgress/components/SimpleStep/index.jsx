import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Button } from '@alifd/next';
import styles from './index.module.scss';

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
    console.log(this.props.componentData)
    this.initData(this.props.componentData)
  }

  initData(arr) {
    let initArr = []
    let itemArr = []
    let thisCurrentMain = 0
    let thisCurrentItem = 0
    let lastProgressIdSign = '1'
    let thisCurrentObj = {
      currentMain: '',
      current1: '',
    }
    let childSign = true  //子节点进度中断标记，用于前一子节点没完成，但是后边节点已完成的情况
    let mainSign = true   //主节点进度中断标记，用于前一主节点没完成，但是后边节点已完成的情况
    for(let i = 0; i < arr.length; i++) {
      let arrItem = arr[i]
      let progressId = arrItem['progressId']
      let progressIdSplit = progressId.split('.')
      let nextArrItem = i < arr.length-1 ? arr[i + 1] : []
      let nextProgressId = i < arr.length-1 ? nextArrItem['progressId'] : ''
      let nextProgressIdSplit = i < arr.length-1 ?  nextProgressId.split('.') : []

      // if(progressIdSplit[0] != lastProgressIdSign) {
      //   initArr.push(itemArr)
      //   itemArr = []
      // }

      itemArr.push({
        'id': arrItem.id,
        'progressId': arrItem.progressId,
        'progressPercent': arrItem.progressPercent,
        'projectName': arrItem.projectName
      })
      
      // if(!progressIdSplit[1] && arrItem.progressPercent == 100){
      //   thisCurrentMain = parseInt(progressIdSplit[0])
      // }


      if( !progressIdSplit[1] ){
        //主节点
        if( arrItem.progressPercent == 100 ) {
          if(progressIdSplit[0] != nextProgressIdSplit[0]) {
            //无子节点的主节点
            mainSign ? thisCurrentObj['currentMain'] = thisCurrentObj['currentMain'] ? thisCurrentObj['currentMain'] + 1 : 1 : ''
            
            initArr.push(itemArr)
            itemArr = []
          }
        }else{
          if(progressIdSplit[0] != nextProgressIdSplit[0]) {
            initArr.push(itemArr)
            itemArr = []
          }
          mainSign = false
        }
        childSign = true
      }else{
        //子节点
          if(arrItem.progressPercent == 100) {
            //完成的子节点
            if(childSign) {
              thisCurrentObj['current' + progressIdSplit[0]] = thisCurrentObj['current' + progressIdSplit[0]] ? parseInt(thisCurrentObj['current' + progressIdSplit[0]]) + 1 : 1
              if(progressIdSplit[0] == nextProgressIdSplit[0]) {
                //不是最后一个子节点
              }else{
                //最后一个子节点
                  thisCurrentObj['current' + progressIdSplit[0]] = thisCurrentObj['current' + progressIdSplit[0]] ? parseInt(thisCurrentObj['current' + progressIdSplit[0]]) + 1 : 2
                  thisCurrentMain = thisCurrentMain + 1
                  mainSign ? thisCurrentObj['currentMain'] = thisCurrentObj['currentMain'] ? thisCurrentObj['currentMain'] + 1 : 1 : ''

                  
                  initArr.push(itemArr)
                  itemArr = []

              }
            }
          }else{
          //未完成的子节点
          if(progressIdSplit[0] == nextProgressIdSplit[0]) {
            //不是最后一个子节点
          }else{
            //最后一个子节点
              initArr.push(itemArr)
              itemArr = []
          }
          childSign = false
          mainSign = false
        }
      }
      lastProgressIdSign = progressIdSplit[0]
      if(i == arr.length-1) {
        initArr.push(itemArr)
      }
    }
    initArr.pop()
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
    console.log(arr)
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
        Options.push(<div key={'childProgress' + i} className="RdStepBox" style={{display: 'inline-block', verticalAlign: 'top', width: i==arr.length-1 ? 'auto' : parseInt(100/arr.length) + '%'}}><Step shape="dot" direction="ver" current={ this.state.currentObj['current' + station[0].progressId] ? this.state.currentObj['current' + station[0].progressId] : 0 } >{station.map((indexData, i) => <StepItem key={'node' + i} title={indexData.progressId + ' ' + indexData.projectName} onClick={this.onClick} />)}</Step></div>)
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


