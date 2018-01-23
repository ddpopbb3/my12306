(function() {
  var PM = window.PM || (window.PM = {});

  var _ParseColumns_old = mini._ParseColumns;
  var ArraySlicer = [].slice;
  mini._ParseColumns = function(ele) {
    var columns = _ParseColumns_old(ele);
    try {
      $(columns).each(function(id, column) {
        if (column.renderer && typeof column.renderer === "string") {
          column.renderer = eval(column.renderer);
        }
      });
    } catch ( err ) {
      console.warn("Column renderer parse failure", err);
    }
    return columns;
  };

  mini.getParams = function(b) {
    if (!b) {
      b = location.href
    }
    b = b.split("?")[1];
    var g = {};
    if (b) {
      var e = b.split("&");
      for (var d = 0, a = e.length; d < a; d++) {
        var f = e[d].split("=");
        try {
          g[f[0]] = decodeURIComponent(unescape(f[1] || ""))
        } catch ( c ) {}
      }
    }
    return g
  };

  mini.open = function(options) {
    if (!options) {
      return;
    }

    var url = options.url;
    if (!url) {
      url = "";
    }
    var urls = url.split("#");
    var url = urls[0];

    if (url && url.indexOf("_winid") == -1) {
      var t = "_winid=" + mini._WindowID;
      if (url.indexOf("?") == -1) {
        url += "?" + t;
      } else {
        url += "&" + t;
      }
      if (urls[1]) {
        url = url + "#" + urls[1];
      }
    }

    options.url = url;

    options.Owner = window;
    var ps = [];

    function getParents(me) {
      try {
        if (me.mini) {
          ps.push(me);
        }
        if (me.parent && me.parent != me) {
          getParents(me.parent);
        }
      } catch ( ex ) {}
    }
    getParents(window);

    var win = ps[ps.length - 1];
    options.allowResize = !!options.allowResize;
    return win.mini._doOpen(options);
  }

  mini.Window.prototype.load = function(url, onload, ondestroy) {
    this.url = url;
    this.__onLoad = onload;
    this.__onDestroy = ondestroy;

    var me = this;
    var iframeEl = {
      contentWindow: {
        CloseWindow: function(action) {
          var page = PM.getPageFn(url);
          var bcFn = page.get("beforeClose");
          if (bcFn) {
            var canClose = bcFn(action, this.CloseOwnerWindow);
            if (canClose === false) {
              return false;
            }
          } else {
            var cwFn = page.get("CloseWindow");
            if (cwFn) {
              return cwFn(action);
            }
          }
        },
        CloseOwnerWindow: function(g) {
          me.__HideAction = g;
          var f = true;
          if (me.__onDestroy) {
            f = me.__onDestroy(g);
          }
          if (f === false) {
            return false;
          }
          var h = {
            iframe: me._iframeEl,
            action: g
          };
          me.fire("unload", h);
          setTimeout(function() {
            me.destroy();
          }, 10);
        },
        SetData: function() {
          window.setData();
        }
      }
    };

    me._iframeEl = iframeEl;

    me.getIFrameEl = function() {
      return iframeEl;
    };

    me.init = function(data) {
      var pageFnInit = PM.getPageFn(url).get("init");
      if (pageFnInit) {
        pageFnInit(data, me);
      }
    };

    me.close = function(action) {
      var canClose = iframeEl.contentWindow.CloseWindow(action);
      if (canClose !== false) {
        iframeEl.contentWindow.CloseOwnerWindow(action);
      }
    };

    var path = window.location.hash.substring(1);
    if (path.indexOf("?") !== -1) {
      path = path.substring(0, path.indexOf("?"));
    }
    var ownerFn = PM.getPageFn(PM.getCurrentPage());
    var owner = {
      // @deprecated
      get: function(fn) {
        return ownerFn.get(fn);
      },
      // @deprecated
      exec: function(fn) {
        var args = ArraySlicer.call(arguments, 1);
        ownerFn.exec(fn, args);
      }
    };
    owner.getFn = owner.get;
    owner.execFn = owner.exec;
    me.getOwner = function() {
      return owner;
    };
  };

  // mini.Window.prototype
  // only do modal once
  mini.Window.prototype._doModal = function() {
    if (!this.isDisplay() || this.loaded) {
      return;
    }
    this.loaded = true;
    var zIndex = mini.getStyle(this.el, 'zIndex');
    if (zIndex < 1002) {
      zIndex = 1002;
      mini.zIndex = 1003;
    }
    $(this.el).css("z-index", parseInt(zIndex) + 1);
    this._modalEl = mini.append(document.body, '<div class="mini-modal" style="z-index:' + zIndex + '"></div>');
    if (!this.url) {
      return;
    }
    var url = this.url;
    this.mask("Loading...");
    PM.loadSubPage({
      innerNode: this.getBodyEl(),
      subPageHTML: "",
      subPageURL: url,
      filePath: url
    });
    this.init && this.init(this.data);
    this.__onLoad && this.__onLoad();
    setTimeout(this.unmask.bind(this), 0);
  };

  var _loadTab_old = mini.Tabs.prototype._doLoadTab;

  mini.Tabs.prototype._afterApply = function(el) {
    this.needIframe = $(el).attr("iframe") !== undefined;
    if (this.needIframe) {
      return;
    }
    var pageFn = PM.getPageFn(PM.getCurrentPage());
    var me = this;
    me.getFn = function(fn) {
      return pageFn.get(fn);
    };
    me.execFn = function(fn) {
      var args = ArraySlicer.call(arguments, 1);
      pageFn.exec(fn, args);
    };
  }
  mini.Tabs.prototype._doLoadTab = function(tab) {
    if (this.needIframe) {
      _loadTab_old.apply(this, arguments);
      return;
    }

    // initiation before load page
    if (!tab || tab != this.getActiveTab()) {
      return
    }
    var tabBodyEl = this.getTabBodyEl(tab);
    if (!tabBodyEl) {
      return
    }
    this._cancelLoadTabs();
    this._doRemoveIFrame(tab, true);
    this._loading = true;
    tab._loading = true;
    this.unmask();
    if (this.maskOnLoad) {
      this.loading()
    }
    this.isLoading = true;

    // just load
    var url = tab.url;
    var pageId = this.uid + "-" + url;
    PM.loadSubPage({
      innerNode: tabBodyEl,
      subPageHTML: "",
      subPageURL: url,
      id: pageId,
      filePath: url
    });

    // events for close
    var me = this;
    var pageFn = PM.getPageFn(pageId);
    var args = {
      sender: me,
      tab: tab,
      index: me.tabs.indexOf(tab),
      name: tab.name
    };
    tab._iframeEl = {
      contentWindow: {
        Owner: window,
        CloseWindow: function(action) {
          var page = PM.getPageFn(pageId);
          var bcFn = page.get("beforeClose");
          if (bcFn) {
            var canClose = bcFn(action, this.CloseOwnerWindow);
            if (canClose === false) {
              return false;
            }
          } else {
            var cwFn = page.get("CloseWindow");
            if (cwFn) {
              return cwFn(action);
            }
          }
        },
        CloseOwnerWindow: function(action) {
          setTimeout(function() {
            me.removeTab(tab)
          }, 10)
        }
      }
    };
    args.iframe = tab._iframeEl;

    var me = this;
    tab.getFn = function(fn) {
      return pageFn.get(fn);
    };
    tab.execFn = function(fn) {
      var args = ArraySlicer.call(arguments, 1);
      pageFn.exec(fn, args);
    };

    // clean up after load
    tab._loading = false;
    tab.queryParams = mini.getParams(url);
    tab.loadedUrl = url;
    setTimeout(function() {
      me.unmask();
      me.doLayout();
      me.isLoading = false;
    }, 0);

    // events after load
    var pageFnInit = PM.getPageFn(pageId).get("init");
    if (pageFnInit) {
      pageFnInit(me);
    }

    if (tab.onload) {
      var onloadFn = eval("(function(){" + tab.onload + "})");
      onloadFn.call(window, args);
    }
    if (me.getActiveTab() == tab) {
      me.fire("tabload", args)
    }
  }
  mini.DataTable.prototype._evalType = function(url) {
    var type = this.ajaxType;
    if (!type) {
      //        type = 'post';
      //        if (url) {
      //            if (url.indexOf(".txt") != -1 || url.indexOf(".json") != -1) {
      //                type = "get";
      //            }
      //        } else {
      //            type = "get";
      //        }
      type = "get";
    }
    return type;
  };

  //修改mac系统下chrome中点击datagrid中的按钮时，没有先触发选中行的操作
  mini._Grid_Select.prototype.__OnCellMouseDown = function(e) {
    this.__doSelect(e);
  }

  var URLGenerator = {
    generatePath: function(url, pathParams) {
      var path = url.split("?")[0];
      if (!pathParams || !Object.keys(pathParams).length) {
        return path;
      }
      var pathArray = path.split("/");
      pathArray.forEach(function(pname, id) {
        pathArray[id] = (pathParams[pname.substring(1)] || pname);
      });
      return pathArray.join("/");
    },
    generateQuery: function(url, queryParams) {
      var queryObj = mini.getParams(url);
      delete queryObj[""];
      if (!queryParams || !Object.keys(queryParams).length) {
        return $.param(queryObj);
      }
      var queryKeys = queryParams && Object.keys(queryParams);
      delete queryKeys[""];
      queryKeys.forEach(function(qname) {
        queryObj[qname] = queryParams[qname];
      });
      return $.param(queryObj);
    },
    generate: function(url, pathParams, queryParams) {
      if (!url || (!pathParams && !queryParams)) {
        return url;
      }
      var path = this.generatePath(url, pathParams);
      var query = this.generateQuery(url, queryParams);
      return query ? (path + "?" + query) : path;
    }
  };

  // TODO review
  mini.ajax = function(options) { //扩展nui的ajax
    var url = URLGenerator.generate(options.url, options.pathParams, options.queryParams);
    options.url = url;
    //目前只支持逻辑流的默认设定
    if (url && url.length > 4 && url.lastIndexOf('.ext') == url.length - 4) {
      if (!options.dataType) {
        options.dataType = "json";
      }
      if (!options.contentType) {
        options.contentType = "application/json; charset=UTF-8";
      }

      if (options.data && mini.isNull(options.data.pageIndex) == false) {
        var page = options.data.page = {};

        page.begin = options.data.pageIndex * options.data.pageSize;
        page.length = options.data.pageSize;

      }

      if (options.dataType == "json" && typeof (options.data) == 'object') {
        options.data = mini.encode(options.data);
        if (options.data == '{}') {
          delete options.data;
        }
        options.type = 'POST';
      }
    }
    // TODO, replace hard code with content type 
    else if (url && (url.toLowerCase().indexOf("rest/services/") != -1 || url.toLowerCase().indexOf("api/") != -1)) { // 支持datagrid 请求 rest 
      if (!options.contentType) {
        options.contentType = "application/json; charset=UTF-8";
      }
    }

    //支持datagrid数据格式发送rest请求
    if (options.contentType && options.contentType.toLowerCase().indexOf("application/json") != -1 && options.data) {
      if (!options.type || options.type.toLowerCase() !== "get") {
        if (typeof options.data != "string") {
          options.data = nui.encode(options.data);
        }
      }
    }

    return window.jQuery.ajax(options);
  };

  mini.handleAjaxError = function(jqXHR, operation) {
    var content = "操作失败，请联系管理员";
    if (typeof jqXHR === "string") {
      content = jqXHR + "失败，请联系系统管理员"
    } else if (typeof jqXHR === "object") {
      var resultErrorCode = "";
      var resultAdditional = {};
      if (jqXHR.responseJSON && jqXHR.responseJSON.errorCode) {
        resultErrorCode = jqXHR.responseJSON.errorCode;
        resultAdditional = jqXHR.responseJSON.additional;
      }
      if (PM.errorCode && PM.errorCode[resultErrorCode]) {
        if (PM.errorCode[resultErrorCode].errorMsg) {
          if (resultAdditional === null) {
            content = PM.errorCode[resultErrorCode].errorMsg;
          } else if (typeof resultAdditional === "object" && resultAdditional.length > 0) {
            for (var i = 0, l = resultAdditional.length; i < l; i++) {
              if (i == 0) {
                content = PM.errorCode[resultErrorCode].errorMsg.replace("{" + i + "}", resultAdditional[i]);
              } else {
                content = content.replace("{" + i + "}", resultAdditional[i]);
              }
            }
          } else if (typeof resultAdditional === "string") {
            content = PM.errorCode[resultErrorCode].errorMsg.replace("{0}", resultAdditional);
          }
        }
      } else if (operation) {
        content = operation + "失败，请联系系统管理员"
      }
    }

    mini.showTips({
      content: content,
      state: "danger",
      x: "center",
      y: "center"
    });
  }

  mini.getPathParams = function(pathname) {
    var pathParams = window.PM.getPathParams();
    if (pathname) {
      return pathParams && pathParams[pathname]
    }
    return pathParams;
  }
  mini.openRecent = function(recent) {
    var urlFullPath = recent.url;
    if (urlFullPath.charAt(0) !== "/") {
      urlFullPath = "/" + urlFullPath;
    }
    var recentItems = window.PM.RecentOpen.items;
    var hasItem = recentItems.some(function(item) {
      return item.urlFullPath === recent
    })
    if (!hasItem) {
      window.PM.RecentOpen.items.push({
        name: recent.name,
        urlFullPath: urlFullPath
      });
    }
    mini.go(urlFullPath);
  }
  mini.closeRecent = function() {
    var recentItems = window.PM.RecentOpen.items;
    var recentPagePath = PM.getFullPagePath();
    window.PM.RecentOpen.items = recentItems.filter(function(item) {
      return item.urlFullPath !== recentPagePath
    })
  }
  mini.setRecentName = function(recentName) {
    window.PM.RecentOpen.name = recentName;
  }
  mini.getRecentName = function() {
    return window.PM.RecentOpen.name;
  }
  mini.go = function(path, params) {
    window.PM.go(path, params);
  }
  mini.getPath = function(path) {
    return window.PM.getPath(path);
  }
  mini.getQueryParams = function(qname) {
    var queries = mini.getParams();
    if (!qname) {
      return queries;
    }
    return queries[qname];
  };

  // See dynamic-form.md
  /**
   * Init dynamic form control (combobox, checkboxlist, radiobuttonlist)
   */
  nui.initDynamicForm = function(fields) {
    if (null == fields || "object" != typeof (fields) || 0 == fields.length) {
      return;
    }
    var isJSONString = function(value) {
      if (null == value || 0 == value.trim().length) {
        return false;
      }
      try {
        eval("(" + value + ")");
        var v = value.trim();
        return ("[" == v.charAt(0) && "]" == v.charAt(v.length - 1)) || ("{" == v.charAt(0) && "}" == v.charAt(v.length - 1));
      } catch ( e ) {
        return false;
      }
    }

    var isJSONValueProvider = function(value) {
      if (isJSONString(value)) {
        var json = JSON.parse(value);
        return null != json.data && (("object" == typeof (json.data) || "string" == typeof (json.data)) && 0 < json.data.length);
      }
      return false;
    }

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if ("combobox" == field.controlType || "checkboxlist" == field.controlType || "radiobuttonlist" == field.controlType) {
        if (field.valueProvider) {
          var data = null;
          if (isJSONValueProvider(field.valueProvider)) {
            // See dynamic-form.md
            data = JSON.parse(field.valueProvider).data;
          } else {
            // zh_CN,zh_TW,en_US,en_UK
            var array = field.valueProvider.split(",");
            data = new Array();
            for (var j = 0; j < array.length; j++) {
              var value = null == array[j] ? null : array[j].trim();
              if (value.length > 0) {
                data.push({
                  "text": value,
                  "value": value
                });
              }
            }
          }
          // console.log(field.fieldId, data);
          var control = nui.get(field.fieldId);
          if (null != control && null != data) {
            control.setData(data);
          }
        }
      }
    }
  }

  /**
   * fields  all fields
   * pathParams  while values from valueProvider sometimes need to concat the pathParam
   * formId  generated form id
   * 
   *  {
      "fieldId": "1000",
      "fieldName": "repoId",
      "fieldLabel": "代码库",
      "sort": 1,
      "category": "1:基本信息",
      "isRequired": true,
      "displayFormat": null,
      "tip": null,
      "defaultValue": null,
      "controlType": "combobox",
      "valueProvider": "{\"url\":\"rest\/services\/pcm\/vcs\/repos\/project\/:projectId\",\"textField\":\"repoUrl\",\"valueField\":\"repoId\",\"value\":\"\", \"multiSelect\":false}"
    },
   */
  nui.generateDynamicForm = function(fields, pathParams, formId, fieldsetClassName) {
    if (!fields || "object" != typeof (fields) || fields.length == 0) {
      return "";
    }
    var hasFormDiv = null != formId && "string" == typeof (formId) && 0 < formId.trim().length;

    var isJSONString = function(value) {
      if (null == value || 0 == value.trim().length) {
        return false;
      }
      try {
        eval("(" + value + ")");
        var v = value.trim();
        return ("[" == v.charAt(0) && "]" == v.charAt(v.length - 1)) || ("{" == v.charAt(0) && "}" == v.charAt(v.length - 1));
      } catch ( e ) {
        return false;
      }
    }

    var isUrlValueProvider = function(value) {
      if (isJSONString(value)) {
        var json = JSON.parse(value);
        return null != json.url && "string" == typeof (json.url) && 0 < json.url.trim().length;
      }
      return false;
    }

    var fieldsByCategoryObj = {};
    var form = hasFormDiv ? "<div id='" + formId + "'>" : "";
    for (var i = 0; i < fields.length; i++) {
      if (fieldsByCategoryObj[fields[i].category]) {
        fieldsByCategoryObj[fields[i].category].push(fields[i]);
      } else {
        fieldsByCategoryObj[fields[i].category] = [fields[i]];
      }
    }

    var generateUrl = function(url) {
      if (url && url.indexOf(":") !== -1) {
        var params = url.match(/\:[a-zA-Z]+[\/]*/g);
        if (!params) {
          return url;
        }
        for (var i = 0; i < params.length; i++) {
          var param = params[i].substring(1);
          if (param.indexOf("/") !== -1) {
            param = param.substring(0, param.length - 1);
          }
          url = url.substring(0, url.indexOf(":" + param)) + pathParams[param] + url.substring(url.indexOf(":" + param) + param.length + 1);
        }
      }
      return url;
    }

    var getValidateAttributes = function(attr) {
      var attrs = "";
      if (attr) {
        if (attr.isRequired === "1") {
          attrs += " required requiredErrorText='不能为空'";
        }
      }
      if (attrs.length > 0) {
        attrs += "";
      }
      return attrs;
    };

    var formAndEditors = [];

    for (var fieldsByCategory in fieldsByCategoryObj) {
      var fieldSet = "<fieldset class='dynamic-form-fieldset " + (fieldsetClassName ? fieldsetClassName : "") + "'><legend>" + fieldsByCategory.split(":")[1] + "</legend><table>";
      for (var i = 0; i < fieldsByCategoryObj[fieldsByCategory].length; i++) {
        var attr = fieldsByCategoryObj[fieldsByCategory][i];
        var pObj = null;
        if (null != attr.valueProvider && 0 < attr.valueProvider.trim().length && isJSONString(attr.valueProvider)) {
          pObj = JSON.parse(attr.valueProvider);
        }
        fieldSet += "<tr>" + "<td>" + "<label class='dynamic-form-fieldset-label'>" + attr.fieldLabel + "：</label>" + "</td>" + "<td>";
        switch (attr.controlType.toLowerCase()) {
          case "textbox":
            fieldSet += "<input class='nui-textbox nui-form-large' style='' id='" + attr.fieldId + "'  name='" + attr.fieldName + "' " + getValidateAttributes(attr) + " value='" +
              (attr.defaultValue || "") + "' /> ";
            break;
          case "textarea":
            fieldSet += "<input class='nui-textarea nui-form-large' style='height:200px' id='" + attr.fieldId + "'  name='" + attr.fieldName + "' " + getValidateAttributes(attr) + " value='" +
              (attr.defaultValue || "") + "'/>";
            break;
          case "password":
            fieldSet += "<input class='nui-password nui-form-large' style='' id='" + attr.fieldId + "'  name='" + attr.fieldName + "' " + getValidateAttributes(attr) + " value='" +
              (attr.defaultValue || "") + "' /> ";
            break;
          case "checkbox":
            fieldSet += "<input class='nui-checkbox' id='" + attr.fieldId + "' name='" + attr.fieldName + "' checked='" + (attr.defaultValue || false) + "'/>";
            break;
          case "checkboxgroup":
            //using from valueProvider {"url":"cd/build/data/checkboxlist.json","textField":"text","valueField":"id","value":"cn"}
            if (attr.valueProvider) {
              //var pObj = JSON.parse(attr.valueProvider);
              fieldSet += "<div class='nui-checkboxlist nui-form-large' style='' id='" + attr.fieldId + "' name='" + attr.fieldName + (null == pObj ? "" : "' url='" + generateUrl(pObj.url)) + "' textField='" + (null == pObj ? "text" : (pObj.textField || "text")) + "' valueField='" + (null == pObj ? "value" : (pObj.valueField || "value")) + "' value='" + (attr.defaultValue || (null == pObj ? "" : pObj.value) || "") + "'/>";
            }
            break;
          case "radiogroup":
            //value from valueProvider {"url":"cd/build/data/checkboxlist.json","textField":"text","valueField":"id","value":"cn"}
            if (attr.valueProvider) {
              //var pObj = JSON.parse(attr.valueProvider);
              fieldSet += "<div class='nui-radiobuttonlist nui-form-large' style='' id='" + attr.fieldId + "' name='" + attr.fieldName + (null == pObj ? "" : "' url='" + generateUrl(pObj.url)) + "' textField='" + (null == pObj ? "text" : (pObj.textField || "text")) + "' valueField='" + (null == pObj ? "value" : (pObj.valueField || "value")) + "' value='" + (attr.defaultValue || (null == pObj ? "" : pObj.value) || "") + "'/>";
            }
            break;
          case "datetimepicker":
            if (attr.valueProvider) {
              //var pObj = JSON.parse(attr.valueProvider);
              fieldSet += "<input class='nui-datepicker nui-form-large' style='' id='" + attr.fieldId + "' name='" + attr.fieldName + "' format='" + attr.displayFormat + "' value='" +
                (attr.defaultValue || "") + "'/>";
            }
            ;
            break;
          case "combobox":
            //value from valueProvider  {"url":"cd/build/data/checkboxlist.json","textField":"text","valueField":"id","value":"cn", "multiSelect":true}
            if (attr.valueProvider) {
              //var pObj = JSON.parse(attr.valueProvider);
              fieldSet += "<input class='nui-combobox nui-form-large' style='' id='" + attr.fieldId + "' name='" + attr.fieldName + "' multiSelect='" + (null == pObj ? false : (pObj.multiSelect ? pObj.multiSelect : false)) + (null == pObj ? "" : "' url='" + generateUrl(pObj.url)) + "' textField='" + (null == pObj ? "text" : (pObj.textField || "text")) + "' valueField='" + (null == pObj ? "value" : (pObj.valueField || "value")) + "' value='" + (attr.defaultValue || (null == pObj ? "" : pObj.value) || "") + "'/>";
            }
            break;
          case "dict":
            if (attr.valueProvider) {
              var pObj = JSON.parse(attr.valueProvider);
              fieldSet += "<input class='nui-" + pObj.type + " nui-form-large' style='' id='" + attr.fieldId + "' name='" + attr.fieldName +
                "' dictTypeId='" + pObj.dictTypeId + "' value='" + (attr.defaultValue || "") + "'/>";
            }
            break;
          case "editor":
            var pObj = JSON.parse(attr.valueProvider);
            fieldSet += "<div class='monaco-editor-container'><div style='height:100%' id='js-monaco-" + attr.fieldId + "' name='" + attr.fieldName + "' /></div>";
            formAndEditors.push({
              id: 'js-monaco-' + attr.fieldId,
              value: attr.defaultValue,
              lType: pObj.type || "plaintext"
            })
            break;
        }
        fieldSet += "</td></tr>";
      }
      fieldSet += "</table></fieldset>";
      form += fieldSet;
    }

    form += (hasFormDiv ? "</div>" : "");
    formAndEditors.unshift(form);
    return formAndEditors;
  }

  var MONACO_EDITOR;
  mini.loadCodeEditor = function(done) {
    if (MONACO_EDITOR) {
      done && done(MONACO_EDITOR);
      return;
    }
    mini.loadJS._async("assets/lib/monaco-editor/min/vs/loader.js", function() {
      require.config({
        paths: {
          'vs': 'assets/lib/monaco-editor/min/vs'
        }
      });
      require(['vs/editor/editor.main'], function() {
        MONACO_EDITOR = monaco.editor;
        MONACO_EDITOR.languages = monaco.languages;
        done && done(MONACO_EDITOR);
      });
    })
  }
})();
