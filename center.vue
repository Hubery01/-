<template>
<div>
    <div id="setting" class="mui-page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                <span class="mui-icon mui-icon-left-nav"></span>
            </button>
            <h1 class="mui-center mui-title">设置</h1>
        </div>
    </div>
    <div class="mui-page-content">
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell mui-media" id='fir'>
                        <a class="mui-navigate-right" href="#account">
                            <img class="mui-media-object mui-pull-left head-img" id="head-img" src="http://127.0.0.1:3000/img/index1/avatar.png">
                            <div class="mui-media-body">
                                Hello {{uname}}
                                <p class='mui-ellipsis'>账号:{{uname}}</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <a href="#account" class="mui-navigate-right">账号与安全</a>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <a href="#notifications" class="mui-navigate-right">新消息通知</a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a href="#privacy" class="mui-navigate-right">隐私</a>
                    </li>
                    <li class="mui-table-view-cell">
                        <a href="#general" class="mui-navigate-right">通用</a>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <a href="#about" class="mui-navigate-right">关于我们 <i class="mui-pull-right update">V3.1.0</i></a>
                    </li>
                </ul>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" style="text-align: center;">
                        <a @click='quit'>退出登录</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
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
export default {
    data(){
        return {
            uname:sessionStorage.getItem("uname"),
            shopx:sessionStorage.getItem('shopx')
        }
    },
    methods:{
        jump(){
            if(this.uname){
                this.$router.push('/center')
            }else{
                this.$router.push('/login')
            }
        },
        quit(){
            sessionStorage.clear();
            location.href = 'http://127.0.0.1:8080/login'
        }
    }
}
</script>
<style>
#setting button{
    width:24px;
    height:44px;
}
#fir{
    margin-top: 50px;
}
.mui-media-body {
    width: 230px;
}
.mui-bar .mui-btn-link {
    font-size: 16px;
    line-height:0!important;
    top: 0!important;
    padding: 0;
    color: #007aff;
    border: 0;
}
</style>
