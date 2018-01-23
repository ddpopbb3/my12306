import eventsRegExp from './EventsRegExp';
import { browserHistory } from 'react-router';
import _ from "lodash";
import APP_CONFIG from "core/../configs/app.config"

var _currentPage = "";
var _pathParams = {};
var _primaryPage = "";
var _secondaryPage = "";
var _fullPath = "";
var PM = window.PM || (window.PM = {});
PM.serverContextPath = (APP_CONFIG && APP_CONFIG.server && APP_CONFIG.server.contextPath) || "";
PM.loadedResources = [];
PM.pages = {};
PM.RecentOpen = {
  name: "",
  items: []
};
PM.setPageInfo = (conf) => {
  _currentPage = conf.currentPath;
  _pathParams = conf.params;
  _primaryPage = conf.primaryPage;
  _secondaryPage = conf.secondaryPage;
  _fullPath = conf.fullPath;
};
PM.getFullPagePath = () => {
  return _fullPath;
}
PM.getCurrentPage = () => {
  return _currentPage;
};
PM.getPathParams = () => {
  return _pathParams;
};
PM.getPrimaryPage = () => {
  return _primaryPage;
};
PM.getSecondaryPage = () => {
  return _secondaryPage;
}
PM.go = (path, params = {}) => {
  if (!path) {
    return;
  }
  path = PM.getPath(path);
  var keys = Object.keys(params);
  if (params && keys.length) {
    keys.forEach((pname) => {
      path = path.replace(":" + pname, params[pname]);
    })
  }
  var pathParams = PM.getPathParams();
  var pathKeys = Object.keys(pathParams);
  if (pathParams && pathKeys.length) {
    pathKeys.forEach((pname) => {
      path = path.replace(":" + pname, pathParams[pname]);
    })
  }
  browserHistory.push(path);
}

PM.getPath = (path) => {
  if (!path) {
    return path;
  }

  if (path.charAt(0) !== "/") {
    path = "/" + path;
  }
  return path;
}

PM.events = {
  count: 1,
  cache: {},
  execute: function (eventId, scope, args) {
    var event = PM.events.cache[eventId];
    var page = event.page;
    var method = event.method;
    var isGetter = event.isGetter;
    // console.time("argtakes");
    var userArgs = event.args && event.args.map(function (arg) {
      if (/this\./.test(arg)) {
        return eval(arg);
      }
      return arg;
    }.bind(scope));
    // console.timeEnd("argtakes");
    var pageFn = PM.pages[page] && PM.pages[page].fn;
    if (!pageFn) {
      console.warn("Warning at PM event execution. Can't find page", page, "event", event);
      return;
    }
    if (!method) {
      console.warn("Warning at PM event execution. Can't find method", method, "event", event);
      return;
    }
    if (isGetter) {
      return pageFn.get(method);
    }
    if (userArgs) {
      return pageFn.exec(method, Array.prototype.concat.apply(userArgs, args));
    }
    return pageFn.exec(method, args);
  }
};

PM.exec = PM.events.execute;

Array.prototype.forEach.call(document.styleSheets, function (sheet) {
  var href = sheet.href;
  var origin = window.location.origin;
  if (!href) {
    return;
  }
  href = href.replace(origin, "");
  PM.loadedResources.push(href);
});

Array.prototype.forEach.call(document.scripts, function (script) {
  var src = script.src;
  var origin = window.location.origin;
  if (!src) {
    return;
  }
  src = src.replace(origin, "");
  PM.loadedResources.push(src);
});

var getResourceAttrName = (nodeName) => {
  var attrName = "";
  switch (nodeName) {
    case "LINK":
      attrName = "href";
      break;
    case "IMG":
    case "SCRIPT":
      attrName = "src";
      break;
    default:
      attrName = "src";
  }
  return attrName;
};

