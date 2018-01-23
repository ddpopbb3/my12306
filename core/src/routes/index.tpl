{{#root}}
// DON'T CHANGE THIS FILE MANUALLY!
// This file is auto-generated by routeCreateor.js
// File created at {{date}}
import React from 'react'
import ReactDOM from 'react-dom'
import PM from '../PM'

var allComponents = {};
{{/root}}
{{#pages}}
{{#if pages}}
{{subpages pages defaultPage}}
{{/if}}

// Generate {{id}}
{{#if core}}
var Inner_{{id}}_comp = require('{{page}}');
var {{id}}_comp = React.createClass({
  getDefaultProps() {
    return {
      urlFullPath: "{{urlFullPath}}"
    }
  },
  render() {
    // this.props.children is from react router path
    return (<Inner_{{id}}_comp navbar={ {{json navbar}} } {{#if secondary}} primaryNavLayout={ this.props.primaryNavLayout } {{/if}} children={ this.props.children } items={ {{json pages}} } />);
  }
})
allComponents["{{id}}_comp"] = {{id}}_comp;
{{id}}_comp.isCore = true;
{{^}}
var {{id}}_comp = React.createClass({
  contextTypes: {
    selectNavItem: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      urlFullPath: "{{urlFullPath}}"
    }
  },
  render() {
    return (<div ref="{{id}}_comp_inner"></div>)
  },
  componentDidMount() {
    console.time("subpage render");

    this.context.selectNavItem && this.context.selectNavItem('{{urlFullPath}}');

    var node = ReactDOM.findDOMNode(this.refs.{{id}}_comp_inner);
    {{#frame}}
      var framePageURL = '{{page}}';
      if (/^\//.test(framePageURL)) {
        framePageURL = framePageURL.substring(1);
        framePageURL = "/" + PM.serverContextPath + "/" +  framePageURL;
      }
      $(node).html("<iframe id='{{id}}_frame' class='subpage-frame' src='"+ framePageURL +"'>")
    {{^}}
    var hm = require('{{absPagePath}}');
    {{#react}}
    ReactDOM.render(React.createElement(hm.default), node);
    {{^}}
    var INNER_COMP_{{id}};
    try {
     INNER_COMP_{{id}} = require('{{absPagePath}}');
    } catch(err) {
      console.warn("Can't find component by path", '{{absPagePath}}', err);
    }
    PM.loadSubPage({
      innerNode: node,
      subPageHTML: INNER_COMP_{{id}},
      subPageURL: '{{urlFullPath}}',
      filePath: '{{page}}'
    });
    {{/react}}
    {{/frame}}
    console.timeEnd("subpage render");
  }
})
allComponents["{{id}}_comp"] = {{id}}_comp;
{{/if}}

{{!-- {{#if urlPath}} --}}
var {{id}} = {
  path: '{{urlPath}}',

  {{#if pages}}

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
      {{#pages}}
          {{id}}{{#unless @last}},{{/unless}}
      {{/pages}}
      ])
    })
  },

  /*getIndexRoute(location, cb) {
    require.ensure([], function(require) {
      cb(null, {
        component: {{defPageObj.id }}_comp
      })
    })
  },*/

  {{/if}}

  getComponent(location, cb) {
    require.ensure([], (require) => {
        cb(null, {{id}}_comp)
    })
  }
}
{{!-- {{/if}} --}}

{{/pages}}
{{#root}}
var AppDefault = {{renderDefault this}};
var AppContainer = React.createClass({
  renderRoot() {
    // this.props.children || <AppDefault /> won't satisfy child path is ""
    if (PM.getCurrentPage() === "") {
      return <AppDefault />
    }
    return this.props.children || <AppDefault />;
  },
  render: function() {
    this.updatePMPageInfo();
    return (
      <div>
        {this.renderRoot()}
        <div id="notification"></div>
      </div>
    )
  },
  //current page url, path params, primary page url
  updatePMPageInfo() {
    var props = this.props;
    var params = props.params || {};
    var routes = props.routes;
    var paths = [];
    routes && routes.forEach((route)=> {
      if (route.path && route.path !== "/") {
        paths.push(route.path);
      }
    })

    if (paths.length < 1) {
      PM.setPageInfo({
        fullPath: "",
        currentPath: "",
        primaryPage: "",
        secondaryPage: "",
        params: params
      });
      return;
    }
    var currentPath = "/" + paths.join("/");

    var lastRoute = routes[routes.length - 1];
    if (lastRoute.component && !lastRoute.path) {
      var lastCompRouterPath = lastRoute.component.routerPath;
      if (lastCompRouterPath) {
        currentPath = lastCompRouterPath;
      }
      if (currentPath.substring(0, 1) !== "/") {
        currentPath = "/" + currentPath;
      }
    }

    var primaryPage = currentPath;
    // if have secondary path;
    if (paths.length > 2) {
      primaryPage = "/" + paths.slice(0, paths.length - 1).join("/");
    }

    PM.setPageInfo({
        fullPath: props.location.pathname,
        currentPath: currentPath,
        primaryPage: primaryPage,
        secondaryPage: currentPath,
        params: params
    });
  }
});
var route = {
  component: 'div',
  childRoutes: [{
    path: "/",
    component: AppContainer,
    childRoutes: [
      {{#pages}}
        {{id}}{{#unless @last}},{{/unless}}
      {{/pages}}
    ]
  }]
}
//export default route
export {route as default, allComponents}
{{/root}}
