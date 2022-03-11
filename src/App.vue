<!--
 * @Description: 无
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-12-10 16:16:07
 * @LastEditors: hammercui
 * @LastEditTime: 2019-12-26 11:59:59
 -->
<template>
  <div id="app">
    <router-view />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div @click="showPopup">点击弹出遮罩</div>
      <van-overlay :show="show" @click="onClose" />
    </div>-->
    <loading v-if="$store.state.loading.global"></loading>
  </div>
</template>
<script>
import { setGlobalMapValue } from "./utils/request";
export default {
  name: "root",
  data() {
    return {
      show: false
    };
  },
  components: {
    loading: () => import("./views/loading")
  },
  created: function() {
    setGlobalMapValue("userNo", this.$route.query.userNo);
    setGlobalMapValue("cookie", this.$route.query.cookie);
  },

  methods: {
    showPopup() {
      console.log("点击弹出遮罩");
      this.show = true;
    },

    onClose() {
      console.log("点击关闭遮罩");
      // this.show = false;
    },
    clickoverlay() {}
  }
};
</script>

<style lang="scss" >
@import "/style/main.scss";
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
