const express=require("express");
const favicon=require("express-favicon");
const path=require("path");
const fs=require("fs");
const site=new express();
site.listen(80,()=>{
    console.log("Site online");
});
site.use(express.static(path.join(__dirname,"./static")));
site.use(favicon(path.join(__dirname,"./static/stewbot.jpg")));

var pages=["source","add","pricing","features","commands"];
pages.forEach(page=>{
    site.get(`/${page}`,(req,res)=>{
        res.send(fs.readFileSync(`./static/${page}.html`,'utf-8'));
    });
});
site.get('/addIt',(req,res)=>{
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=966167746243076136&permissions=8&scope=applications.commands%20bot");
});
