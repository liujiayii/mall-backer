import router from '../router'
import store from '../store'
import NProgress from 'nprogress'
import {constantRouterComponents} from '../router'

const menuData = [
  {
    "path": "",
    "component": "Layout",
    "Ico": "home",
    "name": "",
    "children": [
      {
        "path": "/home",
        "component": "Home",
        "name": "home"
      }
    ]
  },
  {
    "component": "Layout",
    "Ico": "shopping",
    "name": "goods",
    "children": [
      {"name": "publish"},
      {"name": "goodsList"},
      {"name": "sort"},
      {"name": "express"},
      {"name": "suggest"}
    ],
  },
  {
    "component": "Layout",
    "Ico": "profile",
    "name": "order",
    "children": [
      {"name": "orderList"},
      {"name": "return"}
    ]
  },
  {
    "component": "Layout",
    "Ico": "lock",
    "name": "access",
    "children": [
      {"name": "person"}
    ]
  },
  {
    "component": "Layout",
    "Ico": "pie-chart",
    "name": "record",
    "children": [
      {"name": "stock"},
      {"name": "finance"}
    ]
  },
  {
    "component": "Layout",
    "Ico": "line-chart",
    "name": "market",
    "children": [
      {"name": "coupon"},
      {"name": "banner"},
      {"name": "discount"},
      {"name": "fund"}
    ]
  },
  {
    "component": "Layout",
    "Ico": "user",
    "name": "user",
    "children": [
      {"name": "account"},
      {"name": "info"},
      {"name": "notice"}
    ]
  }
]
/*格式化 后端 结构信息并递归生成层级路由表*/
const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `/${parent && parent.name || ''}/${item.name}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      Ico: item.Ico || '',
      // 该路由对应页面的 组件
      component: constantRouterComponents[item.component || item.name.replace(item.name[0], item.name[0].toUpperCase())],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {title: parent && parent.name || ''}
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    return currentRouter
  })
}
/*路由守卫*/
store.state.menu = generator(menuData)
router.addRoutes(store.state.menu)
router.beforeEach((to, form, next) => {
  NProgress.start()
  if (!window.sessionStorage.getItem('userName') && to.path !== '/login') {
    return next({path: '/login'})
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
