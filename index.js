const express=require("express");
const favicon=require("express-favicon");
const path=require("path");
const fs=require("fs");
const ejs=require("ejs");
const site=new express();
site.listen(80,()=>{
    console.log("Site online");
});
site.use(express.static(path.join(__dirname,"./static")));
site.use(favicon(path.join(__dirname,"./static/stewbot.jpg")));

fs.readdirSync("./ejs").forEach(async page=>{
    site.get(`/${page.split(".")[0]}`,async (req,res)=>{
        var ejsGlobals={
            "header":`<div id="banner">
                        <a href="/"><img src="stewbot.jpg" id="stewIcon"><img src="banner.png" id="stewBanner"></a><br>
                        <span class="green"><b class="cyan">S</b>teward <b class="cyan">T</b>o <b class="cyan">E</b>xpedite <b class="cyan">W</b>ork</span><br><br>
                        <a class="bannerBtn" href="features">Features</a><a class="bannerBtn" href="commands">Commands</a><a href="pricing" class="bannerBtn">Pricing</a><a href="add" class="bannerBtn">Install Stewbot</a><a class="bannerBtn" href="/source">Source Code</a><a href="/donate" class="bannerBtn">Donate</a>
                    </div>
                    <br>`,
            "footer":`<footer>Developed by <a href="https://github.com/Kestron06">Kestron</a> and <a href="https://github.com/Reginald-Gillespie">WKoA</a>. Find Stewbot in the <a href="https://discord.com/application-directory/966167746243076136
">App Directory</a>. Join our <a href="https://discord.gg/k3yVkrrvez">Discord Support Server here</a>. <a href="/tos">Terms of Service</a>/<a href="/privacy">Privacy Policy</a></footer>`
        };
        if(page==='pricing.ejs'||page==='commands.ejs'){
            await fetch(`https://raw.githubusercontent.com/KestronProgramming/Stewbot/refs/heads/main/data/helpPages.json`).then(d=>d.text()).then(d=>{
                ejsGlobals.helpCommands=JSON.parse(d);
            });
        }
        if(page==='source.ejs'){
            await fetch(`https://raw.githubusercontent.com/KestronProgramming/Stewbot/main/index.js`).then(d=>d.text()).then(d=>{
                ejsGlobals.stewbotSource=d;
            });
        }
        ejs.renderFile(`./ejs/${page}`, ejsGlobals, {}, function(err, str) {
			if (err) {
				res.send(err);
				return;
			}
			res.send(str);
		});
    });
});
site.get('/',(req,res)=>{
    var ejsGlobals={
        "header":`<div id="banner">
                    <a href="/"><img src="stewbot.jpg" id="stewIcon"><img src="banner.png" id="stewBanner"></a><br>
                    <span class="green"><b class="cyan">S</b>teward <b class="cyan">T</b>o <b class="cyan">E</b>xpedite <b class="cyan">W</b>ork</span><br><br>
                    <a class="bannerBtn" href="features">Features</a><a class="bannerBtn" href="commands">Commands</a><a href="pricing" class="bannerBtn">Pricing</a><a href="add" class="bannerBtn">Install Stewbot</a><a class="bannerBtn" href="/source">Source Code</a><a href="/donate" class="bannerBtn">Donate</a>
                </div>
                <br>`,
        "footer":`<footer>Developed by <a href="https://github.com/Kestron06">Kestron</a> and <a href="https://github.com/Reginald-Gillespie">WKoA</a>. Find Stewbot in the <a href="https://discord.com/application-directory/966167746243076136
">App Directory</a>. Join our <a href="https://discord.gg/k3yVkrrvez">Discord Support Server here</a>. <a href="/tos">Terms of Service</a>/<a href="/privacy">Privacy Policy</a></footer>`
    };
    ejs.renderFile(`./ejs/index.ejs`, ejsGlobals, {}, function(err, str) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(str);
    });
});
site.get('/addIt',(req,res)=>{
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=966167746243076136&permissions=8&scope=applications.commands%20bot");
});
site.get(`*`,(req,res)=>{
    res.status(404).send(fs.readFileSync(`./404.html`,'utf-8'));
});