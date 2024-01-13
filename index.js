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
/*
var possibleXs=[];
for(var i=0;i<width;i+=25){
    possibleXs.push(i);
}
var objs=[];
function bin(){
    this.x=possibleXs[floor(random(0,possibleXs.length))];
    this.y=-random(0,height);
    this.num=floor(random(0,2));
    this.s=floor(random(0,25));
}
bin.prototype.display=function(){
    fill(0,215,255);
    textSize(this.s);
    text(this.num,this.x,this.y);
    
    this.y+=this.s/10;
    if(this.y>height+20){
        this.y=-20;
    }
};
function circuit(){
    this.dir=floor(random(0,4));
    this.dir2=floor(random(0,3));
    this.x1=random(0,width);
    this.y1=random(0,height);
    this.loc2=random(0,this.dir===0||this.dir===2?width:height);
    
    this.startPos=new PVector(this.dir===0||this.dir===2?this.x1:this.dir===1?-20:width+20,this.dir===1||this.dir===3?this.y1:this.dir===0?-20:height+20);
    this.intsectPos=new PVector(this.startPos.x,this.startPos.y);
    this.endPos=new PVector(this.intsectPos.x,this.intsectPos.y);
    this.targetPos=new PVector(this.intsectPos.x,this.intsectPos.y);
    this.step=0;
    this.t=255;
}
circuit.prototype.display=function(){
    fill(0,255,0,this.t);
    stroke(0,255,0,this.t);
    strokeWeight(1);
    line(this.startPos.x,this.startPos.y,this.intsectPos.x,this.intsectPos.y);
    line(this.intsectPos.x,this.intsectPos.y,this.endPos.x,this.endPos.y);
    noStroke();
    
    switch(this.step){
        case 0:
            this.endPos.x=this.intsectPos.x;
            this.endPos.y=this.intsectPos.y;
            if(this.intsectPos.x>this.x1){
                this.intsectPos.x-=5;
            }
            if(this.intsectPos.y>this.y1){
                this.intsectPos.y-=5;
            }
            if(this.intsectPos.x<this.x1){
                this.intsectPos.x+=5;
            }
            if(this.intsectPos.y<this.y1){
                this.intsectPos.y+=5;
            }
            if(dist(this.intsectPos.x,this.intsectPos.y,this.x1,this.y1)<5){
                this.step=1;
                this.targetPos.x=this.dir===0||this.dir===2?this.loc2:this.intsectPos.x;
                this.targetPos.y=this.dir===1||this.dir===3?this.loc2:this.intsectPos.y;
                this.endPos.x=this.intsectPos.x;
                this.endPos.y=this.intsectPos.y;
            }
        break;
        case 1:
            if(this.endPos.x>this.targetPos.x){
                this.endPos.x-=5;
            }
            if(this.endPos.y>this.targetPos.y){
                this.endPos.y-=5;
            }
            if(this.endPos.x<this.targetPos.x){
                this.endPos.x+=5;
            }
            if(this.endPos.y<this.targetPos.y){
                this.endPos.y+=5;
            }
            if(dist(this.endPos.x,this.endPos.y,this.targetPos.x,this.targetPos.y)<5){
                this.step=2;
            }
        break;
        case 2:
            ellipse(this.endPos.x,this.endPos.y,10,10);
            this.t-=5;
        break;
    }
};
for(var i=0;i<width/20;i++){
    objs.push(new circuit());
}
textFont(createFont("monospace"));
for(var i=0;i<width*2;i++){
    objs.push(new bin());
}
draw = function(){
    background(0);
    for(var i=0;i<objs.length;i++){
        objs[i].display();
        if(objs[i].t<0){
            objs.splice(i,1);
            i--;
            objs.push(new circuit());
        }
    }
};
*/