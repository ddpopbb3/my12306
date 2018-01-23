/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import classNames from 'classnames';
import './tree.css';
import TreeLogo from 'core/src/components/devops/tree/logo';
import Constants from 'core/src/components/devops/common/Constants';
// const updateFooter = () => {
//   const tree = document.querySelector(".primary-navbar-tree");
//   const treeClientHeight = tree.clientHeight;
//   const treeIconHeight = tree.querySelector(".navbar-tree-icon").clientHeight;
//   const treeMenuHeight = tree.querySelector(".navbar-tree-ul").clientHeight;
//   const treeNewDom = tree.querySelector(".navbar-tree-new");
//   const treeNewHeight = treeNewDom && treeNewDom.clientHeight;
//   if (treeClientHeight < treeIconHeight + treeMenuHeight + treeNewHeight + 40) {
//     tree.querySelector(".navbar-tree-footer").style.display = "none";
//   } else {
//     tree.querySelector(".navbar-tree-footer").style.display = "block";
//   }
// }
const TreeNodeItems = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  contextTypes: {
    selectedItemPath: React.PropTypes.string
  },

  isChildItemSelected(item) {
    if (!item || !item.pages) {
      return false;
    }
    let itemPath = item.urlFullPath;
    const selectedItemPath = this.context.selectedItemPath;
    if (itemPath.substring(itemPath.length - 1) !== Constants.CONST_SLASH) {
      itemPath += Constants.CONST_SLASH;
    }
    const regExp = new RegExp("^" + itemPath);
    if (regExp.test(selectedItemPath)) {
      return true;
    }
    return false;
  },

  isItemCollapsible(item) {
    return !!item.pages;
  },

  isItemSelected(item) {
    return item && (item.urlFullPath === this.context.selectedItemPath);
  },

  render() {
    const props = this.props;
    let items = props.items.filter(function(item) {
      return !!item.name && !(item.navbar === false);
    });

    const treeNodes = items.map((item, id) => {
      return <TreeNodeItem collapsible={ this.isItemCollapsible(item) } selected={ this.isItemSelected(item) } childItemSelected={ this.isChildItemSelected(item) } item={ item } key={ item.id }
             />;
    })

    return <ul className="navbar-tree-ul">
             { treeNodes }
           </ul>
  }
})

const TreeNodeItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  contextTypes: {
    isNavbarExpanded: React.PropTypes.bool,
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      expanded: false,
      mouseOvered: false
    };
  },

  onNodeClick() {
    const item = this.props.item;
    if (item.pages) {
      this.setState({
          expanded: !this.state.expanded
        })
        // setTimeout(updateFooter, 400)
    } else {
      this.context.router.push(item.urlFullPath);
    }
  },

  onMouseOver() {
    this.setState({
      mouseOvered: true
    })
  },

  onMouseOut() {
    this.setState({
      mouseOvered: false
    })
  },

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;
    // syn expanded state when first url is its child path
    if (props.collapsible && props.childItemSelected && !prevProps.childItemSelected) {
      this.setState({
        expanded: true
      })
    }
  },

  render() {
    const props = this.props;
    const item = props.item;
    const expanded = this.state.expanded;

    const itemClass = classNames("navbar-tree-li", {
      "navbar-tree-li-expanded": props.collapsible && expanded,
      "navbar-tree-li-collapsed": props.collapsible && !expanded,
      "navbar-tree-li-selected": props.selected
    })
    let imageIcon = item.icon || "/core/assets/images/nav/point.svg";
    if (imageIcon.charAt(0) !== "/") {
      imageIcon = "/" + imageIcon;
    }
    if (this.state.mouseOvered || props.selected) {
      const imageIconAfterSplit = imageIcon.split(".");
      imageIcon = imageIconAfterSplit[0] + "_focus." + imageIconAfterSplit[1];
    }
    const itemLink = <a onClick={ this.onNodeClick } onMouseOver={ this.onMouseOver } onMouseOut={ this.onMouseOut }><img className="navbar-tree-li-img" src={ imageIcon } width={ 15 } height={ 15 } /><span>{ item.name }</span></a>;
    const itemLinkWithOverlayTrigger = < OverlayTrigger placement = "right"
    overlay = {
      <Tooltip id="navbar-tree-tooltip">
                                              { item.name }
                                            </Tooltip>
    } > {
      itemLink
    } < /OverlayTrigger>
    return <li className={ itemClass }>
             { this.context.isNavbarExpanded ? itemLink : itemLinkWithOverlayTrigger }
             { item.pages ? <TreeNodeItems items={ item.pages } /> : "" }
           </li>

  }
})

const NewAddedItems = React.createClass({
  isItemSelected(item) {
    let urlFullPath = item.urlFullPath || "";
    if (urlFullPath.charAt(0) !== "/") {
      urlFullPath = "/" + urlFullPath;
    }
    return item && (urlFullPath === PM.getFullPagePath());
  },
  render() {
    const items = this.props.items;
    if (!items.length) {
      return null;
    }
    const newAddedItems = items.map((item, id) => {
      return <TreeNodeItem key={ id } collapsible={ false } item={ item } selected={ this.isItemSelected(item) } />
    })
    return <div className="navbar-tree-new">
             <div className="navbar-tree-new-label"><img class="navbar-tree-li-img" src="/core/assets/images/nav/deliver.svg" width="15" height="15" /> <span className="navbar-tree-new-text">{ this.props.name }</span>(
               { items.length })</div>
             <ul className="navbar-tree-ul">
               { newAddedItems }
             </ul>
           </div>
  }
})

const TreeBody = React.createClass({
  render() {
    return (<div className="navbar-tree-body">
              <TreeNodeItems items={ this.props.items } />
              <NewAddedItems name={ PM.RecentOpen.name } items={ PM.RecentOpen.items } />
            </div>)
  }
})

const CustomRender = React.createClass({
  componentDidMount() {
    // debugger;
    const renderer = this.props.renderer;
    PM.loadSubPage({
      innerNode: ReactDOM.findDOMNode(this.refs.body),
      subPageHTML: "",
      subPageURL: renderer,
      filePath: renderer
    });
  },
  render() {
    return (<div ref="body" className="navbar-tree-body">
            </div>)
  }
})

const TreePanel = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    toggleExpand: React.PropTypes.func.isRequired
  },
  childContextTypes: {
    selectedItemPath: React.PropTypes.string,
    isNavbarExpanded: React.PropTypes.bool
  },
  getChildContext() {
    return {
      selectedItemPath: this.props.selectedItemPath,
      isNavbarExpanded: this.props.expanded
    }
  },
  getDefaultSelectedItemId() {
    const items = this.props.items;
    return items && items[0] && items[0].id
  },
  componentDidMount() {
    // updateFooter();
  },
  render() {
    const props = this.props;
    const expanded = props.expanded;
    const imageClass = classNames({
      "navbar-tree-expand-btn": !expanded,
      "navbar-tree-collapse-btn": expanded
    })
    return (
      <div className={ props.className }>
        <TreeLogo fullPathPath={ PM.getFullPagePath() } />
        { props.renderer ? <CustomRender renderer={ props.renderer } /> : <TreeBody items={ props.items } /> }
        <div className="navbar-tree-footer">
          <span className={ imageClass } onClick={ props.toggleExpand } />
        </div>
      </div>
    );
  }
});

export default TreePanel