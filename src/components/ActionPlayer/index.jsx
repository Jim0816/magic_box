import React, { Component } from 'react'
import actionPlayer from './index.module.css'
import pre from '../../asserts/photo/pre.png'
import play from '../../asserts/photo/play.png'
import next from '../../asserts/photo/next.png'
import mark from '../../asserts/photo/mark.png'
import red_label from '../../asserts/photo/red_label.png'
import dir_up from '../../asserts/photo/dir_up.png'
import dir_down from '../../asserts/photo/dir_down.png'


const entity_list = ['协议栈0', '协议栈1', '协议栈2', '协议栈3', '协议栈4', '协议栈5']
const time_list = ['9:02', '9:03', '9:04', '9:05', '9:06', '9:07', '9:08', '9:09', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15','9:16', '9:17', '9:18', '9:19', '9:20', '9:21', '9:22', '9:23', '9:24', '9:25', '9:26', '9:27', '9:28', '9:29']
const item_width = 100
const label_list = ['9:03', '9:12']
const entity_margin_top = 80
const action_list = [
  {'time': '9:03', 'direction': [0,1]},
  {'time': '9:05', 'direction': [0,3]},
  {'time': '9:06', 'direction': [0,4]},
  {'time': '9:09', 'direction': [5,2]},
  {'time': '9:13', 'direction': [5,1]}
]


export default class index extends Component {
  componentDidMount(){
    //console.log(data)
  }



  render() {
    var locations = {}
    for (let i = 0 ; i < time_list.length ; i++){
      locations[time_list[i]] = item_width * i
    }

    return (
      <div className={actionPlayer.container}>
        <div className={actionPlayer.container_top}>
          <span className={actionPlayer.container_top_select}>
            <label style={{'fontSize': '18px', 'lineHeight': '50px', 'fontWeight': 'bold'}}>选择来源: </label>
          </span>
          <span className={actionPlayer.container_top_events}>
            <label style={{'fontSize': '18px', 'lineHeight': '50px', 'fontWeight': 'bold'}}>事件定义: </label>
            <span className={actionPlayer.container_top_events_item} style={{'backgroundColor': '#EDC931'}}>网络切换</span>
            <span className={actionPlayer.container_top_events_item} style={{'backgroundColor': '#00FEFD'}}>网络零界</span>
            <span className={actionPlayer.container_top_events_item} style={{'backgroundColor': '#FF6705'}}>状态变更</span>
            <span className={actionPlayer.container_top_events_item} style={{'backgroundColor': '#43FFC0'}}>事件添加</span>
          </span>
        </div>

        {/* 事件图层 */}
        <div className={actionPlayer.container_center}>
          <div className={actionPlayer.container_center_left}>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
              {entity_list.map((item, index) => {
                return(
                  <span key={index} className={actionPlayer.container_center_left_entity} style={{top: entity_margin_top * (index + 1) + 'px'}}>
                    <span className={actionPlayer.container_center_left_entity_left}>{item}</span>
                    <span className={actionPlayer.container_center_left_entity_right}></span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className={actionPlayer.container_center_right}>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
              {/* 背景层 */}
              <div className={actionPlayer.container_center_right_bg}></div>

              {/* 每个对象的基准线层*/}
              <div className={actionPlayer.container_center_right_line}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  {entity_list.map((item, index) => {
                    return(
                      <span key={index} className={actionPlayer.container_center_right_line_dot} style={{top: entity_margin_top * (index + 1) + 14.5 + 'px'}}></span>
                    );
                  })}
                </div>
              </div>

              {/* 动作绘制层*/}
              <div className={actionPlayer.container_center_right_action}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  {/* 方向线 */}
                  {action_list.map((item, index) => {
                    let left_offset = locations[item.time] - 16
                    let start = entity_margin_top * (item.direction[0] + 1) + 5
                    let end = entity_margin_top * (item.direction[1] + 1)
                    return(
                      <div key={index} className={actionPlayer.container_center_right_action_line} style={{top: start + 'px', left: left_offset + 'px', height: end - start + 'px'}}>
                        <div style={{position: 'relative', width: '100%', height: '100%'}}>
                          <span className={actionPlayer.container_center_right_action_line_top}>
                            <img src={dir_up} style={{ width: '100%', height: '100%'}} />
                          </span>
                          <span className={actionPlayer.container_center_right_action_line_center}></span>
                          <span className={actionPlayer.container_center_right_action_line_bootom}>
                            <img src={dir_down} style={{ width: '100%', height: '100%'}} />
                          </span>
                        </div>
                      </div>
                    );})}


                  
                  

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 时间轴 */}
        <div className={actionPlayer.container_bottom_1}>
          <div className={actionPlayer.container_bottom_1_timebox}>
            {/* 坐标元素 */}
            {time_list.map((item, index) => {
              // 计算当前元素的left偏移
              //console.log(item, locations[item])
              return(
                <span key={index} className={actionPlayer.container_bottom_1_timebox_item} style={{left: locations[item] - 20 + 'px'}}>
                  <label style={{fontSize: '10px'}}>|</label>
                  <label style={{marginTop: '5px'}}>{item}</label>
                </span>
              );
            })}

            {/* 标签元素 */}
            {label_list.map((item, index) => {
              // 计算当前元素的left偏移
              return(
                <div className={actionPlayer.container_bottom_1_timebox_label} style={{left: locations[item] - 4.5 + 'px'}}>
                  <div style={{position: 'relative', height: '100%', width: '100%'}}>
                    <img src={red_label} style={{position: 'absolute', zIndex: 0, width: '100%', height: '100%'}} />
                    <label style={{position: 'absolute', left: '1px', zIndex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: '12px', lineHeight: '19px'}}>{index + 1}</label>
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>

        <div className={actionPlayer.container_bottom_2}>
          <div className={actionPlayer.container_bottom_box}>
            <span className={actionPlayer.container_bottom_box_item}>
              <img src={pre} />
              <label style={{'marginLeft': '10px'}}>慢速</label>
            </span>
            <span className={actionPlayer.container_bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>正常</label>
              <img src={play} />
            </span>
            <span className={actionPlayer.container_bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>快速</label>
              <img src={next} />
            </span>
            <span className={actionPlayer.container_bottom_box_item}>
              <label style={{'marginLeft': '10px'}}>标记</label>
              <img src={mark} style={{'width': '23px', 'height': '23px', 'marginTop': '8px'}}/>
            </span>
          </div>
        </div>

         
      </div>
    )
  }
}
