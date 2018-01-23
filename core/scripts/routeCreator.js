'use strict';
const fse = require('fs-extra');
const fs = require('fs');
const _ = require('lodash');
const path = require('path').posix;
const Handlebars = require("handlebars");
const logger = require('./logger');
const posixDirName = __dirname.replace(/\\/g, "/");
function transform(settings) {

  logger.profile("routeCreator");
  const appRootPath = settings.appRootPath;
  const pageConfigs = settings.pageConfigs;
  let projectFolderName = "";
  let pageConfObj = "";
  const genNavbar = (navbar, isSecondary) => {
    navbar = navbar === undefined ? "tree" : navbar;
    let navbarType = typeof navbar;
    let result = {
      layout: "tree",
      hidden: false
    };
    switch (navbarType) {
      case "boolean":
        if (navbar) {
          result = {
            layout: "tree",
            hidden: false
          }
        } else {
          result = {
            layout: "tabs",
            hidden: true
          }
        }
        if (isSecondary) {
          result.layout = "tabs";
        }
        break;
      case "string":
        result = {
          layout: isSecondary ? "tabs" : navbar,
          hidden: false
        }
        break;
      case "object":
        result = {
          layout: isSecondary ? "tabs" : (navbar.layout || "tabs"),
          hidden: (navbar.hidden === true) ? true : false,
          renderer: navbar.renderer
        }
        break;
      default:
        throw `unfound navbartype: ${navbarType}, navbar: ${navbar}`
    }
    return result;
  }
  const convert = function (parentURLPath, pageConfObj) {
    pageConfObj.pages = pageConfObj.pages.filter(function (page) {
      return !!page;
    });
    _.forEach(pageConfObj.pages, function (obj) {
      const page = obj.page;
      // The url path is for react routing, that's a nest path rather than a full path.
      let urlPath = obj.urlPath || "";
      if (urlPath[0] === "/") {
        urlPath = obj.urlPath = urlPath.substring(1, urlPath.length);
      }
      if (!page) {
        obj.core = true;
        if (parentURLPath === "") {
          obj.page = "../components/primary";
        } else {
          obj.secondary = true;
          obj.page = "../components/secondary";
        }
        obj.navbar = genNavbar(obj.navbar, obj.secondary);
      } else {
        if (!/.html$/.test(page)) {
          obj.react = true;
        }
      }
      // The full browser url path for relative page.
      obj.urlFullPath = path.join("/", parentURLPath, urlPath);
      // if (obj.name) {
      // obj.link = path.join(parentURLPath, urlPath);
      // }
      obj.id = projectFolderName + "_" + obj.id.replace(/-/g, "_");
      if (!obj.core && !obj.frame) {
        obj.absPagePath = path.join(appRootPath, obj.page)
      }
      if (obj.pages && obj.pages.length) {
        convert(path.join(parentURLPath, urlPath), obj);
        obj.defPageObj = obj.pages[obj.defaultPage || 0];
      }
    });
  };
  let pages = [];
  // TODO fix ugly code;
  logger.info("pageConfigs", pageConfigs);
  if (pageConfigs[1]) {
    pageConfigs[0] = pageConfigs[1];
    pageConfigs.length = 1;
  }
  logger.info("pageConfigs after", pageConfigs);
  pageConfigs.forEach((pageConf) => {
    pageConfObj = require(pageConf.path);
    projectFolderName = pageConf.fileName;
    convert("", pageConfObj);
    pages = pages.concat(pageConfObj.pages)
  });
  try {
    logger.info("path", path.join(posixDirName, "../src/routes/index.tpl"));
    const content = fs.readFileSync(path.join(posixDirName, "../src/routes/index.tpl"), {
      encoding: 'utf8'
    });
    const template = Handlebars.compile(content, {
      noEscape: true
    });
    Handlebars.registerHelper('subpages', function (data) {
      return template({
        pages: data
      });
    });

    Handlebars.registerHelper('renderDefault', function (data) {
      const defPageObj = data.defPageObj;
      const url = defPageObj.page;
      let result = "";
      if (_.endsWith(url, ".html") || defPageObj.core) {
        result = defPageObj.id + "_comp";
      } else {
        result = "require('" + defPageObj.page + "')";
      }
      return result;
    });
    Handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context);
    });
    const result = template({
      root: true,
      pages: pages,
      defPageObj: pages && pages[pageConfObj.defaultPage || 0],
      date: new Date().toString()
    });
    fse.outputFileSync(path.join(posixDirName, "../src/routes/index.js"), result);
  } catch (err) {
    logger.error("err at routeCreator.js", err);
  }
  logger.profile("routeCreator");
}

module.exports = {
  transform: transform
};
