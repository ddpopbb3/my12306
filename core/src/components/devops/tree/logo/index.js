import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Admin from './Admin';
import Home from './Home';
import Product from './Product';
import Project from './Project';
import 'whatwg-fetch';

const IconText = React.createClass({
  getInitialState() {
    return {
      displayName: ""
    };
  },
  render() {
    const displayName = this.state.displayName;
    return <OverlayTrigger placement="right" overlay={ <Tooltip id="navbar-tree-icon-tooltip">
                                              { displayName }
                                            </Tooltip> }>
             <span>{ displayName }</span>
           </OverlayTrigger>
  }
})

const IconCreator = {
  create(cmp) {
    return React.createClass({
      propTypes: {
        fullPathPath: React.PropTypes.string.isRequired
      },
      updateInfo() {
        if (!cmp.getFetchDataURL) {
          return;
        }
        var iconText = this.iconText;
        fetch(cmp.getFetchDataURL()).then((response) => {
          return response.json();
        }).then((json) => {
          this.iconText.setState({
            displayName: cmp.getIconText(json)
          })
        })
      },
      shouldComponentUpdate(nextProps, nextState) {
        if (this.props.fullPathPath === nextProps.fullPathPath) {
          return false;
        }
        return true;
      },
      componentDidMount() {
        this.updateInfo();
      },
      componentDidUpdate(prevProps, prevState) {
        this.updateInfo();
      },
      render() {
        return (
          <div className={ cmp.getClassName() }>
            { cmp.getIconImage() }
            <IconText ref={ (iconText) => {
                              this.iconText = iconText;
                            } } />
          </div>
        );
      }
    })
  }
}

const Icons = {
  home: IconCreator.create(Home),
  admin: IconCreator.create(Admin),
  product: IconCreator.create(Product),
  project: IconCreator.create(Project)
}

const TreeLogo = (props) => {
  const fullPathPath = props.fullPathPath;
  if (/^\/home\/products\//.test(fullPathPath)) {
    return <Icons.product fullPathPath={ fullPathPath } />;
  } else if (/^\/home\/projects\//.test(fullPathPath)) {
    return <Icons.project fullPathPath={ fullPathPath } />;
  } else if (/^\/admin/.test(fullPathPath)) {
    return <Icons.admin fullPathPath={ fullPathPath } />;
  } else {
    return <Icons.home fullPathPath={ fullPathPath } />;
  }
}

export default TreeLogo
