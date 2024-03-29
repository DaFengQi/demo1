import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import fastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

import toast from "./components/common/toast/index";

Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();

//安装toast插件
Vue.use(toast);

//3.解决移动端300ms延迟
fastClick.attach(document.body);

//4.使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/load.png")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
