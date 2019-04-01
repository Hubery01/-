import Vue from 'vue'
import Router from 'vue-router'
import List from "./components/List.vue"
import Login from "./components/tabbar/Login.vue"
import Products from "./components/tabbar/products.vue"
import Home from "./components/tabbar/Home.vue"
import productsInfo from "./components/tabbar/productsInfo.vue"
import shopCart from "./components/tabbar/shopCart.vue"
import register from "./components/tabbar/register.vue"
import center from "./components/tabbar/center.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/Home'},
    {path:'/List',component:List},
    {path:'/Login',component:Login},
    {path:'/register',component:register},
    {path:'/products',component:Products},
    {path:'/Home',component:Home},
    {path:'/productsInfo',component:productsInfo},
    {path:'/shopCart',component:shopCart},
    {path:'/center',component:center}
  ]
})
