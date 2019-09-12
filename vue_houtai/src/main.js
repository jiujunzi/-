import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 挂载到全局对象上
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在请求头中加入token，配置给headers下的authorization
axios.interceptors.request.use(config => {
  // console.log(config)
  // Authorization是自己加的属性
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 返回新的config
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
