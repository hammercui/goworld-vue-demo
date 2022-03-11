/*
 * @Description: store根节点，按模块拆分
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-10 16:22:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-19 13:35:52
 */
import Vue from 'vue'
import Vuex from 'vuex'
import chat from './chat'

import createLoadingPlugin from "../utils/vuex-loading";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createLoadingPlugin()],
  modules:{
    chat
  }
})
