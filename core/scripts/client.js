const shell = require("shelljs");
const path = require("path").posix;
const logger = require("./logger");
// var devServerSettings = require("../../configs/dev.server.js");
// var pagesConfig = require("../../configs/pages.config.js");
// var appName = pagesConfig && pagesConfig.app;

// let web_root_dir = process.env.APP_WEB_ROOT || "";
// web_root_dir = path.normalize(web_root_dir);

// // if (appName && devServerSettings && devServerSettings.webroot) {
// //   web_root_dir = path.join(path.normalize(devServerSettings.webroot), appName);
// // }
// if (devServerSettings && devServerSettings.webroot) {
//   web_root_dir = path.normalize(devServerSettings.webroot);
// }
const posixDirName = __dirname.replace(/\\/g, "/");
let web_root_dir = path.join(posixDirName, "../../src");
// web_root_dir = web_root_dir.replace(/\\/g, "/");
logger.info("Path APP_WEB_ROOT", web_root_dir);

logger.profile("Find all pages.config.js file");
const result = require("./pageConfigFinder").find({
  web_root_dir: web_root_dir
});
logger.profile("Find all pages.config.js file");

if (result && result.appRootPath) {
  const appRootPath = result.appRootPath;

  // let watchList = "--watch " + path.join(posixDirName, "../assets/lib/nui");
  // watchList += " --watch " + path.join(posixDirName, "../index.html");

  // shell.exec(`nodemon scripts/filePreparer.js ${watchList} --app_root_path ${appRootPath}`, {
  //   async: true
  // });
  let watchList = "--watch " + path.join(posixDirName, "../../configs/pages.config.js");
  // watchList += " --watch " + path.join(appRootPath, "pages.config.js");
  watchList += " --watch " + path.join(posixDirName, "../assets/lib/nui");
  // TODO Current logs at transformer.js is just print at log file, support CLI print as well.
  const child = shell.exec(`nodemon core/scripts/transformer.js ${watchList} --web_root_dir ${web_root_dir}`, {
    async: true
  });

  shell.exec("webpack-dev-server --config configs/webpack.config.js  --port 3001 --progress --colors");
  // shell.exec("webpack-dev-server --host 11.11.1.54 --port 3000 --progress --colors");
} else {
  logger.warn("No page configs found. Force Quit.");
}
