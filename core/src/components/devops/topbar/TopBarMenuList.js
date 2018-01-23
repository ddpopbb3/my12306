/*******************************************************************************
 * Licensed Materials - Property of Primeton 
 * (c) Copyright Primeton 2017. All Rights Reserved. 
 * 
 *******************************************************************************/

import React from 'react';
import classNames from 'classnames';
import {
  Link
} from 'react-router';
import Constants from 'core/src/components/devops/common/Constants';

// import 'whatwg-fetch';


//Class Name
const CONST_CLASS_NAME_MORE = "dropdown-item-more"; // NON-TRANSLATABLE
const CONST_CLASS_NAME_DROP_DOWN_ITEM_NO_RECORDS = "dropdown-item-noRecords"; // NON-TRANSLATABLE
const CONST_CLASS_DIVIDER = "divider"; // NON-TRANSLATABLE
const CONST_CLASS_NAME_DROPDOWM = "dropdown"; // NON-TRANSLATABLE
const CONST_CLASS_NAME_DROPDOWM_MENU = "dropdown-menu"; // NON-TRANSLATABLE
const CONST_CLASS_DROPDOWN_INPUT = "js-dropdown-input"; // NON-TRANSLATABLE
const CONST_CLASS_NAME_DROPDOWN_ITEM_LINK = "js-dropdown-item-link"; // NON-TRANSLATABLE
const CONST_TOP_BAR_LIST = "primary-topbar-list"; // NON-TRANSLATABLE

//Control key
const CONST_CTRL_KEY_DROP_DOWN_ITEM_NO_RECORDS = "dropdown-item-noRecords"; // NON-TRANSLATABLE
const CONST_CTRL_KEY_SEPARATOR = "dropdown-item-separator"; // NON-TRANSLATABLE
const CONST_CTRL_KEY_MORE = "dropdown-item-more"; // NON-TRANSLATABLE

//Links
const CONST_LINK_APP_SYS = "/home/products"; // NON-TRANSLATABLE
const CONST_LINK_SYS_SERVICE = "/home/products"; // NON-TRANSLATABLE

//ID
const CONST_ID_APP_SYS = "products"; // NON-TRANSLATABLE
const CONST_ID_SYS_SERVICE = "projects"; // NON-TRANSLATABLE

//Others
const CONST_ROLE_SEPARATOR = "separator"; // NON-TRANSLATABLE
const CONST_PROP_NAME_DROPDOWM = "dropdown--focused"; // NON-TRANSLATABLE
const CONST_DATA_URL_APP_SYS = "api/si/visit-histories?resourceType=1&limit=10"; // NON-TRANSLATABLE
const CONST_DATE_URL_SYS_SERVICE = "api/si/visit-histories?resourceType=2&limit=10"; // NON-TRANSLATABLE

