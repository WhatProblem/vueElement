// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboards from 'vue-clipboards';
import VueSimplemde from 'vue-simplemde'

// 自定义图标
import './theme/icons/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueClipboards)
Vue.use(VueSimplemde)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
