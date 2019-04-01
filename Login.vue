<template>
    <div>
        <img src="http:127.0.0.1:3000/img/index1/logo.png" alt="">
        <form>
        <input type="text" name='uname' v-model='uname' placeholder="请输入用户名"><br>
        <input type="password" name='upwd' v-model='upwd' placeholder="请输入密码"><br>
        <input type="button" style='width:30%;float:left' value="注册" @click='reg2'>
        <input type="button" style='width:30%;float:right' value="登录" @click='sub'>
        </form>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to='products'>
                <span class="mui-icon mui-icon-bars"></span>
                <span class="mui-tab-label">分类</span>
            </router-link>
            <router-link class="mui-tab-item" to="shopCart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span class="mui-badge">{{shopx}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <span class="mui-tab-item" @click.prevent='jump'>
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </span>
        </nav>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            uname:'',
            upwd:'',
            shopx:sessionStorage.getItem('shopx'),
            uname:sessionStorage.getItem('uname'),
            uid:sessionStorage.getItem('uid')
        }
    },
    methods:{
        sub(){
            var $uname = this.uname;
            var $upwd = this.upwd;
            var reg = /^[a-z0-9_]{3,8}$/i;
            if(!reg.test($uname)){
                Toast('用户名格式有误，请检查');
                return;
            }
            if(!reg.test($upwd)){
                Toast('密码格式不正确，请检查');
                return;
            }
            var url = 'http://127.0.0.1:3000/login?uname='+$uname+'&upwd='+$upwd;
            this.axios.get(url).then(result=>{
                if(result.data.code==-1){
                    Toast(result.data.msg)
                }else{
                    sessionStorage.setItem('uname',this.uname)
                    sessionStorage.setItem("uid",result.data.data[0].uid)
                    var url = "http://127.0.0.1:3000/getshopCart?uid="+sessionStorage.getItem("uid")
                    this.axios(url).then(result=>{
                        if(result.data.code==-1){
                            sessionStorage.setItem("shopx",0)
                        }else{
                            var shopx = result.data.data.length
                            sessionStorage.setItem("shopx",shopx)
                        }
                            location.href = "http://127.0.0.1:8080/#/"
                    })
                }
            });
        },
        reg2(){
            this.$router.push({path:'/register'});
        },
        jump(){
            if(this.uname){
                this.$router.push('/center')
            }else{
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style>
</style>
