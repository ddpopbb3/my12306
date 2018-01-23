import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import WebFont from 'webfontloader'
import 'antd/dist/antd.css';
import './base.css';
import route from './routes';
import 'console-polyfill';
import 'whatwg-fetch';
import 'es6-promise/auto';

render(
  <Router history={ browserHistory } routes={ route } />
  , document.getElementById('content')
)
