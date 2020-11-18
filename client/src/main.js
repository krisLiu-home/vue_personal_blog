import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import request from './services/request'
import '@/assets/css/main.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'

document.title = "键盘钢琴家"

window.request = request();
window.axios = request();

store.dispatch('loginUser/whoAmI');  // 在网站刚启动时就要用token换取信息


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
