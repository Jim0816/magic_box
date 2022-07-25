import React, { Component } from 'react'
import table from './index.module.css'
import sort from '../../asserts/photo/sort.png'
import { message } from 'antd';

const header = [
  {'name': 'select', 'width': '3%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '网络名称', 'width': '17%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '信号强度', 'width': '15%', 'background': 'none', 'color': '#3CFFFF', 'sorted': true},
  {'name': '通道', 'width': '10%', 'background': 'none', 'color': '#3CFFFF', 'sorted': true},
  {'name': '通道宽度', 'width': '10%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '频率', 'width': '10%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '干扰', 'width': '5%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '支持速率', 'width': '10%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '遗失', 'width': '5%', 'background': 'none', 'color': '#3CFFFF'},
  {'name': '最大RSSI', 'width': '15%', 'background': 'none', 'color': '#3CFFFF'}
]

const data = [
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60],
  ['TPLINK_1111', '-31DBM', '1', '40MHZ', '2.4GHZ', '0', '70Mbps', '1', -60]
]



export default class index extends Component {

  state = {
    header: [],
    data: [],
    select: [],
    all_select: false
  }



  componentDidMount(){

    // 初始化数据
    let select = []
    for (let i = 0 ; i < data.length ; i++){
      select[i] = 0
    }

    this.setState({
      header: header,
      data: data,
      select: select
    })

  }

  render() {
    let {header, data, select, all_select} = this.state
    return (
      <div className={table.container}>
        <div className={table.top}>
          {header.map((item, index) => {
            return(
              <span style={{float: 'left', width: item.width, height: '100%', backgroundColor: item.background}}>
                {/* 是否为勾选 */}
                {
                  item.name === 'select' ? 
                  // 勾选列
                  <span style={{float: 'right',marginRight: '10px', marginTop: '9px', width: '10px', height: '10px', cursor: 'pointer', backgroundColor: all_select ? '#3CFFFF' : 'white'}} onClick={e => {this.select(e, -1)}}></span> : 
                  // 内容列
                  <span style={{float: 'left',marginLeft: '0px', marginTop: '4px', width: '100%', height: '22px', borderRight: index != header.length - 1 ? '1px solid #3CFFFF' : '0px solid #3CFFFF', textAlign: 'center'}}>
                    <label style={{color: item.color, fontSize: '16px', fontWeight: 'bolder', lineHeight: '23px'}}>{item.name}</label>
                    {/* 添加排序按钮 */}
                    {item.sorted ? <span style={{float: 'right', marginRight: '5px', width: '22px', height: '22px', cursor: 'pointer'}}>
                      <img src={sort} style={{width: '100%', height: '100%'}} />
                    </span> : <span></span>}
                  </span>
                }
              </span>
            );
          })}
          
        </div>
        <div className={table.bottom}>
          {data.map((row, row_index) => {
            return(
              <diiv className={table.row} style={{backgroundColor: row_index % 2 == 0 ? '#373237' : '#4C484D'}}>
                {/* 每列 */}
                {header.map((col, col_index) => {
                  return(
                    <span style={{float: 'left', width: col.width, height: '100%'}}>
                      {/* 是否为勾选 */}
                      {
                        col.name === 'select' ? 
                        // 勾选列
                        <span style={{float: 'right',marginRight: '10px', marginTop: '9px', width: '10px', height: '10px', cursor: 'pointer', backgroundColor: select[row_index] == 1 ? '#3CFFFF' : 'white'}} onClick={e => {this.select(e, row_index)}}></span> : 
                        // 内容列
                        <span className={table.col}>{row.length < header.length ? row[col_index - 1] : row[col_index]}</span>
                      }
                    </span>
                  );
                })}

                {/* {
                  header[index].name === 'select' ? 
                  <span style={{float: 'right',marginRight: '10px', marginTop: '9px', width: '10px', height: '10px', border: '1px solid #3CFFFF', cursor: 'pointer'}}></span> : 
                  // 数据展示列
                  <span className={table.col}></span>
                } */}
              </diiv>
            );
          })}
          
        </div>
      </div>
    )
  }

  select = (event, index) => {
    let {select, all_select} = this.state
    let flag = true
    if (index === -1){
      // 全选按钮
      if (all_select){
        // 已经全选，准备全取消
        console.log('全取消')
        for (let i = 0 ; i < select.length ; i++){
          select[i] = 0
        }
        flag = false
      }else{
        console.log('全选择')
        // 全选
        for (let i = 0 ; i < select.length ; i++){
          select[i] = 1
        }
        flag = true
      }
    }else{
      // 单选
      select[index] = select[index] == 1 ? 0 : 1
      // 判断是否全选
      for (let i = 0 ; i < select.length ; i++){
        if (select[i] == 0){
          flag = false
          break;
        }
      }
    }
    this.setState({
      select: select,
      all_select: flag
    })
  }
}