const DropDownMenu = React.createClass({
  propTypes: {
    dataProcessor: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      items: [],
      dataFetched: false,
      dropdownFocused: false
    };
  },

  fetchMenuItems() {
    //const props = this.props;
    //const dataProcessor = props.dataProcessor;
    //var _this = this;
    //nui.ajax({
    //  url: props.dataURL,
    //  success: function(json) {
    //    let items = json || [];
    //    items = dataProcessor && dataProcessor(items);
    //    _this.setState({
    //      dataFetched: true,
    //      items: items
    //    })
    //  },
    //
    //  error: function(error) {
    //    _this.setState({
    //      dataFetched: true,
    //      items: []
    //    })
    //    console.log('request failed');
    //  }
    //})
    window.location.assign(location.origin);
    // fetch(props.dataURL).then((response) => {
    //   return response.json();
    // }).then((json) => {
    //   let items = json || [];
    //   items = dataProcessor && dataProcessor(items);
    //   this.setState({
    //     dataFetched: true,
    //     items: items
    //   })
    // }).catch((error) => {
    //   this.setState({
    //     dataFetched: true,
    //     items: []
    //   })
    //   console.log('request failed', error);
    // })
  },

  onDropdownFocus() {
    this.props.setCurrentDropdownId(this.props.id);
  },

  onItemClick() {
    this.hideDropDown = setTimeout(() => {
      this.props.setCurrentDropdownId(Constants.CONST_EMPTY_STR);
    }, 100)
  },

  componentWillUnmount() {
    clearTimeout(this.hideDropDown);
  },

  render() {
    const items = this.state.items.map((item, id) => {
      return <li key = {id} onClick={this.onItemClick} >
        <a className = {CONST_CLASS_NAME_DROPDOWN_ITEM_LINK} href={item.link}>
          {item.name}
        </a>
      </li>;
    })

    //let emptyMessage = Constants.CONST_EMPTY_STR;
    //if (this.state.dataFetched && (!items || items.length === 0)) {
    //  items.push(<li key = {CONST_CLASS_NAME_DROP_DOWN_ITEM_NO_RECORDS} className = {CONST_CTRL_KEY_DROP_DOWN_ITEM_NO_RECORDS}>暂无浏览记录</li>);
    //}

    //items.push(<li key = {CONST_CTRL_KEY_SEPARATOR} role = {CONST_ROLE_SEPARATOR} className = {CONST_CLASS_DIVIDER}></li>);
    //items.push(<li key = {CONST_CTRL_KEY_MORE} className = {CONST_CLASS_NAME_MORE}>
    //  <Link to={this.props.viewMorePath} onClick={this.onItemClick} ><span>查看全部</span></Link>
    //</li>);

    const dropdownClassNames = classNames(CONST_CLASS_NAME_DROPDOWM, {
      "dropdown--focused": this.props.focused // NON-TRANSLATABLE
    })


    return (
      <div className = {dropdownClassNames}>
        <input className = {CONST_CLASS_DROPDOWN_INPUT} type = {Constants.CONST_CTRL_TYPE} readOnly value = {this.props.name} onFocus = {this.onDropdownFocus}  />
          {items}
      </div>
    );
    //onClick = {this.fetchMenuItems}
  }
});

const TopBarMenuList = React.createClass({
  getInitialState() {
    return {
      currentDropDownId: Constants.CONST_EMPTY_STR
    };
  },
  componentDidMount() {
    this.clickEvent = (event) => {
      const eventTargetClassName = event.target.className;
      if (eventTargetClassName !== {
          CONST_CLASS_NAME_DROPDOWN_ITEM_LINK
        } && eventTargetClassName !== CONST_CLASS_DROPDOWN_INPUT) {
        this.setCurrentDropdownId(Constants.CONST_EMPTY_STR);
      }
    }
    document.body.addEventListener(Constants.CONST_EVENT_TYPE_CLICK, this.clickEvent);
  },
  componentWillUnmount() {
    document.body.removeEventListener(Constants.CONST_EVENT_TYPE_CLICK, this.clickEvent);
  },
  processProduct(items) {
    return items.map((item) => {
      return {
        name: item.resourceName || item.resourceId,
        link: `#{CONST_LINK_APP_SYS}${item.resourceId}`
      }
    })
  },
  processProject(items) {
    return items.map((item) => {
      return {
        name: item.resourceName || item.resourceId,
        link: `#{CONST_LINK_SYS_SERVICE}${item.resourceId}`
      }
    })
  },
  setCurrentDropdownId(dropdownId) {
    this.setState({
      currentDropDownId: dropdownId
    })
  },
  render() {
    return (
      <div className={CONST_TOP_BAR_LIST}>
        <DropDownMenu id ={CONST_ID_APP_SYS} setCurrentDropdownId={ this.setCurrentDropdownId } focused={ this.state.currentDropDownId === CONST_ID_APP_SYS } name="My 12306" dataURL={CONST_DATA_URL_APP_SYS} viewMorePath={CONST_LINK_APP_SYS} dataProcessor={this.processProduct} />
      </div>
    );
  }
});

export default TopBarMenuList