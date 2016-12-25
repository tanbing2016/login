/**
 * Created by Administrator on 2016/12/25.
 */
var express = require('express');
var app = express();
var path=require("path");
var fs=require("fs");
var bodyParser=require("body-parser");
var session=require("express-session");
var users=[];
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"zfpx"
}));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.resolve("views"));
app.use(express.static(path.join(__dirname,'public')));
app.use("/signup",function(req,res,next){
    next();
});
//注册
app.get('/signup',function(req,res){
    fs.readFile("./users.json","utf8",function(err,data){
        res.render("signup",{title:"注册页面",error:req.session.error,success:req.session.success});
    })
});
app.post('/signup',function(req,res){
    req.session.error="";
    req.session.success="";
    fs.readFile("./users.json","utf8",function(err,data){
            var user=req.body;
            data=JSON.parse(data);
            var one=data.find((item)=>item.username==user.username);
            if(one){
                req.session.error="用户名已被注册!";
                res.redirect("/signup");
                return ;
            }
            data.push(user);
            fs.writeFile("./users.json",JSON.stringify(data),function(){
                res.redirect("/signin");
            });
    });
});
//登录
app.get('/signin',function(req,res){
    res.render("signin",{title:"登录页面",error:req.session.error,success:req.session.success});
});
app.post('/signin',function(req,res){
    fs.readFile("./users.json","utf8",function(err,data){
        req.session.name="";
        var user=req.body;
        data=JSON.parse(data);
        var one=data.find((item)=>item.username==user.username&&item.password==user.password);
        console.log(one);
        if(!one){
            req.session.error="用户名或者密码错误!";
            res.redirect("/signin");
            return ;
        }
        req.session.name=one.username;
        res.redirect("/welcome");
    });
});
//欢迎页
app.get('/welcome',function(req,res){
    users=JSON.stringify(users);
    res.render("welcome",{title:"欢迎页面",username:req.session.name});
});
app.listen(9999);