import React, { Component } from 'react'
import actionPlayer from './index.module.css'
import pre from '../../asserts/photo/pre.png'
import play from '../../asserts/photo/play.png'
import next from '../../asserts/photo/next.png'
import mark from '../../asserts/photo/mark.png'



export default class index extends Component {

  render() {
    return (
      <div className={actionPlayer.container}>
         {/* 展示区域 */}
         <div className={actionPlayer.top}></div>
         {/* 时间轴区域 */}
         <div className={actionPlayer.center}></div>
         {/* 控制播放区域 */}
         <div className={actionPlayer.bottom}>
          <div className={actionPlayer.bottom_box}>
            <span className={actionPlayer.bottom_box_item}>
              <img src={pre} />
              <label style={{'marginLeft': '10px'}}>慢速</label>
            </span>
            <span className={actionPlayer.bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>正常</label>
              <img src={play} />
            </span>
            <span className={actionPlayer.bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>快速</label>
              <img src={next} />
            </span>
            <span className={actionPlayer.bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>标记</label>
              <img src={mark} style={{'width': '23px', 'height': '23px', 'marginTop': '8px'}}/>
            </span>
          </div>
         </div>
      </div>
    )
  }
}
