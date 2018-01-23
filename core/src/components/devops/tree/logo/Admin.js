//test
import React from 'react';
import Base from './Base';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
class Admin extends Base {
  getClassName() {
    return super.getClassName() + ' navbar-tree-icon-noText';
  }
  getIconImage() {
    return <OverlayTrigger placement="bottom" overlay={ <Tooltip id="navbar-tree-icon-tooltip">
                                               首页
                                             </Tooltip> }>
             <a href={window.location.origin}>
               <img width={ 40 } height={ 40 } src={ `/core/assets/images/nav/logo_admin.svg` } />
             </a>
           </OverlayTrigger>
  }
}

export default new Admin()