var cachePageHTML = (subPageHTML, pageId, filePath) => {
  console.time("eventsReplacement");
  var nPage = {};
  PM.pages[pageId] = nPage;
  var fnPath = "window.PM.pages['" + pageId + "'].fn";
  var replaceHtmlEvents = (textToReplace) => {
    return textToReplace.replace(eventsRegExp, function (x, g1, g2, g3, g4) {
      var eventId = PM.events.count++;
      var event = {
        id: eventId,
        page: pageId,
        type: g1,
        method: g2
      };
      PM.events.cache[eventId] = event;
      if (/^(renderer|summaryRenderer|data)$/.test(g1)) {
        // return " " + g1 + "=" + fnPath + ".get(\"" + g2 + "\")" + g4;
        event.isGetter = true;
        return ` ${g1}=(PM.exec('${eventId}')) `;
      }
      if (/(.*)\((.*)\)/.test(g2)) {
        g2 = RegExp.$1;
        event.method = g2;
        event.args = [RegExp.$2];
      // return " " + g1 + "=\"" + fnPath + ".exec.call(window, '" + g2 + "', Array.prototype.concat.apply([" + args + "], arguments))\"" + g4;
      }
      // return " " + g1 + "=\"" + fnPath + ".exec.call(window, '" + g2 + "', arguments)\"" + g4;
      return ` ${g1}=(PM.exec('${eventId}',this,arguments)) `;
    });
  }

  subPageHTML = replaceHtmlEvents(subPageHTML);
  console.timeEnd("eventsReplacement");

  var fg = document.createElement("html");
  var $fg = $(fg);
  if (nui.isIE9) {
    var body = document.createElement("body");
    body.innerHTML = subPageHTML;
    fg.appendChild(document.createElement("head"));
    fg.appendChild(body);
  } else {
    fg.innerHTML = subPageHTML;
  }
  var $fgBody = $fg.find("body");
  var $fgHeader = $fg.find("head");

  $fg.find("[src^='\/'], [href^='\/']").each(function (id, ele) {
    var $ele = $(ele);
    var attrName = getResourceAttrName(ele.nodeName);

    var nURL = $ele.attr(attrName) || "";
    if (PM.serverContextPath) {
      nURL = "/" + PM.serverContextPath + nURL;
    }
    $ele.attr(attrName, nURL);
  });
  var linksToLoad = $();
  var $scripts = $(); // $pageScopeScript + $inlineScript + external scripts
  var $externalScripts = $();
  var $pageScopeScript; // all scope=page scripts will merged into this variable.
  var $inlineScript; // all inline scripts will merged into this variable.
  var pageScopeScriptText = "";
  var inlineScriptText = "";

  var addPageScopeScript = () => {
    $pageScopeScript = $('<script></script>');
    $scripts.push($pageScopeScript[0]);
  }

  var addInlineScript = () => {
    $inlineScript = $('<script></script>');
    $scripts.push($inlineScript[0]);
  }

  var getPageScopedText = (scopedScripts = "") => {
    return `
  (function() {
    ${fnPath} = {
      exec: function(methodName, args) {
        eval(methodName).apply(window, args)
      },
      get:function(methodName) {
        var result;
        try {
          result = eval(methodName)
        } catch(err) {
          console.warn("Page ${pageId} can't get method", methodName, err);
        }
        return result;
      }
    };
    ${scopedScripts}
  })()
    `
  }

  // ensure page scoped exec/get existsed before extenal scripts.
  $scripts.push($(`
<script>
  ${getPageScopedText()}
  //# sourceURL=euler-fe:///${filePath}.page_scope.first.js
</script>
`)[0]);

  $fg.find("script, link[href]").not("[type='text/x-jquery-tmpl'], [type='text/x-handlebars-template']").remove().each(function (id, ele) {
    var nodeName = ele.nodeName;
    var $ele = $(ele);
    if (nodeName === "SCRIPT") {
      var srcUrl = $ele.attr("src");
      var isPageScoped = $ele.attr("scope") === 'page';
      var text = "";
      if (isPageScoped) {
        if (srcUrl) {
          text = nui.loadText(srcUrl);
          if (text) {
            text = replaceHtmlEvents(text);
          }
        } else {
          text = $ele.html();
        }
        if (!$pageScopeScript) {
          addPageScopeScript();
        }
        pageScopeScriptText += "\n;\n" + text;
      } else {
        if (srcUrl) {
          if (PM.loadedResources.indexOf(srcUrl) === -1) {
            $externalScripts.push($ele[0]);
            if (!$ele.is("[defer], [async]")) {
              $scripts.push($ele[0]);
            }
          }
        } else {
          if (!$inlineScript) {
            addInlineScript();
          }
          inlineScriptText += $ele.html();
        }
      }
    } else if (nodeName === "LINK") {
      linksToLoad.push($ele[0]);
    }
  });

  if (pageScopeScriptText) {
    $pageScopeScript.html(
      `${getPageScopedText(pageScopeScriptText)}
      //# sourceURL=euler-fe:///${filePath}.page_scope.js
      `);
  }

  if (inlineScriptText) {
    $inlineScript.append(inlineScriptText);
    $inlineScript.append("\n//# sourceURL=euler-fe:///" + filePath + ".js");
  }

  var externalScriptUrls = [];
  var externalScript_Delayed_Urls = [];
  $externalScripts.each(function (id, script) {
    var $script = $(script);
    var src = $script.attr("src");
    if ($script.is("[defer], [async]")) {
      externalScript_Delayed_Urls.push(src);
    } else {
      externalScriptUrls.push(src);
    }
  });

  $fgHeader.append(linksToLoad);

  nPage.$cache = $fg; // inline stylesheet, external stylesheet

  if ($scripts.length) {
    nPage.$scripts = $scripts;
  }

  if (externalScriptUrls.length) {
    nPage.externalScriptUrls = externalScriptUrls;
  }

  if (externalScript_Delayed_Urls.length) {
    nPage.externalScript_Delayed_Urls = externalScript_Delayed_Urls;
  }

//nPage.exec = function(methodName, args) {
//  this.fn.exec(methodName, args);
//}
//nPage.get = function(methodName) {
//  return this.fn.get(methodName);
//}
};

