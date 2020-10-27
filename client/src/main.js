import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import request from './services/request'
import './plugin/axios'
import '@/assets/css/main.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'

import * as loginSer from './services/loginServices'
// loginSer.login('13933616583', 'wohaizaidengni.1').then(resp=> {
//   console.log(resp);
// });

// loginSer.WhoAmI().then(resp => {
//   console.log(resp);
// })

window.request = request();

store.dispatch('loginUser/whoAmI');  // 在网站刚启动时就要用token换取信息


Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
