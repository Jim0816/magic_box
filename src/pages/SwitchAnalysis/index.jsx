import React, { Component } from 'react'
import { message } from 'antd';
import switchAnalysis from './index.module.css'


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
      <div className={switchAnalysis.container}>
        网络分析
      </div>
    )
  }

}
