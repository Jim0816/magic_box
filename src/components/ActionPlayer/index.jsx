import React, { Component } from 'react'
import { CaretDownOutlined } from '@ant-design/icons';
import {message, Dropdown, Menu} from 'antd';
import actionPlayer from './index.module.css'
import pre from '../../asserts/photo/pre.png'
import play from '../../asserts/photo/play.png'
import stop from '../../asserts/photo/stop.png'
import next from '../../asserts/photo/next.png'
import mark from '../../asserts/photo/mark.png'
import red_label from '../../asserts/photo/red_label.png'
import dir_up from '../../asserts/photo/dir_up.png'
import dir_down from '../../asserts/photo/dir_down.png'
import down_white from '../../asserts/photo/down_white.png'


const entity_list = ['entity0', 'entity1', 'entity2', 'entity3', 'entity4', 'entity5']
const time_list = ['9:02', '9:03', '9:04', '9:05', '9:06', '9:07', '9:08', '9:09', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15','9:16', '9:17', '9:18', '9:19', '9:20', '9:21', '9:22', '9:23', '9:24', '9:25', '9:26', '9:27', '9:28', '9:29']
const label_list = ['9:03', '9:12']
const entity_margin_top = 80
const action_list = [
  {'time': '9:03', 'direction': [0,5]},
  {'time': '9:05', 'direction': [0,1]},
  {'time': '9:06', 'direction': [0,4]},
  {'time': '9:09', 'direction': [4,3]},
  {'time': '9:12', 'direction': [3,1]},
  {'time': '9:13', 'direction': [5,1]},
  {'time': '9:14', 'direction': [5,2]},
  {'time': '9:15', 'direction': [5,2]},
  {'time': '9:16', 'direction': [5,2]},
  {'time': '9:17', 'direction': [5,2]},
  {'time': '9:18', 'direction': [5,2]},
  {'time': '9:19', 'direction': [5,2]},
  {'time': '9:27', 'direction': [5,2]}
]

const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}

