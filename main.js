import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router'
import qs from 'qs'
Vue.prototype.qs = qs
import axios from 'axios'
axios.defaults.withCredentials=true
Vue.prototype.axios=axios
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// import './lib/mui/js/mui.js'
// import './lib/mui/js/mui.min.js'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
// 1.引入Header,Button属性
import {Header,Button,Swipe,SwipeItem} from "mint-ui"
// 2.注册Header属性
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
// 创建全局过滤器
Vue.filter('datatimeFilter',function(val){
  // 依据原始日期格式创建日期对象
  var now=new Date(val);
  // 获取日期对象 年 月 日
  var y = now.getFullYear(); 
  var m = now.getMonth()+1;
  var d = now.getDate();
  // 获取日期对象 时 分 秒
  var h = now.getHours();
  var mi = now.getMinutes();
  var s = now.getSeconds();
  // 月份与日期 如果当前月份小于10，前拼接0
  m<10&&(m='0'+m);
  d<10&&(d='0'+d);
  s<10&&(s='0'+s);
  // 拼接字符串返回
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
})
// 3.用户登录

new Vue({
  router,
  render:h =>h(App),
}).$mount('#app')
