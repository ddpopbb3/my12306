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
import './tabs.css'

const Tab = React.createClass({
  propTypes: {
    selected: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object.isRequired
  },
  getPathFromRouteParams(path) {
    const routeParams = PM.getPathParams() || {};
    const keys = Object.keys(routeParams);
    if (!keys.length) {
      return path;
    }
    keys.forEach((paramName) => {
      path = path.replace(":" + paramName, routeParams[paramName]);
    })
    return path;
  },
  render() {
    const props = this.props;
    const item = props.item;
    const cn = props.selected ? "nav-active" : "";
    return (<NavItem key={ props.key } onClick={ props.onItemClick } className={ cn } href={ "#" + this.getPathFromRouteParams(item.urlFullPath) }>
              { item.name }
            </NavItem>)
  }
})

const TabPanel = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    pathname: React.PropTypes.string.isRequired
  },
  getItemIdByPath(path) {
    const items = this.props.items;
    const item = items && items.filter((item) => {
      return path === item.urlFullPath;
    })
    return item[0] && item[0].id;
  },
  getDefaultSelectedItemId() {
    const items = this.props.items;
    return items && items[0] && items[0].id
  },
  render() {
    const props = this.props;
    let selectedItemId = this.getItemIdByPath(props.pathname);
    selectedItemId = selectedItemId || this.getDefaultSelectedItemId();
    const navItems = this.props.items.map((item, id) => {
      const selected = selectedItemId === item.id;
      return (<Tab key={ id } selected={ selected } item={ item } />)
    })
    return (
      <Nav bsStyle="pills" className={ this.props.className } onSelect={ this.handleSelect }>
        { navItems }
      </Nav>
    );
  }
});
export default TabPanel