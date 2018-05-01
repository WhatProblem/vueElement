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
    path: '/',
    redirect: '/home',
    name: 'main',
    title: 'main部分',
    component: main,
    children: [
      { path: '/home', name: 'home', meta: { title: '首页' }, component: () => import('@/views/home/home.vue')}
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    title: '语言切换',
    component: main,
    children: [
      { path: 'i18n_index', name: 'i18n_index', meta: { title: '语言切换' }, component: () => import('@/views/i18n/i18n.vue')}
    ]
  },
  {
    path: '/documentation',
    name: 'documentation',
    title: '参考文档',
    component: main,
    children: [
      { path: 'documentation_index', name: 'documentation_index', meta: { title: '参考文档' }, component: () => import('@/views/documentation/documentation.vue')}
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单',
    component: main,
    children: [
      { path: 'createForm', name: 'createForm', meta: { title: '表单创建' }, component: () => import('@/views/form/createForm/createForm.vue')},
      { path: 'editForm', name: 'editForm', meta: { title: '表单编辑' }, component: () =>import('@/views/form/editForm/editForm.vue')}
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    title: 'Excel表格',
    component: main,
    children: [
      { path: 'exportExcel', name: 'exportExcel', meta: { title: '表格导出' }, component: () => import('@/views/excel/exportExcel/exportExcel.vue')},
      { path: 'exportSelected', name: 'exportSelected', meta: { title: '表格导出选择' }, component: () =>import('@/views/excel/exportSelected/exportSelected.vue')},
      { path: 'uploadExcel', name: 'uploadExcel', meta: { title: '表格上传' }, component: () =>import('@/views/excel/uploadExcel/uploadExcel.vue')}
    ]
  },
  {
    path: '/zip',
    name: 'zip',
    title: '参考文档',
    component: main,
    children: [
      { path: 'zip_index', name: 'zip_index', meta: { title: '压缩文件' }, component: () => import('@/views/zip/zip.vue')}
    ]
  },
  {
    path: '/errorPages',
    name: 'errorPages',
    title: '错误导航',
    component: main,
    children: [
      { path: '401', name: 'error401', meta: { title: '401报错' }, component: () => import('@/views/errorPages/401.vue')},
      { path: '404', name: 'error404', meta: { title: '404报错' }, component: () => import('@/views/errorPages/404.vue')}
    ]
  },
  {
    path: '/components',
    name: 'component',
    title: '组件',
    component: main,
    children: [
      { path: 'markdown', name: 'markdown', meta: { title: 'Markdown' }, component: () => import('@/views/components/markdown.vue')},
      { path: 'jsonEditor', name: 'jsonEditor', meta: { title: 'jsonEditor' }, component: () => import('@/views/components/jsonEditor.vue')},
      { path: 'splitPane', name: 'splitPane', meta: { title: 'splitPane' }, component: () => import('@/views/components/splitPane.vue')},
      {
        path: 'charts',
        name: 'charts',
        meta: { title: 'charts' },
        component: charts,
        children: [
          { path: 'chartOption', name: 'chartOption', meta: { title: 'chartOption' }, component: () =>import('@/views/components/charts/chartOption.vue')}
        ]
      }
    ]
  }
]

const router = new Router({
  routes: routeConfig
})

export default router

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (Cookies.get('user') && Cookies.get('password') && to.name === 'login') {
    next({
      name: 'home'
    });
  } else if ((!Cookies.get('user') || !Cookies.get('password')) && to.name !== 'login') {
    console.log(123456)
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