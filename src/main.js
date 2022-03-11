import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { Popover } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import { Button,Tabbar,TabbarItem,Image,Collapse, CollapseItem,Overlay   } from 'vant';
import { getParam, imgUrl, getNumFormat } from './utils/utils';
import { setGlobalMapValue } from './utils/request';
// import {  Drawer } from 'element-ui';
// import 'swiper/css/swiper.css'
// import Carousel3d from 'vue-carousel-3d';
// import Vconsole from 'vconsole';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
if (process.env.VUE_APP_MODE != 'prod') {
	var Vconsole = require('vconsole');
	const vConsole = new Vconsole() ;
	Vue.use(vConsole);
}
// Vue.use(Button).use(Tabbar).use(TabbarItem).use(Image).use(Collapse).use(CollapseItem).use(Overlay );
// Vue.use(Button).use(Select).use(Carousel).use(CarouselItem).use(Drawer);
// Vue.use(Popover).use(Drawer);
Vue.use(Popover)

Vue.prototype.imgUrl = imgUrl;
Vue.prototype.getNumFormat = getNumFormat;

Vue.config.productionTip = false;


console.log('verifycode', getParam('verifycode'));
setGlobalMapValue('userNo', getParam('userNo'));
setGlobalMapValue('cookie', getParam('cookie'));
setGlobalMapValue('verifycode', getParam('verifycode'));
setGlobalMapValue('ispop', getParam('ispop'));

new Vue({
	store,
	router,
	render: (h) => h(App)
}).$mount('#app');