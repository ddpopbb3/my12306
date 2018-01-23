import React from 'react'
import ReactDOM from 'react-dom'
// Generate user_signup
var user_signup_comp = React.createClass({
  render() {
    return (<div ref="user_signup_comp_inner"></div>)
  },
  componentDidMount() {
    console.time("subpage render");
    var node = ReactDOM.findDOMNode(this.refs.user_signup_comp_inner);
    var hm = require('/Users/jinxinxi/Work/eos/eosbps75/apache-tomcat-7.0.54/webapps/default/sample/pages/portal/signup.html');
    PM.setCurrentPage('/signup');
    PM.loadSubPage(node, hm, '/signup', 'sample/pages/portal/signup.html');
    console.timeEnd("subpage render");
  }
})
module.exports = {
  path: 'signup',


  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, user_signup_comp)
    })
  }
}