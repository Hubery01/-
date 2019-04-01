<template>
    <div class='app-pro'>
        <div class='pro-app'>
            <div class='pro-item' v-for='(item,i) of list' :key='i'>
                <img :src='item.img_url' alt="">
                <h5>{{item.title}}</h5>
                <h6>{{item.subtitle}}</h6>
                <h5 class="now">
                    ￥{{item.price}}
                </h5>
                <mt-button size='small' type='danger' @click.prevent='jumpinfo' :data-id='item.id' >立即购买</mt-button>
            </div>
        </div>
        <mt-button @click='loadMore' size='large' type='primary'>加载更多</mt-button>
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
                <span class="mui-badge">{{shopx}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to='Login'>
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            list:[],
            pno:0,
            shopx:sessionStorage.getItem('shopx'),
        }
    },
    created(){
        this.loadMore();
    },
    methods:{
        loadMore(){
            this.pno++;
            var url='http://127.0.0.1:3000/products?pno='+this.pno;
            this.axios.get(url).then(result=>{
                if(result.data.data.length>0){
                var rows = this.list.concat(result.data.data);
                this.list = rows;}else{
                    Toast("没有商品了呢！")
                }
            })
        },
        jumpinfo(e){
            var id = e.target.dataset.id;
            this.$router.push('/productsInfo?id='+id)
        },
    }
}
</script>
<style>
    .header{
        display:flex;
        width:100%;
    }
    .app-pro{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:4px;
    }
    .pro-item{
        width:49%;
        border:1px solid #ccc;
        margin:2px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        min-height:245px;
    }
    img{
        width:100%;
    }

</style>
