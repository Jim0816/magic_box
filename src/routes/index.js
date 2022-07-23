

// 导入自定义页面组件
import Login from '../pages/Login'
import Home from '../pages/Home'
import Error from '../pages/Error'
import About from '../pages/About'
import SwitchAnalysis from '../pages/SwitchAnalysis'
import NetMap from '../pages/NetMap'
import NetMonitor from '../pages/NetMonitor'

import net_n from '../asserts/photo/net_n.png'
import map_n from '../asserts/photo/map_n.png'
import analysis_n from '../asserts/photo/analysis_n.png'
import net_y from '../asserts/photo/net_y.png'
import map_y from '../asserts/photo/map_y.png'
import analysis_y from '../asserts/photo/analysis_y.png'

export const mainRoutes = [
    {
        path: '/login',
        title: '登陆',
        component: Login
    },
    {
        path: '/404',
        title: '错误',
        component: Error
    }
]


export const adminRoutes = [
    {
        path: '/admin/monitor',
        title: '网络监控',
        component: NetMonitor,
        exact: true,
        show: false,
        showIcon: net_y,
        hideIcon: net_n,
    },
    {
        path: '/admin/netmap',
        title: '网络地图',
        component: NetMap,
        exact: true,
        show: false,
        showIcon: map_y,
        hideIcon: map_n,
    },
    {
        path: '/admin/switch',
        title: '网络分析',
        component: SwitchAnalysis,
        exact: true,
        show: true,
        showIcon: analysis_y,
        hideIcon: analysis_n,
    }
]