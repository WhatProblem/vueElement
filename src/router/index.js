import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'js-cookie'

import main from '@/views/main.vue'
import charts from '@/views/components/charts/charts.vue'

Vue.use(Router)

const routeConfig = [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    component: () => import('@/views/login.vue')
  },
  {
    path: '',
    redirect: '/home',
    // name: 'main',
    meta: {
      title: '首页',
      icon: 'el-icon-ws-shouye'
    },
    component: main,
    children: [
      { path: 'home', name: 'home', meta: { title: '首页', icon: 'el-icon-info' }, component: () => import('@/views/home/home.vue')}
    ]
  },
  {
    path: '/i18n',
    // name: 'i18n',
    meta: {
      title: '语言切换',
      icon: 'el-icon-ws-zhongwenyuyan'
    },
    component: main,
    children: [
      { path: 'i18n_index', name: 'i18n_index', meta: { title: '语言切换', icon: 'el-icon-refresh' }, component: () => import('@/views/i18n/i18n.vue')}
    ]
  },
  {
    path: '/documentation',
    // name: 'documentation',
    meta: {
      title: '参考文档',
      icon: 'el-icon-ws-wendang'
    },
    component: main,
    children: [
      { path: 'documentation_index', name: 'documentation_index', meta: { title: '参考文档', icon: 'el-icon-document' }, component: () => import('@/views/documentation/documentation.vue')}
    ]
  },
  {
    path: '/zip',
    // name: 'zip',
    meta: {
      title: '压缩文件',
      icon: 'el-icon-ws-geshi_yasuobaozip'
    },
    component: main,
    children: [
      { path: 'zip_index', name: 'zip_index', meta: { title: '压缩文件', icon: 'el-icon-download' }, component: () => import('@/views/zip/zip.vue')}
    ]
  },
  {
    path: '/game',
    name: 'game',
    meta: {
      title: '游戏',
      icon: 'el-icon-ws-biaodan'
    },
    component: main,
    children: [
      { path: 'heroCreate', name: 'heroCreate', meta: { title: '英雄创建', icon: 'el-icon-ws-xinjiantianjiabiaodanyemian' }, component: () => import('@/views/game/heroCreate/heroCreate.vue')},
      { path: 'heroList', name: 'heroList', meta: { title: '英雄列表', icon: 'el-icon-ws-biaodan1' }, component: () =>import('@/views/game/heroList/heroList.vue')},
      { path: 'heroSort', name: 'heroSort', meta: { title: '英雄分类', icon: 'el-icon-ws-biaodan1' }, component: () =>import('@/views/game/heroSort/heroSort.vue')}
    ]
  },
  {
    path: '/film',
    name: 'film',
    meta: {
      title: '视频',
      icon: 'el-icon-ws-Excel'
    },
    component: main,
    children: [
      { path: 'filmCreate', name: 'filmCreate', meta: { title: '视频添加', icon: 'el-icon-ws-exceldaochu' }, component: () => import('@/views/film/filmCreate/filmCreate.vue')},
      { path: 'filmEdit', name: 'filmEdit', meta: { title: '视频修改', icon: 'el-icon-ws-exceldaochu1' }, component: () =>import('@/views/film/filmEdit/filmEdit.vue')},
      { path: 'filmCaculate', name: 'filmCaculate', meta: { title: '视频统计', icon: 'el-icon-ws-wendangshangchuan' }, component: () =>import('@/views/film/filmCaculate/filmCaculate.vue')}
    ]
  },
  {
    path: '/errorPages',
    name: 'errorPages',
    meta: {
      title: '错误导航',
      icon: 'el-icon-ws-error'
    },
    component: main,
    children: [
      { path: '401', name: 'error401', meta: { title: '401报错', icon: 'el-icon-ws-401' }, component: () => import('@/views/errorPages/401.vue')},
      { path: '404', name: 'error404', meta: { title: '404报错', icon: 'el-icon-ws-cuowu' }, component: () => import('@/views/errorPages/404.vue')}
    ]
  },
  {
    path: '/components',
    redirect: '/components/charts/chartOptionTwo',
    name: 'component',
    meta: {
      title: '组件',
      icon: 'el-icon-ws-zujian'
    },
    component: main,
    children: [
      { path: 'markdown', name: 'markdown', meta: { title: 'Markdown', icon: 'el-icon-ws-markdown' }, component: () => import('@/views/components/markdown.vue')},
      { path: 'jsonEditor', name: 'jsonEditor', meta: { title: 'jsonEditor', icon: 'el-icon-ws-json' }, component: () => import('@/views/components/jsonEditor.vue')},
      { path: 'splitPane', name: 'splitPane', meta: { title: 'splitPane', icon: 'el-icon-ws-panel' }, component: () => import('@/views/components/splitPane.vue')},
      {
        path: 'charts',
        redirect: '/components/charts/chartOptionTwo',
        name: 'charts',
        meta: { title: 'charts', icon: 'el-icon-ws-chartpattern' },
        component: charts,
        children: [
          { path: 'chartOptionOne', name: 'chartOptionOne', meta: { title: '图表一', icon: 'el-icon-ws-chart-bar' }, component: () =>import('@/views/components/charts/chartOptionOne.vue')},
          { path: 'chartOptionTwo', name: 'chartOptionTwo', meta: { title: '图表二', icon: 'el-icon-ws-chart1' }, component: () =>import('@/views/components/charts/chartOptionTwo.vue')}
        ]
      }
    ]
  }
]

const router = new Router({
  routes: routeConfig
})

export default router
export { routeConfig }

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (Cookies.get('user') && Cookies.get('password') && to.name === 'login') {
    next({
      name: 'home'
    });
  } else if ((!Cookies.get('user') || !Cookies.get('password')) && to.name !== 'login') {
    next({
      name: 'login'
    });
  } else {
    next();
  }
})

router.afterEach((to, from) => {
  NProgress.done();
})