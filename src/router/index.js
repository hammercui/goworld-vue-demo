/*
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-10 16:23:00
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// const Home = ()=> import('../views/Home.vue')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('../views/Chat/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router