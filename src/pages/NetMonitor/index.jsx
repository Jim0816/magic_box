import React, { Component } from 'react'
import { message } from 'antd';
import netmap from './index.module.css'
import right from '../../asserts/photo/right.png'
import Table from '../../components/Table';
import Chart from '../../components/Chart';
import {getList} from '../../api/monitor'

const menus = ['网络名称', '信号强度', '通道宽度', '频率', '干扰', '遗失', '最大RSSI']
const titles = [
  {'label': 'SSID', 'value': 'wlan_mgt.wlan_ssid'},
  {'label': 'IP', 'value': ''},
  {'label': 'MAC地址', 'value': 'wlan.wlan_bssid'},
  {'label': '信号强度', 'value': 'wlan_radio.wlan_radio_signal_dbm'},
  {'label': '网络类型', 'value': ''},
  {'label': '上传/mpbs', 'value': ''},
  {'label': '下载/mpbs', 'value': ''},
  {'label': '安全性', 'value': ''},
  {'label': '基础结构', 'value': ''},
  {'label': 'DNS', 'value': ''},
  {'label': '网关', 'value': ''},
  {'label': 'max rate', 'value': ''},
  {'label': '延时', 'value': ''},
  {'label': 'vendor', 'value': ''},
  {'label': 'generation', 'value': ''},
  {'label': '地区代码', 'value': ''},
  {'label': 'seen (是否可见)', 'value': ''},
  {'label': '注释', 'value': ''}
]
const dataList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

export default class index extends Component {

  state = {
    dataList: [],
    detail: {}
  };


  constructor(props) {
    super(props)
    getList().then(
      res => {
        this.state.dataList = res.data
        //console.log(res.data)
        this.forceUpdate()
      }
    ).catch(
      err => {
        message.error('数据加载失败')
        console.log(err)
      }
    )
   }

   componentDidMount() {

    setInterval(() => {
      getList().then(
        res => {
          if (res.data.length != this.state.dataList){
            this.state.dataList = res.data
            //console.log(res.data)
            this.forceUpdate()
          }
        }
      ).catch(
        err => {
          message.error('数据加载失败')
          console.log(err)
        }
      )
    }, 5000);

    
   }

  change_show_data_detail = (row) => {
    let {dataList} = this.state
    //console.log(dataList[row])
    this.state.detail = dataList[row]
    this.forceUpdate()
  }
 
  render() {
    let {dataList, detail} = this.state
    return (
      <div className={netmap.container}>
          {/* 左边菜单栏 */}
          <div className={netmap.left}>
            {menus.map((item, index) => {
              return(
                <span key={index} className={netmap.left_item}>
                  <label>{item}</label>
                  <span><img src={right} style={{'width': '100%', 'height': '100%'}}/></span>
                </span>
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
                  let classKey = item.value.split(".")
                  let contains_flag = true
                  let cur_map = JSON.parse(JSON.stringify(detail))
                  let cur_value = ''
                  for (let i = 0 ; i < classKey.length ; i++){
                    if (!cur_map.hasOwnProperty(classKey[i])){
                      // 不包含key
                      contains_flag = false
                      cur_value = ''
                    }else{
                      cur_map = cur_map[classKey[i]]
                      cur_value = cur_map
                    }
                  }
                  //console.log(cur_value)

                  return(
                    <span key={index} className={netmap.right_top_right_item}>
                      <span className={netmap.right_top_right_item_label}>{item.label}</span>
                      <span className={netmap.right_top_right_item_span}>{cur_value}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 右边中间布局 */}
            <div className={netmap.right_center} style={{'backgroundColor': '#4C484D'}}>
              <Table dataList={dataList} click={this.change_show_data_detail}/>
            </div>


            {/* 右边中间布局 图表展示*/}
            <div className={netmap.right_bottom} style={{'backgroundColor': '#252026'}}>
              <Chart num={dataList.length}/>
            </div>
          </div>
      </div>
    )
  }

}
