/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/

import React from 'react';
import { Link } from 'react-router';
import Navbar from '../navbar';
import { allComponents } from "../../routes";

const SecondaryPage = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    primaryNavLayout: React.PropTypes.string.isRequired,
    // children: React.PropTypes.element.isRequired,
    navbar: React.PropTypes.object.isRequired
  },
  needRenderNavbar() {
    const props = this.props;
    if (props.navbar.hidden === true || props.primaryNavLayout === "tree") {
      return false;
    }
    return true;
  },
  renderSecondaryNavbar() {
    if (!this.needRenderNavbar()) {
      return;
    }
    return (<Navbar history={ this.props.history } className="secondary-navbar" layout={ this.props.navbar.layout } items={ this.props.items } pathname={ PM.getSecondaryPage() } />)
  },
  render() {
    var children = this.props.children;
    var filteredItems = PM.filterItemsWithPermission(this.props.items, nui.getPathParams("projectid"));

    if (filteredItems && filteredItems.length > 0) {
      if (children) {
        // let isChildHasPermission = false;
        // for (var i = 0; i < filteredItems.length; i++) {
        //   if (filteredItems[i].urlFullPath === children.props.urlFullPath) {
        //     isChildHasPermission = true;
        //     break;
        //   }
        // }
        // if (!isChildHasPermission) {
        //   // return (<div>您没有权限访问此页面</div>);
        //   children = (<div>您没有权限访问此页面</div>);
        // }
      } else {
        children = React.createElement(allComponents[filteredItems[0].id + "_comp"]);
      }
    } else {
      // return (<div>您没有权限访问此页面</div>);
      // children = (<div>您没有权限访问此页面</div>);
    }

    return (
      <section className="secondary">
        { this.renderSecondaryNavbar() }
        <section className="secondary-content">
          { children }
        </section>
      </section>
    );
  }
});
module.exports = SecondaryPage