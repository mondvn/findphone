import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import DashBoard from '@/views/DashBoard'
import Convert from '@/views/Convert'
import History from '@/views/History'
import ConvertUID from '@/views/ConvertUID'
import GetUID from '@/views/GetUID'
import Payment from '@/views/Payment'
import ConvertOne from '@/views/ConvertOne'
import ChangePassword from '@/views/ChangePassword'
import LiveStream from '@/views/LiveStream'
import Membergroup from '@/views/Membergroup'
import FindLiveStreamer from '@/views/FindLiveStreamer'
import FindPostImage from '@/views/FindPostImage'
import HistoryCmt from '@/views/HistoryCmt'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/convert-uid',
      name: 'ConvertUID',
      component: ConvertUID,
      children: [
        {
          path: 'convert',
          name: 'Convert',
          component: Convert
        },
        {
          path: 'history',
          name: 'History',
          component: History
        },
        {
          path: 'convert-one',
          name: 'ConvertOne',
          component: ConvertOne
        }
      ]
    },
    {
      path: '/get-uid',
      name: 'GetUID',
      component: GetUID
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/live-stream',
      name: 'LiveStream',
      component: LiveStream
    },
    {
      path: '/member-group',
      name: 'Membergroup',
      component: Membergroup
    },
    {
      path: '/find-livestreamer',
      name: 'FindLiveStreamer',
      component: FindLiveStreamer
    },
    {
      path: '/find-post-image',
      name: 'FindPostImage',
      component: FindPostImage
    },
    {
      path: '/history-cmt',
      name: 'HistoryCmt',
      component: HistoryCmt
    }
  ]
})
