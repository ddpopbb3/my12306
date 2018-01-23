# PTP Potal UI, powed by Euler UI.

### [中文文档](./README-zh.md)

## Features

### Technologies
> JavaScript Library - [React](https://facebook.github.io/react/);  
> UI Library - [Ant Design](https://github.com/ant-design/ant-design);  
> Future ECMAScript Standards - [ES6+](http://babeljs.io/docs/learn-es2015/);  
> Javascript Compiler - [Babel](http://babeljs.io/);  
> Module Bundler - [Webpack2](https://webpack.js.org/);
> Declarative routing for React  - [React Router](https://github.com/ReactTraining/react-router);
> Data Visualization - [Echarts](http://echarts.baidu.com/);  
> Data Visualization - [GoJS](http://gojs.net/latest/index.html/);  
> Code Editor - [Monaco Editor](https://github.com/Microsoft/monaco-editor);  
> Javascript Test Runner - [Karma](https://karma-runner.github.io/0.13/index.html);  
> Test Framework - [Mocha](http://mochajs.org/);  
> Tests Assertion - [Chai](http://chaijs.com/);  
> Test spies/stubs/mocks - [Sinon](http://sinonjs.org/);  

### Getting Started

  * Follow the [getting started guide](./docs/getting-started.md) to download and run the project

### Build
  * Follow [Build Doc](./docs/build.md) to build the project.

### Code Standard
 * [JS & CSS & HTML Standard](./docs/standard.md)

### Text Editors Configuration 

 * [Formatter & Linter & Snippets](./docs/how-to-configure-text-editors.md)  

### Directory Layout

```
.
├── /build                     # The folder for build output (local)
├── /node_modules              # 3rd-party libraries and utilities (local)
├── /configs                   # Dev/Prod configuration
│   ├── /dev.server.js        # Obsoleted
│   ├── /pages.config.js      # Page Router configuration(DEV)
│   ├── /pages.config.prod.js # Page Router configuration(PROD)
│   ├── /webpack.config.js    # Webpack configuration(WEB)
│   ├── /webpack.config.prod.js # Webpack configuration(PROD)
├── /core                      # Euler core library (TO BE ISOLATED)
│   ├── /assets               # CSS/Font/Images/3rd party libraries
│   ├── /scripts              # dev/build scripts
│   ├── /src                  # core components(topbar, navbar etc.)
├── /src                       # The source code of the application
│   ├── /components           # React components
│── /static                    # Static files which are copied into the /build/static folder
│   ├── /index.js             # Client-side startup script
│   └── /server.js            # Server-side startup script
├── /docs                      # documentations
└── index.html                 # index.html, will be copied into /build folder.(DEV)
└── index_prod.html            # index.html, will be copied into /build folder.(PROD)
└── package.json                # The list of 3rd party libraries and utilities
```

### Learn More

  * [Getting Started with React.js](http://facebook.github.io/react/)
  * [Redux Intro](http://redux.js.org/)
  * [Getting Started with Webpack](https://webpack.github.io/docs/tutorials/getting-started/)
  * [Learn ES6](https://babeljs.io/docs/learn-es6/)
  * [ES6 Features](https://github.com/lukehoban/es6features#readme)
  * [React How to by Peter Hunt](https://github.com/petehunt/react-howto)
  * [Webpack How to by Peter Hunt](https://github.com/petehunt/webpack-howto)
  * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
  * [Getting Started with React Bootstarp](https://react-bootstrap.github.io/getting-started.html)
  * [The Future of React](https://github.com/reactjs/react-future)