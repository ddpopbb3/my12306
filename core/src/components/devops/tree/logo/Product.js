import React from 'react';
import Base from './Base';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
class Product extends Base {
  getFetchDataURL() {
    return `api/spm/products/${PM.getPathParams().productid}`;
  }
  getIconText(json) {
    return json.productName
  }
  getIconImage() {
    return <OverlayTrigger placement="bottom" overlay={ <Tooltip id="navbar-tree-icon-tooltip">
                                               产品首页
                                             </Tooltip> }>
             <a href={ `/home/products/${PM.getPathParams().productid}` }>
               <img width={ 40 } height={ 40 } src={ `/core/assets/images/nav/logo_product.svg` } />
             </a>
           </OverlayTrigger>
  }
}

export default new Product()
