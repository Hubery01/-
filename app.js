// 引入两个模块
const express=require('express');
const mysql=require('mysql');
// 引入模块
const cors = require('cors');
// 创建连接池
var pool=mysql.createPool({
    host:'127.0.0.1', 
    user:'root',
    upwd:'',
    database:'tissot'
});
// 创建express对象
var server=express();
// 加载模板
const session = require('express-session');
server.use(session({
    secret:'128位随机字符串',
    resave:false,
    saveUninitialized:true,
    cookie:{
    maxAge:1000*60*60
    }
}))
// 配置允许访问列
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080'],
    credentials:true
})); 
// 配置静态资源目录
server.use(express.static('public'));
// 配置第三方中间件
const bodyParser = require('body-parser');
// 配置json是否自动转换
server.use(bodyParser.urlencoded({extended:false}))
// 为express对象绑定监听端口
server.listen(3000);


//1.登录
server.get('/login',(req,res)=>{
    // -获取客户参数	uname、upwd
    var $uname=req.query.uname;
    var $upwd=req.query.upwd;
    var sql='select uid from user where uname=? AND upwd=?';
    // 执行sql
    pool.query(
        sql,[$uname,$upwd],(err,result)=>{
            if(err) throw err;
            if(result.length==0)
                res.send({code:-1,msg:'用户名或者密码不正确'})
            else{
                res.send({code:1,data:result})
            }
        }
    )
})
//2.注册
server.get("/register",(req,res)=>{
    var uname = req.query.uname
    var upwd = req.query.upwd
    var sql1 = "select * from user where uname = ?"
    var sql2 = "INSERT INTO user (uid,uname,upwd,email,phone,user_name,gender) VALUES (NULL,?,?,NULL,NULL,NULL,NULL);"
    pool.query(sql1,[uname],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            pool.query(sql2,[uname,upwd],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"注册成功"})
                }else{
                    res.send({code:-1,msg:"注册失败"})
                }
            })
        }else{
            res.send({code:-1,msg:"用户名被占用"})
        }
    })
})
//3.商品分页显示
server.get('/products',(req,res)=>{
    var $pno=req.query.pno;
    var $pageSize=req.query.pageSize;
    if(!$pno) $pno=1
    if(!$pageSize) $pageSize=6
    var sql='select id,title,subtitle,price,img_url from index_product group by id Limit ?,?';
    var offset = ($pno-1) * $pageSize;
    pageSize = parseInt($pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if (err) throw err;
        res.send({code:1,data:result})
    })
})
//4.首页轮播图
server.get('/imglist',(req,res)=>{
    var sql = 'select id,img_url from imglist';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})
//5.图片列表
server.get('/list',(req,res)=>{
    var rows = [
        {id:1,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-01.jpg'},
        {id:2,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-02.jpg'},
        {id:3,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-03.jpg'},
        {id:4,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-04.jpg'},
        {id:5,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-05.jpg'},
        {id:6,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-starwatch-06.jpg'}
    ];
    res.send({code:1,data:rows})
})
//6.首页推荐
server.get('/product',(req,res)=>{
    var sql = 'select id,title,subtitle,price,img_url from index_product'
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send({code:1,data:result})
    })
})
//7.石英腕表
server.get('/sy',(req,res)=>{
    var sql = 'select id,title,subtitle,price,img_url from index_product'
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send({code:1,data:result})
    })
})
//8.机械腕表
server.get('/jx',(req,res)=>{
    var sql = 'select id,title,subtitle,price,img_url from index_product'
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send({code:1,data:result})
    })
})
//9.明星推荐
server.get('/mx',(req,res)=>{
    var list = [
        {id:1,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-new.jpg'},
        {id:2,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-couples.jpg'},
        {id:3,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-maleselling.jpg'},
        {id:4,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-famaleselling.jpg'},
        {id:4,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-luer.jpg'},
        {id:4,img_url:'http://127.0.0.1:3000/img/index1/tissot-homepage-mb-watch-buttom-criteria.jpg'}
    ];
    res.send({code:1,data:list})
})
//10.首页九宫格
server.get('/grid',(req,res)=>{
    var rows = [
        {id:1,title:'新闻',img_url:'http://127.0.0.1:3000/img/grid/menu1.png'},
        {id:2,title:'商品',img_url:'http://127.0.0.1:3000/img/grid/menu2.png'},
        {id:3,title:'点餐',img_url:'http://127.0.0.1:3000/img/grid/menu3.png'},
        {id:4,title:'位置',img_url:'http://127.0.0.1:3000/img/grid/menu4.png'},
        {id:5,title:'搜索',img_url:'http://127.0.0.1:3000/img/grid/menu5.png'},
        {id:6,title:'电话',img_url:'http://127.0.0.1:3000/img/grid/menu6.png'}
    ];
    res.send(rows)
})
//11.购物车列表
server.get('/getshopCart',(req,res)=>{
    var uid = req.query.uid
    var sql = 'select id,pid,price,title,img_url,count from shoppingcart where uid = ?'
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
        res.send({code:-1,data:"购物车为空"})
    }else{
        res.send({code:1,data:result})
    }
    })
})
//11.删除购物车中的某个商品
server.post('/removeItem',(req,res)=>{
    var id = req.body.id;
    var sql = 'delete from shoppingcart where id = ?'
    id = parseInt(id)
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'删除成功'})
        }else{
            res.send({code:-1,msg:'删除失败'})
        }
    })
})
//12.删除用户多个商品
server.get('/removeItems',(req,res)=>{
    var ids = req.query.ids;
    var sql = 'delete from shoppingcart where id in('+ids+')';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'删除成功'})
        }else{
            res.send({code:-1,msg:'删除失败'})
        }
    })
})
//13.添加购物车
server.post('/addcart',(req,res)=>{
    var uid = req.body.uid;
    var pid = req.body.id;
    var count = req.body.count;
    var title = req.body.title;
    var price = req.body.price;
    var img_url = req.body.img_url;
    var sql1 = 'insert into shoppingcart (id,uid,pid,count,title,price,img_url) values(null,?,?,?,?,?,?);'
    var sql2 = 'select count from shoppingcart where uid = ? AND pid = ?';
    var sql3 = 'update shoppingcart set count = count+? where uid = ? AND pid = ?'
    pool.query(sql2,[uid,pid],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            pool.query(sql1,[uid,pid,count,title,price,img_url],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"添加成功"})
                }else{
                    res.send({code:-1,msg:"添加失败"})
                }
            })
        }else{
            pool.query(sql3,[count,uid,pid],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"添加成功"})
                }else{
                    res.send({code:-1,msg:"添加失败"})
                }
           })
        }
    })
});
//14.用户点击商品列表显示详细信息
server.get('/findpro',(req,res)=>{
    var id = req.query.id;
    var sql = 'select price,title,subtitle,img_url from index_product where id = ?'
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})