## Getting Started

### Requirements
  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v5.7+ [download link](https://nodejs.org/en/download/stable/)
  * `npm` v3.6 or newer (new to [npm](https://docs.npmjs.com/)?)
  * Text editor or IDE pre-configured with React/JSX/Flow/ESlint ([learn more](./how-to-configure-text-editors.md))

### Quick Start

#### 1. Install

```shell
$ git clone git@git.euler.one:xijx/portal-ui.git
$ cd portal-ui
$ npm install
```

#### 2. Config configs/app.config.js
```javascript
var config = {
  server: {
    contextPath: "", // server context path, e.g: localhost:8000/foo/home, foo is the contextPath, default is empty string, i.e., url will be localhost:8000/foo/home
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
#### 3. Config pages.config.js
At configs folder, pages.config.js is the central dev configuration file for the page routing, pages.config.prod.js is the relative prod configuration.
Sample:

```javascript

var pages = [{
  id: "home", // ID for sub page
  urlPath: "home",
  navbar: "tree", // navbar layout, is used to layout sub pages. It has two options, tree or tabs, default is tree
  pages: [{
    id: "dashboard", // ID for sub-sub page
    urlPath: "dashboard", // Router path, e.g, localhost:3001/home/dashboard
    name: "Dashboard", //page name
    icon: "/core/assets/images/nav/admin.svg", // page icon
    page: "components/home/dashboard" // page component file path
  }, {
    id: "form",
    urlPath: "form",
    name: "Form",
    icon: "/core/assets/images/nav/admin.svg",
    pages: [{
      id: "formBasic", // ID for sub-sub-sub page
      urlPath: "basic", // Router path, e.g, localhost:8080/home/form/basic
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
      id: "basic",
      urlPath: "basic",
      page: "components/home/code-editor/basic",
      name: "Basic"
    }, {
      id: "diff",
      urlPath: "diff",
      page: "components/home/code-editor/diff",
      name: "Diff"
    }]
  }, {
    id: "diagram",
    urlPath: "diagram",
    name: "Diagram",
    icon: "/core/assets/images/nav/deploy.svg",
    pages: [{
      id: "bpm",
      urlPath: "bpm",
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
  defaultPage: 0 //which sub-page item to display, default is first child.
};
module.exports = config;

```


#### 4. Run Node server
```shell
npm run server
```
Node server is used for UI Interaction. E.g., Requests at http://localhost:3001/home/form/basic is sent to backend server
#### 5. Run

```shell
npm start
``` 
The command will build the app into webpack bundles. As soon as the build completes, it will start a webpack dev server.
> [http://localhost:3001/home](http://localhost:3001/home/) — Webpack dev server