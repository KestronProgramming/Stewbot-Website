const express=require("express");
const favicon=require("express-favicon");
const path=require("path");
const fs=require("fs");
const ejs=require("ejs");
const site=express();
site.listen(process.env?.PORT || 80,()=>{
    console.log("Site online");
});
site.use(express.static(path.join(__dirname,"./static")));
site.use(favicon(path.join(__dirname,"./static/stewbot.jpg")));

// Load ejs partials into ejsGlobals
const ejsPartials = { }
fs.readdirSync("./partials").forEach(async partial => {
    const partialLoc = `./partials/${partial}`;
    const partialName = partial.split(".")[0];
    const content = await fs.promises.readFile(partialLoc);
    ejsPartials[partialName] = content;
})

fs.readdirSync("./ejs").forEach(async page=>{
    site.get(`/${page.split(".")[0]}`,async (req,res)=>{
        let ejsGlobals={
            ...ejsPartials,
	        "curDomain":`${req.protocol}://${req.get('host')}${req.originalUrl}`
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
    let ejsGlobals={
        ...ejsPartials,
        "curDomain":`${req.protocol}://${req.get('host')}${req.originalUrl}`
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
