<template>
<div>
    <div class='proinfo-app'>
        <div class='proinfo-item'>
            <img :src='info.img_url' alt="">
            <h3>{{info.title}}</h3>
            <h5>{{info.subtitle}}</h5>
            <h3 class="now">
                ￥{{info.price}}
            </h3>
            <div class="addcar">
                <button @click="down">-</button>
                <button>{{count}}</button>
                <button @click="up">+</button>
            </div>
            <button class='add' @click='addcart'>加入购物车</button>
            <button class='buynow'>立即购买</button>
        </div>
        <mt-swipe :auto='4000' style='height:250px;'> 
            <mt-swipe-item v-for='(item,i) of navlist' :key='i'>
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item mui-active" to='products'>
            <span class="mui-icon mui-icon-bars"></span>
            <span class="mui-tab-label">商品</span>
        </router-link>
        <router-link class="mui-tab-item" to="shopCart">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge"></span>
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
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            id:this.$route.query.id,
            info:{},
            count:1,
            navlist:[],
            uname:sessionStorage.getItem('uname'),
            shopx:sessionStorage.getItem('shopx'),
            uid:sessionStorage.getItem('uid')
        }
    },
    created(){
        this.findpro();
        this.handleImage();
    },
    methods:{
        user(){
            if(this.uname){
                location.href = 'http://127.0.0.1:8080/#/center'
            }else{
                location.href = 'http://127.0.0.1:8080/#/login'
            }
        },
        addcart(){
            var url = 'http://127.0.0.1:3000/addcart';
            var params = new URLSearchParams();
            params.append('uid',this.uid)
            params.append('count',this.count)
            params.append('id',this.id)
            params.append('title',this.info.title)
            params.append('price',this.info.price)
            params.append('img_url',this.info.img_url)
            if(this.uid){
            this.axios.post(url,params).then(result=>{
                if(result.data.code == 1){
                    Toast('添加成功')
                    var url = "http://127.0.0.1:3000/getshopCart?uid="+sessionStorage.getItem("uid")
                    this.axios(url).then(result=>{
                        if(result.data.code==-1){
                            sessionStorage.setItem("shopx",0)
                        }else{
                            var shopx = result.data.data.length
                            sessionStorage.setItem("shopx",shopx)
                        }
                    })
                }else{
                    Toast("添加失败")
                }
            })
            }else{
                Toast("请登录之后操作")
            }
        },
        handleImage(){
            var url='http://127.0.0.1:3000/imglist';
            this.axios.get(url).then(result=>{
                this.navlist=result.data.data;
            })
        },
        findpro(){
            var id = this.id
            var url = 'http://127.0.0.1:3000/findpro?id='+this.id;
            this.axios.get(url).then(result=>{
                this.info = result.data.data[0];
            })
        },
        down(){
            if(this.count>0)
            this.count--
        },
        up(){
            this.count++
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
.proinfo{
    width:97%;
}
.proinfo-app .proinfo-item h3{
    font-size: 22px;
    color: #666;
}
.proinfo-item h3,.proinfo-item h4,.proinfo-item h5{
    text-align: center;
    margin-bottom:10px;
}
button{    
    border: 0;
    margin: 20px auto 0;
    padding: 10px 15px!important;
    color: #fff;
    width: 100%;
    
}
.add{
    background: #3C3C3C;
    color: #fff;
    margin:10px auto;
}
.buynow{
    background: #e41608;
    color: #fff;
}
.addcar{
    text-align: center;
}
.addcar button{
    width:20%;
}
.cou{
    border: 1px solid #000;
    width: 50px!important;
    height: 39px;
    font-size: 16px;
    text-align: center;
}
</style>
