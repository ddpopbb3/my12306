import React from 'react'
import ReactDOM from 'react-dom'
// Generate user_gridBasic
var user_gridBasic_comp = React.createClass({
  render() {
    return (<div ref="user_gridBasic_comp_inner"></div>)
  },
  componentDidMount() {
    console.time("subpage render");
    var node = ReactDOM.findDOMNode(this.refs.user_gridBasic_comp_inner);
    var hm = require('/Users/jinxinxi/Work/eos/eosbps75/apache-tomcat-7.0.54/webapps/default/sample/pages/home/grid/productline/index.html');
    PM.setCurrentPage('/home/grid/basic');
    PM.loadSubPage(node, hm, '/home/grid/basic', 'sample/pages/home/grid/productline/index.html');
    console.timeEnd("subpage render");
  }
})
var user_gridBasic = {
  path: 'basic',


  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, user_gridBasic_comp)
    })
  }
}

// Generate user_gridDatabinding
var user_gridDatabinding_comp = React.createClass({
  render() {
    return (<div ref="user_gridDatabinding_comp_inner"></div>)
  },
  componentDidMount() {
    console.time("subpage render");
    var node = ReactDOM.findDOMNode(this.refs.user_gridDatabinding_comp_inner);
    var hm = require('/Users/jinxinxi/Work/eos/eosbps75/apache-tomcat-7.0.54/webapps/default/sample/pages/home/grid/dataBinding.html');
    PM.setCurrentPage('/home/grid/databinding');
    PM.loadSubPage(node, hm, '/home/grid/databinding', 'sample/pages/home/grid/dataBinding.html');
    console.timeEnd("subpage render");
  }
})
var user_gridDatabinding = {
  path: 'databinding',


  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, user_gridDatabinding_comp)
    })
  }
}


// Generate user_grid
var Inner_user_grid_comp = require('../components/secondary');
var user_grid_comp = React.createClass({
  render() {
    // this.props.children is from react router path
    return (<Inner_user_grid_comp children={ this.props.children || React.createElement(user_gridBasic_comp) } items={ [{ "id": "user_gridBasic", "urlPath": "basic", "page": "sample/pages/home/grid/productline/index.html", "name": "Grid", "icon": "assets/images/home/ziyuan.svg", "urlFullPath": "/home/grid/basic", "absPagePath": "/Users/jinxinxi/Work/eos/eosbps75/apache-tomcat-7.0.54/webapps/default/sample/pages/home/grid/productline/index.html" }, { "id": "user_gridDatabinding", "urlPath": "databinding", "page": "sample/pages/home/grid/dataBinding.html", "name": "DataBinding", "icon": "assets/images/home/ziyuan.svg", "urlFullPath": "/home/grid/databinding", "absPagePath": "/Users/jinxinxi/Work/eos/eosbps75/apache-tomcat-7.0.54/webapps/default/sample/pages/home/grid/dataBinding.html" }] } />);
  }
})
module.exports = {
  path: 'grid',


  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        user_gridBasic,
        user_gridDatabinding
      ])
    })
  },

  getIndexRoute(location, cb) {
    require.ensure([], function(require) {
      cb(null, {
        component: user_gridBasic_comp
      })
    })
  },


  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, user_grid_comp)
    })
  }
}