import React, { Component } from 'react'
import { message } from 'antd';
import netmap from './index.module.css'



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
          网络地图
      </div>
    )
  }

}
