import Vue from 'vue';
import Vuex from 'vuex';
import 'es6-promise/auto'; // Vuex 需要es6-promise 来支持Promise
import { upperFirst } from 'lodash';
import { login as userLogin } from '../utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    userName: '',
    isLogin: 0,
  },
  mutations: {
    // Mutations Must Be Synchronous
    // Using Constants for Mutation Types.
    // mutations type 也可以使用常量值进行统一管理 increment -》  INCREMENT
    increment(state) {
      /* eslint-disable no-plusplus */
      state.count++;
    },
    setUserName(state, user) {
      state.userName = user.userName;
      state.isLogin = user.login || 0;
    },
  },
  actions: {
    // Actions are similar to mutations, the differences being that:
    //   1. Instead of mutating the state, actions commit mutations.
    //   2. Actions can contain arbitrary asynchronous operations.
    increment(context) {
      // context 具有store相同的属性和方法。但是与store 不是同一个实例
      context.commit('increment');
    },
    login({ commit }) {
      // context 具有store相同的属性和方法。但是与store 不是同一个实例
      return new Promise((resolve, reject) => {
        userLogin({}).then((res) => {
          /* eslint-disable no-console */
          console.log(JSON.stringify(res));
          commit('setUserName', res);
          resolve(res);
        }).catch(() => {
          reject();
        });
      });
    },
  },
  getters: { // 可以通过getters 去重新计算全局state值
    upperFirstUserName: state => (
      upperFirst(state.userName)
    ),
  },
});
