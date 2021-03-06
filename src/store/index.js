import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { routeConfig } from '../router'
import { session } from '../utils/session'
// import { cleanUserInfo } from '../utils/authenticate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routeList: [], // 面包屑
    tagsList: [{ // tags标签
      path: '/home',
      title: '首页'
    }]
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
    getTagList(state, payload) {
      let ctrlAddTag = true;
      state.tagsList.forEach((item, index) => {
        if (item.path === payload.path) {
          ctrlAddTag = false;
          return;
        }
      });
      if (ctrlAddTag) {
        state.tagsList.push(payload);
      } else {
        state.tagsList = state.tagsList;
      }
    },
    delTagsView(state, index) {
      if (state.tagsList[index]['path'] === '/home' || state.tagsList['length'] === 1 && state.tagsList[0]['path'] === '/home') {
        return;
      } else {
        state.tagsList.splice(index, 1);
      }
    },
    logOutRefresh(state, personInfo) {
      // cleanUserInfo(personInfo);
      session.clear(true);
    }
  },
  actions: {
    addTagsView({ commit }, payload) {
      commit('getTagList', payload);
    },
    deleTagsView({ commit }, index) {
      commit('delTagsView', index);
    },
    logOut({ commit }, payload) {
      commit('logOutRefresh', payload);
    }
  }
})

export default store