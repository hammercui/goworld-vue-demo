<!--
 * @Author: your name
 * @Date: 2020-04-30 10:37:16
 * @LastEditTime: 2020-07-02 13:33:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ActivityStaging\src\views\loading.vue
--> 
<template>
  <div class="loading-main">
    <div v-if="loadingShow" class="loading-dialog">
        <!-- <div class="loading-notice">{{font}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      timer: null,
      timout: null,
      font: "加载中",
      loadingShow: false
    };
  },
  created() {
    let _self = this;
    _self.timout = setTimeout(() => {
      _self.loadingShow = true;
    }, 1000);
    // _self.timer = setInterval(() => {
    //   if (_self.font.length > 5) {
    //     _self.font = "加载中";
    //   } else {
    //     _self.font += ".";
    //   }
    // }, 500);
  },
  destroyed() {
    this.timer = null;
  }
};
</script>

<style lang="scss" >
@import "./../style/main.scss";
.loading-main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30000;
}
.loading-dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.loading-notice {
  width: 50vw;
  height: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //   background-color: red;
  line-height: 50vw;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 5.7vw;
}
</style>
