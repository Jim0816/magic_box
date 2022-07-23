import React, { Component } from 'react'
import exit from '../../asserts/photo/exit.png'
import frame from './index.module.css'


import { withRouter } from 'react-router-dom'

// 引入路由配置
import {adminRoutes} from '../../routes'

function index(props) {
  const curPath = props.location.pathname
  return (
    <div className={frame.app_container}>
    <div className={frame.app_top}>
      {/* 页面切换导航栏 */}
      {adminRoutes.map((route, index) => {
        return(
          <span className={frame.app_top_item} style={{left: (index + 1) * 170 + 'px', width: '150px'}} 
          onClick={e => props.history.push(route.path)}>
            <span className={frame.app_top_item_img}>
              <img src={curPath === route.path ? route.showIcon : route.hideIcon} style={{height: "100%", width: "100%"}}></img>
            </span>
            <text className={frame.app_top_item_text} style={{'color': curPath === route.path? '#3BFCFB' : '#B0B0AF'}}>{route.title}</text>
          </span>
        );
      })}
      
      <span className={frame.app_top_title}>智能网络监测后台</span>

      <span className={frame.app_top_exit}>
        <text>退出</text>
        <span className={frame.app_top_exit_img}>
          <img src={exit} style={{height: "100%", width: "100%"}}></img>
        </span>
      </span>

      </div>
      <div className={frame.app_bottom}>
        {props.children}
      </div>
    </div>
  )
}

export default withRouter(index)