function loadScript(url) {
  var script = document.createElement("script");
  script.onload = function () {
    PM.loadedResources = PM.loadedResources.concat(url);
  };
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var loadSubPage = (conf) => {
  var innerNode = conf.innerNode;
  var subPageHTML = conf.subPageHTML;
  var subPageURL = conf.subPageURL;
  var pageId = conf.id || subPageURL;
  var filePath = conf.filePath;
  pageId = pageId.replace(/\//g, "_");
  if (!pageId) {
    return;
  }
  if (!PM.pages[pageId] || !PM.pages[pageId].$cache) {
    if (!subPageHTML) {
      subPageHTML = nui.loadText(subPageURL);
    }
    cachePageHTML(subPageHTML, pageId, filePath);
  }
  var pageCache = PM.pages[pageId];
  var $fg = pageCache.$cache;
  var $inner = $(innerNode);
  $inner.append($fg.find("head")[0].innerHTML);
  $inner.append($fg.find("body")[0].innerHTML);

  // cache and non-cache
  // one page one combined inline script
  // one page one combined page scoped script
  // script order - first in and first out for inline/pagescoped/externals, 
  // inline/external css and inline scripts and scoped scripts - these are all treated page scoped, so that wont' cache
  // external scripts - cache
  // TODO cache all non-page scoped scripts? all resources are treated as page scoped, and only do cache when page="global"?
  // won't cache scripts - inline and page scoped scripts - load every time for subPageURL
  // cache scripts - external scripts - just load once for subPageURL - and other subpages won't load the same scripts
  // wont' cache css - inline and external scripts - load every time for subPageURL
  if (pageCache.$scripts) {
    $inner.append(pageCache.$scripts);
    // just move inline & page scoped scripts into html cache, in order to re-load every time.
    var allInlineScripts = pageCache.$scripts.not("[src]");
    $fg.find("body").append(allInlineScripts);

    pageCache.$scripts = null;
    // cache external non page scoped scripts
    if (pageCache.externalScriptUrls) {
      PM.loadedResources = PM.loadedResources.concat(PM.pages[pageId].externalScriptUrls);
      pageCache.externalScriptUrls = null;
    }
    if (pageCache.externalScript_Delayed_Urls) {
      pageCache.externalScript_Delayed_Urls.forEach((url) => {
        loadScript(url);
      })
      pageCache.externalScript_Delayed_Urls = null;
    }
  }
};
PM.loadSubPage = loadSubPage;
PM.getPageFn = function (url) {
  var pageId = url.replace(/\//g, "_");
  return PM.pages[pageId] && PM.pages[pageId].fn;
};

PM.allMenuPermissions = null;
// [
//   "/home/projects/:projectid/coderepo",
//   // "/home/projects/:projectid/codesource/files",
//   // "/home/projects/:projectid/codesource/repoView",
//   "/home/projects/:projectid/build",
//   // "/home/projects/:projectid/build/design",
//   "/home/projects/:projectid/build/browse",
//   "/home/projects/:projectid/deploy",
//   // "/home/projects/:projectid/deploy/assemblies",
//   "/home/projects/:projectid/admin",
//   // "/home/projects/:projectid/admin/team",
//   // "/home/projects/:projectid/admin/role",
//   // "/home/projects/:projectid/admin/repoauth"
// ];

PM.myMenuPermission = null;


PM.filterItemsWithPermission = function (items, projectId) {
  // if (items && items.length > 0 && projectId) {
  //   if (!PM.allMenuPermissions) {
  //     nui.ajax({
  //       url: "api/uc/auth/menu",
  //       async: false,
  //       success: function(res) {
  //         PM.allMenuPermissions = res;
  //       }
  //     })
  //   }
  //   if (!PM.myMenuPermission || PM.myMenuPermission.projectId !== projectId) {
  //     // PM.myMenuPermission = ["/home/projects/:projectid/build", "/home/projects/:projectid/deploy"];
  //     nui.ajax({
  //       url: "api/uc/auth/menu/project",
  //       async: false,
  //       success: function(res) {
  //         PM.myMenuPermission = res;
  //         PM.myMenuPermission.projectId = projectId;
  //       }
  //     })
  //   }
  //   var newItems = [];
  //   for (var i = 0; i < items.length; i++) {
  //     let item = _.clone(items[i], true);;
  //     if (_.includes(PM.allMenuPermissions, item.urlFullPath)) { //需要权限控制的菜单(第一级)
  //       if (_.includes(PM.myMenuPermission, item.urlFullPath)) { //有权限
  //         if (item.pages && item.pages.length > 0) { //处理第二层
  //           for (var j = item.pages.length - 1; j > 0; j--) {
  //             if (_.includes(PM.allMenuPermissions, item.pages[j].urlFullPath)) {//需要权限控制的菜单(第二级)
  //               if (!_.includes(PM.myMenuPermission, item.pages[j].urlFullPath)) { //没有权限
  //                 item.pages.splice(j, 1);
  //               }
  //             }
  //           }
  //         }
  //         newItems.push(item);
  //       }
  //     } else {
  //       newItems.push(items[i]);
  //     }
  //   }
  //   return newItems;
  // }
  //暂时不加权限，等服务端完成后，放开上面的代码即可
  return items;
}

PM.allButtonPermissions = null; //["devops.build.createDefinition", "devops.build.execDefinition", "devops.build.deleteDefinition", "devops.admin"];
PM.myProjectButtonPermissions = null;
PM.myPlatformButtonPermissions = null;
PM.isButtonHasPermission = function (permissionCode, projectId) {
  // if (permissionCode) {

  //   if (!PM.allButtonPermissions) {
  //     nui.ajax({
  //       url: "api/uc/auth/button",
  //       async: false,
  //       success: function(res) {
  //         PM.allButtonPermissions = res;
  //       }
  //     })
  //   }
  //   if (!projectId) { //不是项目中的button
  //     if (!PM.myPlatformButtonPermissions) {
  //       nui.ajax({
  //         url: "api/uc/auth/button/platform",
  //         async: false,
  //         success: function(res) {
  //           PM.myPlatformButtonPermissions = res;
  //         }
  //       })
  //       if (_.includes(PM.allButtonPermissions, permissionCode)) { //需要权限控制的按钮
  //         if (_.includes(PM.myPlatformButtonPermissions, permissionCode)) { // 有权限
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       } else {
  //         return true;
  //       }
  //       // PM.myButtonPermissions = ["devops.build.execDefinition"];
  //     }
  //   } else {
  //     if (!PM.myProjectButtonPermissions || PM.myProjectButtonPermissions.projectId !== projectId) {
  //       nui.ajax({
  //         url: "api/uc/auth/button/project",
  //         async: false,
  //         success: function(res) {
  //           PM.myProjectButtonPermissions = res;
  //           PM.myProjectButtonPermissions.projectId = projectId;
  //         }
  //       })
  //       if (_.includes(PM.allButtonPermissions, permissionCode)) { //需要权限控制的按钮
  //         if (_.includes(PM.myProjectButtonPermissions, permissionCode)) { // 有权限
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       } else {
  //         return true;
  //       }
  //       // PM.myButtonPermissions = ["devops.build.execDefinition"];
  //     }
  //   }
  // if (!PM.myButtonPermissions) {
  //   nui.ajax({
  //     url: "api/uc/auth/button",
  //     async: true,
  //     success: function(res) {
  //       PM.allButtonPermissions = res;
  //     }
  //   })
  // PM.myButtonPermissions = ["devops.build.execDefinition"];
  // if (_.includes(PM.allButtonPermissions, permissionCode)) { //需要权限控制的按钮
  //   if (_.includes(PM.myButtonPermissions, permissionCode)) { // 有权限
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } else {
  //   return true;
  // }
  // }
  //暂时不加权限，等服务端完成后，放开上面的代码即可
  return true;
}

PM.validateButtonPermission = function (projectId) {
  // var doms = $("[permissionCode]");
  // // debugger;
  // _.forEach(doms, function(dom) {
  //   if (!PM.isButtonHasPermission($(dom).attr("permissionCode"), projectId)) {
  //     $(dom).css("display", "none");
  //   }
  // })
}

export default PM
