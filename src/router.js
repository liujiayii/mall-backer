import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    redirect: '/login'
  },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '',
      component: Layout,
      children: [
        {
          component: () => import('@/views/exception/404'),
          name: "404",
          path: "/404",
        }, {
          component: () => import('@/views/exception/403'),
          name: "403",
          path: "/403",
        }, {
          component: () => import('@/views/exception/500'),
          name: "500",
          path: "/500",
        }
      ]
    }, {
      path: '*',
      redirect: '/404'
    }]
})
// 前端路由表
const constantRouterComponents = {
  Layout,// 基础页面 layout 必须引入
  // 你需要动态引入的页面组件
  Home: () => import('@/views/home/home'),

  Publish: () => import('@/views/goods/publish'),
  Express: () => import('@/views/goods/express'),
  GoodsList: () => import('@/views/goods/list'),
  Sort: () => import('@/views/goods/sort'),
  Suggest: () => import('@/views/goods/suggest'),

  OrderList: () => import('@/views/order/order'),
  Return: () => import('@/views/order/return'),

  Person: () => import('@/views/access/person'),

  Stock: () => import('@/views/record/stock'),
  Finance: () => import('@/views/record/finance'),

  Coupon: () => import('@/views/market/coupon'),
  Discount: () => import('@/views/market/discount'),
  Fund: () => import('@/views/market/fund'),
  Banner: () => import('@/views/market/banner'),
  Notice_: () => import('@/views/market/notice'),

  Account: () => import('@/views/user/account'),
  Info: () => import('@/views/user/info'),
  Notice: () => import('@/views/user/notice'),
}

export {constantRouterComponents}
