import React from 'react';
import Base from './Base';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
class Home extends Base {
  getClassName() {
    return super.getClassName() + ' navbar-tree-icon-noText';
  }
  getIconImage() {
    return <OverlayTrigger placement="bottom" overlay={ <Tooltip id="navbar-tree-icon-tooltip">
                                               首页
                                             </Tooltip> }>
             <a href="/home">
               <img width={ 40 } height={ 40 } src={ `/core/assets/images/nav/logo_home.svg` } />
             </a>
           </OverlayTrigger>
  }
}

export default new Home()
