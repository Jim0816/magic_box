import React, { Component } from 'react'
import { message } from 'antd';
import switchAnalysis from './index.module.css'
import floor from '../../asserts/photo/floor.png'
import logo1 from '../../asserts/photo/logo1.png'
import logo2 from '../../asserts/photo/logo2.png'
import bubble from '../../asserts/photo/bubble.png'

import ActionPlayer from '../../components/ActionPlayer'

export default class index extends Component {

  state = {
  };


  constructor(props) {
    super(props)
   }

   componentDidMount() {
   }

 
  render() {
    return (
      <div className={switchAnalysis.container}>
        <div className={switchAnalysis.box}>
          <div className={switchAnalysis.box_left}>
            <div className={switchAnalysis.box_left_top}>
              <div className={switchAnalysis.box_left_top_box}>
                <span className={switchAnalysis.box_left_top_box_bg}>
                  <img src={floor} style={{'width': '100%', 'height': '100%'}}/>
                </span>
                <img src={logo1} style={{'position': 'absolute', 'top': '50px', 'left': '100px', 'width': '40px', 'height': '40px'}} />
                <img src={logo2} style={{'position': 'absolute', 'top': '180px', 'left': '160px', 'width': '40px', 'height': '40px'}} />
                <div className={switchAnalysis.box_left_top_box_bubble} style={{'left': '150px', 'top': '10px'}}>
                  <div style={{'position': 'relative', 'width': '100%', 'height': '100%'}}>
                    <img src={bubble} style={{'position': 'absolute', 'top': '0px', 'left': '0px', 'width': '100%', 'height': '100%'}} />
                    <span className={switchAnalysis.box_left_top_box_bubble_content}>
                      <label>12:00:04</label>
                      <br/>
                      <label>网络发生切换</label>
                    </span>
                  </div>
                </div>
                
                
              </div>
            </div>
            <div style={{'width': '100%', 'height': '10px'}}></div>
            <div className={switchAnalysis.box_left_bottom}>
              <span className={switchAnalysis.box_left_bottom_title}>原始报文展示</span>
              <span className={switchAnalysis.box_left_bottom_content}></span>
            </div>
          </div>
          <div className={switchAnalysis.box_right}>
            {/* <div className={switchAnalysis.box_right_top}>
              <span className={switchAnalysis.box_right_top_select}>
              <label style={{'fontSize': '18px', 'lineHeight': '50px', 'fontWeight': 'bold'}}>选择来源: </label>
              </span>
              <span className={switchAnalysis.box_right_top_events}>
                <label style={{'fontSize': '18px', 'lineHeight': '50px', 'fontWeight': 'bold'}}>事件定义: </label>
                <span className={switchAnalysis.box_right_top_events_item} style={{'backgroundColor': '#EDC931'}}>网络切换</span>
                <span className={switchAnalysis.box_right_top_events_item} style={{'backgroundColor': '#00FEFD'}}>网络零界</span>
                <span className={switchAnalysis.box_right_top_events_item} style={{'backgroundColor': '#FF6705'}}>状态变更</span>
                <span className={switchAnalysis.box_right_top_events_item} style={{'backgroundColor': '#43FFC0'}}>事件添加</span>
              </span>
            </div>
            
            <div className={switchAnalysis.box_right_bottom}>
              <ActionPlayer/>
            </div> */}
            <ActionPlayer/>
          </div>
        </div>
      </div>
    )
  }

}
