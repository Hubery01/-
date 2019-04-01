<template>
    <div class='app-shopcart'>
        <div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for='(item,i) of list' :key='i'>
                    <a href="javascript:;">
                        <input type="checkbox" style='float:left;margin-top:15px;' :data-id='item.id' :data-i='i' :checked='item.cb' @click='changeCb'>  
                        <img class="mui-media-object mui-pull-left" :src='item.img_url'>
                        <div class="mui-media-body" style='float:left'>
                            {{item.title}}
                        </div>
                        <div style='float:left'>￥{{item.price}}元</div>
                        <div class='count1'>
                            <button>-</button>
                            <input type="button" :value="item.count">
                            <button>+</button>
                        </div>
                    </a> 
                </li>
                <input type="checkbox" @click='checkAll' :checked='allcb' class='che'>
                <button @click='delAll' class='de'>删除选中商品</button>
            </ul>
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
            <router-link class="mui-tab-item mui-active" to="shopCart">
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
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            list:[],
            allcb:false,
            uid:sessionStorage.getItem("uid"),
            shopx:sessionStorage.getItem('shopx'),
            uname:sessionStorage.getItem('uname')
        }
    },
    created(){
        this.loadMore();
    },
    methods:{
        checkAll(e){
            var rs = e.target.checked;
            for(var item of this.list){
                item.cb = rs
            }
            this.allcb = rs;
        },
        changeCb(e){
            var rs = e.target.checked;
            var i = e.target.dataset.i;
            this.list[i].cb = rs;
            var p = this.list.length;
            var sum = 0;
            for(var item=0;item<p;item++){
                if(this.list[item].cb == true){
                    sum++;
                }
            }
            if(sum == p){
                this.allcb = true
            }else{
                this.allcb = false
            }
        },
        removeItem(e){
            var id = e.target.dataset.id;
            var idx = e.target.dataset.idx;
            var url = 'http://127.0.0.1:3000/removeItem';
            var postData = this.qs.stringify({id})
            this.axios.post(url,postData).then(result=>{
                if(result.data.code==1){
                    var i = e.target.dataset.idx;
                    this.list.splice(i,1)
                    Toast('删除成功');
                }else{
                    Toast('删除失败')
                }
            })
        },
        delAll(){
            var html = '';
            for(var item of this.list){
                if(item.cb){
                    html += item.id+',';
                }
            }
            if(html.length == 0){
                Toast('请选中需要删除的商品！')
            }else{
                html = html.substring(0,html.length-1)
                var url = 'http://127.0.0.1:3000/removeItems?ids='+html;
                this.axios.get(url).then(result=>{
                    if(result.data.code == 1){
                        Toast('删除成功')
                        this.loadMore();
                    }else{
                        Toast('删除失败')
                    }
                })
            }
        },
        loadMore(){
            var url = 'http://127.0.0.1:3000/getshopCart?uid='+this.uid;
            this.axios.get(url).then(result=>{
                if(result.data.code==-1){
                    Toast("购物车为空")
                }else{
                    var rows = result.data.data;
                    for(var item of rows){
                        item.cb = false
                    }
                    this.list = rows;
                }
            })
            var url = "http://127.0.0.1:3000/getshopCart?uid="+sessionStorage.getItem("uid")
            this.axios(url).then(result=>{
                if(result.data.code==-1){
                    sessionStorage.setItem("shopx",0)
                }else{
                    var shopx = result.data.data.length
                    sessionStorage.setItem("shopx",shopx)
                }
                    location.href = "http://127.0.0.1:8080/#/shopCart"
            })
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
.mui-media-body{
    width:280px;
}
.de{
    width:300px;
    float:right;
    margin-top:5px;
}
.che{
    margin-left: 31px;
    margin:15px 30px 
}
.count1{
    padding:0px;
    float:right;
    width:40px;
    margin-right:70px
}
</style>
