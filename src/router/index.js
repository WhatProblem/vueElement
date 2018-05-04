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
      icon: 'el-icon-info'
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
      icon: 'el-icon-refresh'
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
      icon: 'el-icon-document'
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
      icon: 'el-icon-download'
    },
    component: main,
    children: [
      { path: 'zip_index', name: 'zip_index', meta: { title: '压缩文件', icon: 'el-icon-download' }, component: () => import('@/views/zip/zip.vue')}
    ]
  },
  {
    path: '/form',
    name: 'form',
    meta: {
      title: '表单',
      icon: 'el-icon-tickets'
    },
    component: main,
    children: [
      { path: 'createForm', name: 'createForm', meta: { title: '表单创建', icon: 'el-icon-tickets' }, component: () => import('@/views/form/createForm/createForm.vue')},
      { path: 'editForm', name: 'editForm', meta: { title: '表单编辑', icon: 'el-icon-tickets' }, component: () =>import('@/views/form/editForm/editForm.vue')}
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      title: 'Excel表格',
      icon: 'el-icon-edit'
    },
    component: main,
    children: [
      { path: 'exportExcel', name: 'exportExcel', meta: { title: '表格导出' }, component: () => import('@/views/excel/exportExcel/exportExcel.vue')},
      { path: 'exportSelected', name: 'exportSelected', meta: { title: '表格导出选择' }, component: () =>import('@/views/excel/exportSelected/exportSelected.vue')},
      { path: 'uploadExcel', name: 'uploadExcel', meta: { title: '表格上传' }, component: () =>import('@/views/excel/uploadExcel/uploadExcel.vue')}
    ]
  },
  {
    path: '/errorPages',
    name: 'errorPages',
    meta: {
      title: '错误导航',
      icon: 'el-icon-error'
    },
    component: main,
    children: [
      { path: '401', name: 'error401', meta: { title: '401报错', icon: 'el-icon-error' }, component: () => import('@/views/errorPages/401.vue')},
      { path: '404', name: 'error404', meta: { title: '404报错', icon: 'el-icon-error' }, component: () => import('@/views/errorPages/404.vue')}
    ]
  },
  {
    path: '/components',
    redirect: '/components/charts/chartOptionTwo',
    name: 'component',
    meta: {
      title: '组件',
      icon: 'el-icon-menu'
    },
    component: main,
    children: [
      { path: 'markdown', name: 'markdown', meta: { title: 'Markdown', icon: 'el-icon-menu' }, component: () => import('@/views/components/markdown.vue')},
      { path: 'jsonEditor', name: 'jsonEditor', meta: { title: 'jsonEditor', icon: 'el-icon-menu' }, component: () => import('@/views/components/jsonEditor.vue')},
      { path: 'splitPane', name: 'splitPane', meta: { title: 'splitPane', icon: 'el-icon-menu' }, component: () => import('@/views/components/splitPane.vue')},
      {
        path: 'charts',
        redirect: '/components/charts/chartOptionTwo',
        name: 'charts',
        meta: { title: 'charts', icon: 'el-icon-picture-outline' },
        component: charts,
        children: [
          { path: 'chartOptionOne', name: 'chartOptionOne', meta: { title: '图表一', icon: 'el-icon-picture-outline' }, component: () =>import('@/views/components/charts/chartOptionOne.vue')},
          { path: 'chartOptionTwo', name: 'chartOptionTwo', meta: { title: '图表二', icon: 'el-icon-picture-outline' }, component: () =>import('@/views/components/charts/chartOptionTwo.vue')}
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