import React from 'react';
import Base from './Base';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
class Project extends Base {
  getFetchDataURL() {
    return `api/pm/projects/${PM.getPathParams().projectid}`;
  }
  getIconText(json) {
    return json.projectName
  }
  getIconImage() {
    return <OverlayTrigger placement="bottom" overlay={ <Tooltip id="navbar-tree-icon-tooltip">
                                               项目首页
                                             </Tooltip> }>
             <a href={ `/home/projects/${PM.getPathParams().projectid}` }>
               <img width={ 40 } height={ 40 } src={ `/core/assets/images/nav/logo_project.svg` } />
             </a>
           </OverlayTrigger>
  }
}

export default new Project()
