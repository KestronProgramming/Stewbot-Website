const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const site = express();
const NodeCache = require("node-cache");
const vm = require('node:vm');
const helmet = require('helmet');
const compression = require('compression')

// @ts-ignore
site.use(helmet({ contentSecurityPolicy: false }));
site.use(compression())
site.use(express.static(path.join(__dirname, "./static")));
site.use(favicon(path.join(__dirname, "./static/stewbot.jpg")));

const cache = new NodeCache({ stdTTL: 60 * 20 });
const ejsVars = {};

// Load ejs partials into ejsGlobals
fs.readdirSync("./partials").forEach(async partial => {
    const partialLoc = `./partials/${partial}`;
    const partialName = partial.split(".")[0];
    const content = await fs.promises.readFile(partialLoc);
    ejsVars[partialName] = content;
});

fs.readdirSync("./ejs").forEach(async page => {
    site.get(`/${page.split(".")[0]}`, async (req, res) => {
        let ejsGlobals = {
            ...ejsVars,
            "curDomain": `${req.protocol}://${req.get('host')}${req.originalUrl}`
        };

        // Get help commands when needed
        if (page === 'pricing.ejs' || page === 'commands.ejs') {
            if (!cache.has("helpCommands")) {
                const re = await fetch(`https://raw.githubusercontent.com/KestronProgramming/Stewbot/refs/heads/main/data/helpPages.json`)
                const commands = await re.json();
                cache.set("helpCommands", commands)
            }
            // @ts-ignore
            ejsGlobals.helpCommands = cache.get("helpCommands");

            if (!cache.has("categories")) {
                const re = await fetch(`https://raw.githubusercontent.com/KestronProgramming/Stewbot/main/commands/modules/Categories.js`)
                const commandsFile = await re.text();

                // I'd rather not use eval, so we'll execute in a VM.
                const sandbox = { module: { exports: {} }, exports: {}, };
                vm.createContext(sandbox);
                vm.runInContext(commandsFile, sandbox);
                let Categories = Object.values(sandbox.module.exports); // Get as array

                cache.set("categories", Categories)
            }
            // @ts-ignore
            ejsGlobals.categories = cache.get("categories");
        }

        if (page === 'source.ejs') {
            if (!cache.has("index.js")) {
                const re = await fetch(`https://raw.githubusercontent.com/KestronProgramming/Stewbot/main/index.js`)
                const code = await re.text();
                cache.set("index.js", code)
            }
            // @ts-ignore
            ejsGlobals.stewbotSource = cache.get("index.js");
        }

        ejs.renderFile(`./ejs/${page}`, ejsGlobals, {}, function (err, str) {
            if (err) {
                res.send(err);
                return;
            }
            res.send(str);
        });
    });
});

site.get('/', (req, res) => {
    let ejsGlobals = {
        ...ejsVars,
        "curDomain": `${req.protocol}://${req.get('host')}${req.originalUrl}`
    };
    ejs.renderFile(`./ejs/index.ejs`, ejsGlobals, {}, function (err, str) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(str);
    });
});

site.get('/addIt', (req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=966167746243076136");
});

site.get(`*`, (req, res) => {
    let ejsGlobals = {
        ...ejsVars,
        "curDomain": `${req.protocol}://${req.get('host')}${req.originalUrl}`
    };
    ejs.renderFile(`./ejs/404.ejs`, ejsGlobals, {}, function (err, str) {
        if (err) {
            res.send(err);
            return;
        }
        res.status(404).send(str);
    });
});

site.listen(process.env?.PORT || 80, () => {
    console.log("Site online");
});
