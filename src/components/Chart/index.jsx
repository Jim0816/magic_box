import React, { Component } from 'react'
import chart from './index.module.css'
import { message } from 'antd';
import ReactEcharts from 'echarts-for-react';


export default class index extends Component {

  componentDidMount(){

  }

  render() {
    let num = this.props.num
    return (
      <div className={chart.container}>
        <div className={chart.top}>
          <label style={{marginLeft: '25px', color: '#FFFFFF', lineHeight: '30px', fontWeight: 'bold'}}>数量: {num}</label>
        </div>
        <div className={chart.bottom}>
          <div style={{position: 'relative', width: '100%', height: '100%', }}>
            <span className={chart.bottom_chart_line} style={{height: '4px', top: '20px', backgroundColor: '#28B8B9'}}></span>
            <div className={chart.bottom_chart_box}>
              <ReactEcharts option={this.getOption()} />
            </div>
            <span className={chart.bottom_chart_line} style={{height: '1px', bottom: '16px' ,backgroundColor: '#C5C4C5'}}></span>
          </div>
          
        </div>
      </div>
    )
  }

  getOption = () => {
    let option = {
      xAxis: [
        {
          type: 'category',
          position: 'top',
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            margin: 5,
            color: function(value, index){
              return index >= 2 ? 'white' : 'white';
            },
            fontWeight: "bolder"
          },
          boundaryGap: false,
          data: ['', 'UNII-1', '', 'UNII-2', '', 'UNII-3', '']
        },
        {
          type: 'category',
          position: 'bottom',
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            margin: 5,
            color: function(value, index){
              return index >= 2 ? 'white' : 'white';
            },
          },
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7']
        }
    ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "rgba(94, 90, 94, 1)",
              width: 1.5,
              type: "dotted"
            }
          },
          axisLabel: {
            show: true,
            margin: 10,
            color: function(value, index){
              return value <= -80 ? 'red' : (value <= -60 ? 'yellow' : '#32DBDB');
            },
          },
          max: 0,
          min: -100,
          minInterval: 8,
          interval: 10
        },
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#5E5A5E",
              width: 0,
              type: "dotted"
            }
          },
          axisLabel: {
            show: true,
            margin: 10,
            color: function(value, index){
              return value <= -80 ? 'red' : (value <= -60 ? 'yellow' : '#32DBDB');
            },
          },
          max: 0,
          min: -100,
          minInterval: 8,
          interval: 10
        }
      ],
      grid: {
        top: '20px',
        bottom: '30px',
        left: '50px',
        right: '50px'
      },
      series: [
        {
          data: [-100, -60, -60, -100, -100, -100, -100],
          type: 'line',
          areaStyle: {
            color: "#05D9DA",
            origin: "start",
            opacity: 0.3
          },
          itemStyle: {
            color: "#05D9DA",
            opacity: 0
          },
          lineStyle: {
            width: 0
          }
        },
        {
          data: [-100, -100, -100, -20, -20, -20, -100],
          type: 'line',
          areaStyle: {
            color: "yellow",
            origin: "start",
            opacity: 0.3
          },
          itemStyle: {
            color: "#05D9DA",
            opacity: 0
          },
          lineStyle: {
            width: 0
          }
        }
      ]
    };
    return option
  }
}
