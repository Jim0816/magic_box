import React, { Component } from 'react'
import { message } from 'antd';
import netmap from './index.module.css'
import right from '../../asserts/photo/right.png'

const menus = ['网络名称', '信号强度', '通道宽度', '频率', '干扰', '遗失', '最大RSSI']
const titles = ['SSID', 'IP', 'MAC地址', '信号强度', '网络类型', '上传/mpbs', '下载/mpbs', '安全性', '基础结构', 'DNS', '网关', 'max rate', '延时', 'vendor', 'generation', '地区代码', 'seen (是否可见)', '注释']

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
      <div className={netmap.container}>
          {/* 左边菜单栏 */}
          <div className={netmap.left}>
            {menus.map((item, index) => {
              return(
                <spam key={index} className={netmap.left_item}>
                  <label>{item}</label>
                  <span><img src={right} style={{'width': '100%', 'height': '100%'}}/></span>
                </spam>
              );
            })}
          </div>
          {/* 右边 */}
          <div className={netmap.right}>
            {/* 右边顶部 */}
            <div className={netmap.right_top}>
              {/* 网络监控 */}
              <div className={netmap.right_top_left}>
                <span className={netmap.right_top_left_item} style={{'marginTop': '50px'}}>
                  <label>网络监控</label>
                  <span></span>
                </span>
                <span className={netmap.right_top_left_item} style={{'marginTop': '20px'}}>
                  <label>分析</label>
                  <span></span>
                </span>
              </div>
              {/* 顶部展示信息区域 */}
              <div className={netmap.right_top_right}>
                {titles.map((item, index) => {
                  return(
                    <span key={index} className={netmap.right_top_right_item}>
                      <span className={netmap.right_top_right_item_label}>{item}</span>
                      <span className={netmap.right_top_right_item_span}>DJSKJDFSA</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={netmap.right_center} style={{'backgroundColor': '#4C484D'}}></div>

            <div className={netmap.right_bottom} style={{'backgroundColor': '#252026'}}></div>
          </div>
      </div>
    )
  }

}
