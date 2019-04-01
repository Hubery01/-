<template>
    <div>
        <img src="http:127.0.0.1:3000/img/index1/logo.png" alt="">
        <form>
        <input type="text" name='uname' v-model='uname' placeholder="请输入用户名"><br>
        <input type="password" name='upwd' v-model='upwd' placeholder="请输入密码"><br>
        <input type="button" style='width:30%;float:left' value="立即注册" @click='reg0'>
        </form>
                <!-- 底部 -->
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
                <span class="mui-badge"></span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item mui-active" to='Login'>
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            uname:'',
            upwd:''
        }
    },
    methods:{
         reg0(){
            // 1：获取输入的用户名和密码
                var $uname = this.uname;
                var $upwd = this.upwd;
                console.log($uname)
            // 2：创建正则表达式验证用户名和密码格式是否正确
                var reg1 = /^[a-z0-9_]{3,8}$/i;
                if(!reg1.test($uname)){
                    // 提示信息不匹配
                    Toast('用户名格式有误，请检查');
                    return;
                }
                if(!reg1.test($upwd)){
                    // 提示信息不匹配
                    Toast('密码格式不正确，请检查');
                    return;
                }
            // 3：发送ajax
                var url = 'http://127.0.0.1:3000/register?uname='+$uname+'&upwd='+$upwd;
                this.axios.get(url).then(result=>{
                    Toast(result.data.msg)
                    location.href = "http://127.0.0.1:8080/#/"
                });
            // 4：获取服务器返回结果
            // 5：提示用户
    }
}
}

</script>