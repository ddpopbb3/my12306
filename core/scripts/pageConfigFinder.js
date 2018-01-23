'use strict';
const path = require("path").posix;
const fs = require("fs");
// const count = 0;
let appRootPath = "";
const pageConfigs = [];

const find = (settings) => {
  const web_root_dir = settings.web_root_dir;
  if (web_root_dir) {
    // const files = fs.readdirSync(eos_home_path);
    // files = files.filter((file) => {
    //   return /^apache-tomcat/.test(file);
    // })
    // if (!files.length) {
    //   return;
    // }

    // const tomcat_webapps = path.join(eos_home_path, files[0], "webapps");
    //    const tomcat_webapps = web_root_dir;
    //    let files = fs.readdirSync(tomcat_webapps);
    //    files = files.filter((file) => {
    //      return !/^(\..*|governor|workspace)$/.test(file);
    //    });
    appRootPath = web_root_dir;
    // files = fs.readdirSync(appRootPath);
    // files = files.filter((file) => {
    //   if (/^(\..*|META-INF|WEB-INF)$/.test(file)) {
    //     return false;
    //   }
    //   ;
    //   const configPath = path.join(appRootPath, file, "pages.config.js");
    //   if (fs.existsSync(configPath)) {
    //     return true;
    //   }
    //   return false;
    // })
    // pageConfigs = files.map((file) => {
    //   return {
    //     fileName: file,
    //     path: path.join(appRootPath, file, "pages.config.js")
    //   }
    // })
    // let configPath = path.join(__dirname.replace(/\\/g, "/"), "../configs/pages.config.js");

    // if (fs.existsSync(configPath)) {
    //   pageConfigs.push({
    //     fileName: "default",
    //     path: configPath
    //   })
    // }
    let configPath = path.join(appRootPath, "../configs/pages.config.js");
    if (fs.existsSync(configPath)) {
      pageConfigs.push({
        fileName: "user",
        path: configPath
      })
    }

  }
  return {
    appRootPath: appRootPath,
    pageConfigs: pageConfigs
  }

};

module.exports = {
  find: find,
  get: () => {
    return {
      appRootPath: appRootPath,
      pageConfigs: pageConfigs
    }
  }
};