import Vue from 'vue'
import Vuex from 'vuex'
import { routeConfig } from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routeList: []
  },
  getters: {
    routeList(state) {
      state.routeList = routeConfig.filter((item) => {
        if (item.children) {
          return item;
        } else {
          return false;
        }
      });
      return state.routeList;
    }
  },
  mutations: {

  },
  actions: {

  }
})

export default store