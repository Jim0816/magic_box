import React, { Component } from 'react'
import { message } from 'antd';
import monitor from './index.module.css'



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
      <div className={monitor.container}>
          网络监控
      </div>
    )
  }

}