const menu = (
  <Menu
    items={[
      {
        label: '1st menu item',
        key: '1',
      },
      {
        label: '2nd menu item',
        key: '2',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

export default class index extends Component {
  state = {
    left: 0,
    width: 0, // 总宽度
    item_width: 100, // 每个刻度宽度
    show_width: 0, //当前页面可展示宽度
    speed: 20, // 每秒移动10px
    direction: -1, // 播放方向 -1:向左【快进】 1:向右【快退】
    left_multiple: 1, // 播放倍数【快进】
    right_multiple: 1, // 播放倍数【快退】
    multiple_max: 16, // 最大播放倍数
    player: null, // 定时播放器对象
    
  }

  componentDidMount(){
    let obj = document.getElementById('container_center_right_line')
    this.state.show_width = obj.offsetWidth
    // setInterval(() => {
    //  this.state.left -= 50
    //  this.forceUpdate()
    // }, 1000);

  }

  

  // 控制播放
  conroll_play = () => {
    let {player} = this.state
    if (player == null){
      // 播放
      this.state.player = setInterval(() => {this.play()}, 100);
    }else{
      // 暂停
      clearInterval(player);
      this.state.player = null
      this.forceUpdate()
      console.log('播放停止')
    }
  }

  // 向左移动 返回true：还在播放 返回false：播放已经停止
  play = () => {
    let {show_width, width, player, speed, left_multiple, right_multiple, direction} = this.state
    let multiple = direction > 0 ? right_multiple : left_multiple
    let change = direction * (speed * multiple) / 10
    // 向左移动【即快进】
    if (change < 0){
      let distance = 0 - this.state.left // 往左移动距离
      let rest = width - distance // 剩余多少距离
      if (rest >= show_width){
        this.state.left += change
        console.log('向左移动: ', change, '剩余: ', rest)
      }else{
        clearInterval(player);
        this.state.player = null
        this.state.left_multiple = 1
        message.info('播放完成')
      }
    }else if (change > 0){ // 向右移动【即快退】
      let left_rest = 0 - this.state.left // 计算左边界溢出去宽度
      if (left_rest > 0){
        // 左边界有溢出，可以快退
        this.state.left += change
      }else{
        clearInterval(player);
        this.state.player = null
        this.state.right_multiple = 1
        this.state.direction = -1 // 恢复可快进状态
        message.warning('无法再快退啦!!!')
      }
    }

    this.forceUpdate()
  }

  // 快进加速
  play_left_up = () => {
    let {left_multiple, multiple_max, player} = this.state
    this.state.direction = -1
    this.state.right_multiple = 1 // 点击快进，快退速度恢复1
    if (player == null){
      this.state.player = setInterval(() => {this.play()}, 100);
    }

    if (left_multiple < multiple_max){
      left_multiple *= 2
    }else{
      left_multiple = 1
    }
    this.state.left_multiple = left_multiple
    this.forceUpdate()
  }

  // 快退加速
  play_right_up = () => {
    let {right_multiple, multiple_max, player} = this.state
    this.state.direction = 1
    this.state.left_multiple = 1 // 点击快退，快进速度恢复1
    if (player == null){
      this.state.player = setInterval(() => {this.play()}, 100);
    }

    if (right_multiple < multiple_max){
      right_multiple *= 2
    }else{
      right_multiple = 1
    }
    this.state.right_multiple = right_multiple
    this.forceUpdate()
  }

  // 向右移动

  render() {
    let {item_width} = this.state
    // 计算总宽度
    this.state.width = (time_list.length - 1) * item_width + 30 // 30是为了预留一点宽度显示超出边界的label
    // 暂存每个区间的left位置 key: label value：left位置
    var locations = {}
    for (let i = 0 ; i < time_list.length ; i++){
      locations[time_list[i]] = item_width * i
    }

    return (
      <div className={actionPlayer.container}>
        <div className={actionPlayer.container_top}>
          <span className={actionPlayer.container_top_select}>
            <label style={{'fontSize': '18px', 'lineHeight': '50px', 'fontWeight': 'bold'}}>选择来源: </label>
            <span className={actionPlayer.container_top_select_span} style={{cursor: 'pointer'}}>
              <Dropdown overlay={menu}>
                <span style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
                  <span style={{width: '150px', height: '100%', textAlign: 'center', lineHeight: '30px', color: 'white', fontWeight: '450'}}>TP-LINK-1111</span>
                  <span style={{width: '20px', height: '100%'}}>
                    <img src={down_white} style={{marginTop: '5px', width: '20px', 'height': '20px'}}/>
                  </span>
                </span>
                  
                
              </Dropdown>
            </span>
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
              <div id="container_center_right_line" className={actionPlayer.container_center_right_line}>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  {entity_list.map((item, index) => {
                    return(
                      <span key={index} className={actionPlayer.container_center_right_line_dot} style={{left: this.state.left, top: entity_margin_top * (index + 1) + 14.5 + 'px', width: this.state.width + 'px'}}></span>
                    );
                  })}
                </div>
              </div>

              {/* 动作绘制层*/}
              <div className={actionPlayer.container_center_right_action}>
                <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                  {/* 方向线 */}
                  {action_list.map((item, index) => {
                    let left_offset = this.state.left + locations[item.time] - 16
                    let start = entity_margin_top * (item.direction[0] + 1) + 15
                    let end = entity_margin_top * (item.direction[1] + 1) + 15
                    let arrow = 1 // 1默认是向下的箭头 -1代表向上箭头
                    if (start >= end){
                      let temp = start
                      start = end
                      end = temp
                      arrow = -1
                    }

                    return(
                      <div key={index} className={actionPlayer.container_center_right_action_line} style={{top: start + 'px', left: left_offset + 'px', height: end - start + 'px'}}>
                        <div style={{position: 'relative', width: '100%', height: '100%'}}>
                          
                          <span className={actionPlayer.container_center_right_action_line_top} style={{display: arrow == -1 ? 'block' : 'none'}}>
                            <img src={dir_up} style={{ width: '100%', height: '100%'}} />
                          </span>

                          <span className={actionPlayer.container_center_right_action_line_center}></span>

                          <span className={actionPlayer.container_center_right_action_line_bootom} style={{display: arrow == 1 ? 'block' : 'none'}}>
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
          <div className={actionPlayer.container_bottom_1_timebox} style={{left: this.state.left + 'px', width: this.state.width+ 'px'}}>
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
            <span className={actionPlayer.container_bottom_box_item} style={{width: '140px'}} onClick={this.play_right_up}>
              <img src={pre} />
              <label style={{'marginLeft': '10px'}} >快退x{this.state.right_multiple}</label>
            </span>
            <span className={actionPlayer.container_bottom_box_item} onClick={this.conroll_play}>
              <label style={{'marginLeft': '10px'}}>正常</label>
              <img src={this.state.player == null ? play : stop} />
            </span>
            <span className={actionPlayer.container_bottom_box_item} style={{width: '140px', justifyContent: 'flex-end'}} onClick={this.play_left_up}>
              <label style={{'marginLeft': '10px'}}>{this.state.left_multiple}x快进</label>
              <img src={next} style={{'marginRight': '10px'}} />
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
