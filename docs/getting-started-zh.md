# 手册目录
* [前提](#前提)
* [安装](#安装)
* [使用](#使用)
* [示例](#示例)
* [常见问题](#常见问题)


# 前提
* [Node 4.3.2+](https://nodejs.org/en/download/) 
* Text editor or IDE pre-configured with React/JSX/Flow/ESlint ([learn more](./how-to-configure-text-editors.md))

# 安装

### 下载项目
* 克隆portal ui  
```
git clone git@git.euler.one:xijx/portal-ui.git
```
* cd 到portal-ui目录下  
执行  
```
npm install
```


# 使用

#### 配置 configs/app.config.js
```javascript
var config = {
  server: {
    contextPath: "", // server context path, e.g: localhost:8000/foo, foo is the contextPath
    proxy: {
      "/api": { //matches paths starting with /api
        target: "http://localhost:8000", // backend proxy target: protocal + host + port
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }

}
module.exports = config;
```

### 配置configs/pages.config.js  
configs/pages.config.js 是前端页面的统一配置文件，产品上线前使用configs/pages.config.prod.js统一配置。开发期间开发人员本地修改pages.config.js，方便本地开发调试。
示例: 

```javascript

var pages = [{
  id: "home",
  urlPath: "home",
  navbar: "tree",
  pages: [{
    id: "dashboard", // 二级页面标示符
    urlPath: "dashboard", // 浏览器路由地址，
    // localhost:3001/home/dashboard
    name: "Dashboard", //nav item name
    icon: "/core/assets/images/nav/admin.svg", // nav item icon
    page: "components/home/dashboard" // relative component file path
  }, {
    id: "form", // 二级页面标示符
    urlPath: "form", // 浏览器路由地址，
    // localhost:8080/home/form
    name: "Form",
    icon: "/core/assets/images/nav/admin.svg",
    pages: [{
      id: "formBasic", // 三级页面标示符
      urlPath: "basic", // 浏览器路由地址，
      // localhost:8080/home/form/basic
      page: "components/home/form/basic",
      name: "Basic"
    }, {
      id: "formTooltip",
      urlPath: "tooltip",
      page: "components/home/form/tooltip",
      name: "Tooltip"
    }, {
      id: "formButton",
      urlPath: "button",
      page: "components/home/form/button",
      name: "Button"
    }, {
      id: "formCombobox",
      urlPath: "combobox",
      page: "components/home/form/combobox",
      name: "ComboBox"
    }]
  }, {
    id: "grid",
    urlPath: "grid",
    icon: "/core/assets/images/nav/deliver.svg",
    page: "components/home/grid",
    name: "Grid"
  }, {
    id: "tree",
    urlPath: "tree",
    icon: "/core/assets/images/nav/agile.svg",
    page: "components/home/tree",
    name: "Tree"
  }, {
    id: "chart",
    urlPath: "chart",
    name: "Chart",
    page: "components/home/chart"
  }, {
    id: "code-editor",
    urlPath: "code-editor",
    name: "Code Editor",
    icon: "/core/assets/images/nav/deliver.svg",
    pages: [{
      id: "basic", // 三级页面标示符
      urlPath: "basic", // 浏览器路由地址，
      // localhost:8080/home/form/basic
      page: "components/home/code-editor/basic",
      name: "Basic"
    }, {
      id: "diff", // 三级页面标示符
      urlPath: "diff", // 浏览器路由地址，
      // localhost:8080/home/form/basic
      page: "components/home/code-editor/diff",
      name: "Diff"
    }]
  }, {
    id: "diagram",
    urlPath: "diagram",
    name: "Diagram",
    icon: "/core/assets/images/nav/deploy.svg",
    pages: [{
      id: "bpm", // 三级页面标示符
      urlPath: "bpm", // 浏览器路由地址，
      // localhost:8080/default/index.html/#/home/form/basic
      page: "components/home/diagram/bpm",
      name: "BPM"
    }]
  }, {
    id: "roadmap-planner",
    urlPath: "roadmap-planner",
    name: "Roadmap Planner",
    icon: "/core/assets/images/nav/deploy.svg",
    page: "components/home/roadmap-planner"
  }
  ]
}];
var config = {
  pages: pages,
  defaultPage: 0//page item to display, default is first child.
};
module.exports = config;

```

### 页面编写

####  REACT组件编写

##### 传统的HTML/CSS/JavaScript的代码开发  
* 按如上配置，创建常规的html文件
* 以传统的html元素做页面布局
* 内联/外联CSS做样式
* 内联/外联JavaScript做页面交互、使用JS组件

##### 示例：已编写一个二级目录的form表单为例  
* 确保pages.config.js配置正确，如上
* 创建devops-sample/com.primeton.devops.sample/src/webcontent/pages/home/form/index.html 文件
* 可以参考NUI/minui的相关[示例](http://www.miniui.com/demo/#src=form/form.html)
* 确保资源路径正确（注意：资源路径都是相对于eos context的路径，eos的项目context经常是default, 所以href="demo/css/foo.css"就等于href="/default/demo/css/foo.css"）
 * css文件资源
 * javascript文件资源
 * 图片资源 


### 运行后端Server
```shell
npm run server
```

### 运行portal ui
cd 到portal ui根目录下，执行
```
npm start
```
启动成功后，访问localhost:3001/home

### 增删改页面  
重复[页面编写](#页面编写)步骤，注意pages.config.js配置正确( 每次配置后，devops-fe-core会自动更新，不必重启)


# 常见问题  
* nui window需要与父页面进行数据同步?
答：在window里通过init方法拿到当前nui的window对象，需要数据同步的时候，调用该window对象的getOwner方法，
如
nuiWin.getOwner().get("parentFunction")(dataToSync)
或
nuiWin.getOwner().exec("parentFunction", dataToSync)
* javascript里动态加载html无法加html事件?
答：如果需要添加事件，html需要用双引号括起来, 如
var htmlInJS = "<button onclick='clickFn'>Click me</button>"
*script的 page scope是什么?
答：每个html页面(非React组件)里的自定义script需要添加page=scope属性，这样script里定义的函数、变量只会当前页面生效, 就不会污染global变量
* js，html，css代码规范
答：见[前端规范](http://euler.primeton.com/pages/viewpage.action?pageId=3278285)
