/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/

import React from 'react';
import TopBar from './TopBar';
import Navbar from '../navbar';
import './primary.css';
import classNames from 'classnames';
import { allComponents } from '../../routes'

const PrimaryPage = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    // children: React.PropTypes.element.isRequired,
    navbar: React.PropTypes.object.isRequired
  },
  childContextTypes: {
    selectNavItem: React.PropTypes.func
  },
  getChildContext() {
    return {
      selectNavItem: this.selectNavItemByPath
    }
  },
  getInitialState() {
    return {
      expanded: true
    };
  },
  getChildPath(children) {
    // const children = this.props.children;
    return children && children.props && children.props.location && children.props.location.pathname;
  },
  hasNavbar() {
    let navbar = this.props.navbar;
    if (!navbar || navbar.hidden) {
      return false;
    }
    return true;
  },
  // That's for tree expand
  // TODO use redux
  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded
    })
  },
  renderNavbar(items) {
    if (!this.hasNavbar()) {
      return;
    }
    return (<Navbar history={ this.props.history } ref={ (navbar) => {
                                               this.navbar = navbar;
                                             } } className="primary-navbar" expanded={ this.state.expanded } toggleExpand={ this.toggleExpand } layout={ this.props.navbar.layout }
              items={ items } renderer={ this.props.navbar.renderer } pathname={ PM.getPrimaryPage() } />)
  },
  needShowDevopsMenuList() {
    return this.props.navbar.layout === "tree";
  },
  selectNavItemByPath(selectedItemPath) {
    this.navbar && this.navbar.setState({
      selectedItemPath: selectedItemPath
    })
  },
  render() {
    let showNavBar = true,
      contentStyle = {};
    let children = this.props.children;
    let childPath = this.getChildPath(children);
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
        //   childPath = "";
        // }
      } else {
        children = React.createElement(allComponents[filteredItems[0].id + "_comp"]);
        childPath = this.getChildPath(children);
      }
      let items = filteredItems.filter(function (item) {
        return !!item.name;
      });
      if (!items || items.length == 0) {
        showNavBar = false;
        contentStyle = {
          left: 0
        };
      }
    } else {
      // return (<div>您没有权限访问此页面</div>);
      // children = (<div>您没有权限访问此页面</div>);
      // childPath = "";
      showNavBar = false;
      contentStyle = {
        left: 0
      };
    }

    let navbarLayout = this.props.navbar.layout;
    let pageClass = classNames("primary", `primary-layout-${navbarLayout}`, {
      "primary-without-navbar": !this.hasNavbar(),
      "primary-navbar-customized": !!this.props.navbar.renderer,
      "primary-navbar-collapsed": !this.state.expanded
    })

    return (
      <section className={ pageClass }>
        <TopBar actions={ this.props.actions } pathname={ childPath } needShowDevopsMenuList={ this.needShowDevopsMenuList() } />
        { showNavBar ? this.renderNavbar(filteredItems) : "" }
        <section className="primary-content" style={ contentStyle }>
          { React.cloneElement(children, {
              key: PM.getFullPagePath(), // that's for re-render url page whose path has path params
              primaryNavLayout: navbarLayout
            }) }
        </section>
      </section>
    );
  }
});

module.exports = PrimaryPage
