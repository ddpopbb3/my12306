'use strict';
const shell = require("shelljs");
const path = require("path").posix;
const logger = require("./logger");

// const devServerSettings = require("../../configs/dev.server.js");
const pagesConf = require("../../configs/pages.config.prod.js");
// const appName = pagesConf && pagesConf.app;

// let web_root_dir = process.env.APP_WEB_ROOT || "";
// let web_root_dir = "/Users/jinxinxi/Programs/apache-tomcat-7.0.75/wtpwebapps";
// let web_root_dir = path.join(__dirname, "../src");
// web_root_dir = path.normalize(web_root_dir);


// web_root_dir = web_root_dir.replace(/\\/g, "/");

// web_root_dir = path.join(web_root_dir, appName);
let web_root_dir = path.join(__dirname, "../../src");

logger.info("Path APP_WEB_ROOT", web_root_dir);

const pagesConfPath = path.join(web_root_dir, "../configs/pages.config.prod.js");
logger.info("pagesConfPath", pagesConfPath);

require("./routeCreator").transform({
  appRootPath: web_root_dir,
  pageConfigs: [{
    fileName: "prod",
    path: pagesConfPath
  }]
});

shell.exec(" webpack -p --config configs/webpack.config.prod.js --progress --colors");
