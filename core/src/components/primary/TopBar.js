/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/

import React from 'react';
import { Breadcrumb, Navbar, Image, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import TopBarMenuList from 'core/src/components/devops/topbar/TopBarMenuList';

const TopBar = React.createClass({
  getLink() {
    const pathname = this.props.pathname;
    if (/^\/home\//.test(pathname)) {
      return "/home";
    } else if (/^\/admin\//.test(pathname)) {
      return "/admin";
    }
  },

  renderBreadcrumb() {
    let pathname = this.props.pathname;
    pathname = pathname.substring(1);
    let url = "#";
    const breadcrumbItems = pathname.split("/").map((path, id) => {
      url += "/" + path;
      return (<Breadcrumb.Item key={ id } href={ url }>
                { path }
              </Breadcrumb.Item>)
    })
    return (
      <Breadcrumb>
        { breadcrumbItems }
      </Breadcrumb>)
  },
  renderHeader() {
     if (this.props.needShowDevopsMenuList) {
       return <TopBarMenuList />
     }
     return this.renderBreadcrumb();
  },

  login() {
	  location.href = location.origin + "/" + PM.serverContextPath + "login";
  },

  signup() {
	  location.href = location.origin + "/" + PM.serverContextPath + "signup";
  },

  logout() {
	  location.href = location.origin + "/" + PM.serverContextPath + "login";
      window.localStorage.userUid = "请登录";
      window.localStorage.userId = "";
  },

  render() {
    var userId = window.sessionStorage.getItem("userId");
    return (
      <Navbar fluid={ true } className="primary-topbar">
        <Navbar.Header>
          <Link to="/home">
          </Link>
          { this.renderHeader() }
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight  className="primary-topbar-navs">
            <NavItem>
              <Image  id = "loginTag" style={{color:'white'}} onClick={ this.login } title="请登录"/>
            </NavItem>
            <NavItem>
              <Image style={{color:'white'}} onClick={ this.logout } title="注销" />
            </NavItem>
            <NavItem>
             <Image style={{color:'white'}} onClick={ this.signup } title="注册" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

export default TopBar
