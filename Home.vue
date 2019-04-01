<template>
    <div class='app-home'>
        <!-- 轮播图 mint-ui -->
        <mt-swipe :auto='4000'> 
            <mt-swipe-item v-for='(item,i) of navlist' :key='i'>
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 承诺 -->
        <div class="mui-content-padded">
            <p>
                <img src="http://127.0.0.1:3000/img/index1/bs_gift2019_gift_mb.jpg" data-preview-src="" data-preview-group="1" />
            </p>
        </div>
        <!-- 明星腕表 -->
        <h2 class="title-has-border"><span>明星腕表<span></span></span></h2>
        <!-- 图片列表 -->
        <div class="mui-content">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for='(item,i) of list' :key='i'>
                        <img :src="item.img_url" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品推荐 -->
        <div><img src="http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-locke.jpg" alt=""></div>
        <div class='pro-app'>
            <div class='pro-item' v-for='(item,i) of product' :key='i'>
                <img :src='item.img_url' alt="">
                <h5>{{item.title}}</h5>
                <h6>{{item.subtitle}}</h6>
                <h5 class="now">
                    ￥{{item.price}}
                </h5>
                <mt-button size='small' type='danger' @click.prevent='jumpinfo' :data-id='item.id' >立即购买</mt-button>
            </div>
        </div>
        <!-- 石英机芯腕表 -->
        <div><img src="http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-quartzmechanical.jpg" alt=""></div>
        <div class='pro-app'>
            <div class='pro-item' v-for='(item,i) of sy' :key='i'>
                <img :src='item.img_url' alt="">
                <h5>{{item.title}}</h5>
                <h6>{{item.subtitle}}</h6>
                <h5 class="now">
                    ￥{{item.price}}
                </h5>
                <mt-button size='small' type='danger' @click.prevent='jumpinfo' :data-id='item.id' >立即购买</mt-button>
            </div>
        </div>
        <!-- 机械机芯腕表 -->
        <div><img src="http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-mechanicalmovement.jpg" alt=""></div>
        <div class='pro-app'>
            <div class='pro-item' v-for='(item,i) of jx' :key='i'>
                <img :src='item.img_url' alt="">
                <h5>{{item.title}}</h5>
                <h6>{{item.subtitle}}</h6>
                <h5 class="now">
                    ￥{{item.price}}
                </h5>
                <mt-button size='small' type='danger' @click.prevent='jumpinfo' :data-id='item.id' >立即购买</mt-button>
            </div>
        </div>
        <!-- 明星同款 -->
        <div><img src="http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-star.jpg" alt=""></div>
        <div class='mx-app'>
            <div class="mx-item" v-for='(item,i) of mx' :key='i'>
                <img :src="item.img_url" alt="">
            </div>
        </div>
        <!-- 底部 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="home">
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
            navlist:[],
            gridlist:[],
            list:[],
            product:[],
            sy:[],
            jx:[],
            mx:[],
            uname:sessionStorage.getItem("uname"),
            shopx:sessionStorage.getItem('shopx'),
            uid:sessionStorage.getItem('uid')
        }
    },
    created(){
        this.handleImage();
        this.handleGrid();
        this.handleList();
        this.handleProduct();
        this.handleSy();
        this.handleJx();
        this.handleMx();
    },
    methods:{
        handleGrid(){
            var url='http://127.0.0.1:3000/grid';
            this.axios.get(url).then(result=>{
                this.gridlist=result.data;
            })
        },
        handleImage(){
            var url='http://127.0.0.1:3000/imglist';
            this.axios.get(url).then(result=>{
                this.navlist=result.data.data;
            })
        },
        handleList(){
            var url = 'http://127.0.0.1:3000/list';
            this.axios.get(url).then(result=>{
                this.list = result.data.data;
            })
        },
        handleProduct(){
            var url = 'http://127.0.0.1:3000/product';
            this.axios.get(url).then(result=>{
                this.product = result.data.data.splice(0,4);
            })
        },
        handleSy(){
            var url = 'http://127.0.0.1:3000/sy';
            this.axios.get(url).then(result=>{
                this.sy = result.data.data.splice(4,4);
            })
        },
        handleJx(){
            var url = 'http://127.0.0.1:3000/jx';
            this.axios.get(url).then(result=>{
                this.jx = result.data.data.splice(8,4);
            })
        },
        handleMx(){
            var url = 'http://127.0.0.1:3000/mx';
            this.axios.get(url).then(result=>{
                this.mx = result.data.data;
            })
        },
        jumpinfo(e){
            var id = e.target.dataset.id;
            this.$router.push('/productsInfo?id='+id)
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
    .app-home .mint-swipe{
        height:270px;
        width:100%;
    }
    .mint-header{
        background-color: #aaa;
    }
    .app-home .mint-swipe img{
        width:100%;
    }
    .app-home .mui-grid-9 img{
        width:60px;
        height:60px;
    }
    .app-home .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }
    .title-has-border{
        width:97%;
        margin:40 auto;
        border-top: 1px solid #000;
        text-align: center;
        font-size: 22px;
        margin: 40px 0;
        font-weight: normal;
    }
    .title-has-border span{
        display: block;
        background: #fff;
        width: 180px;
        text-align: center;
        margin: -13px auto 0;
    }
    .pro-app{
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
        background:#fff;
    }
    .pro-item h6,.pro-item h5,.pro-item span{
        text-align:center;
    }
    .pro-item .now{
        color:#f00
    }
    .mx-item{
        width:49%;
        border:1px solid #ccc;
        margin:2px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        background:#fff;
    }
    .mx-app{
        display:flex;
        padding:4px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>
