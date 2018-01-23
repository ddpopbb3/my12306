/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/
import React from 'react';
import {
  Nav,
  NavItem
} from 'react-bootstrap';
import TreePanel from './layout/tree';
import TabPanel from './layout/tabs';
import classNames from 'classnames';

const Navbar = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool, //required when navbar is tree layout
    toggleExpand: React.PropTypes.func, //required when navbar is tree layout
    items: React.PropTypes.array.isRequired,
    layout: React.PropTypes.string.isRequired,
    pathname: React.PropTypes.string //required when navbar is tab layout
  },
  getInitialState() {
    return {
      selectedItemPath: ""
    };
  },
  render() {
    const props = this.props;
    const layout = props.layout;
    const items = props.items;
    const pathname = props.pathname;
    var childClassName = `${props.className}-${layout}`;
    let nav = "";
    if (layout === "tabs") {
      nav = <TabPanel items={ items } className={ childClassName } pathname={ pathname } />;
    } else {
      nav = <TreePanel renderer={ this.props.renderer } history={ this.props.history } selectedItemPath={ this.state.selectedItemPath } toggleExpand={ props.toggleExpand } expanded={ props.expanded }
              items={ items } className={ childClassName } />
    }
    return (<div className={ props.className }>
              { nav }
            </div>);
  }
});
export default Navbar