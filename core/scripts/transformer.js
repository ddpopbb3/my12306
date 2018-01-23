'use strict';
const argv = require('yargs').argv;
const logger = require('./logger');
const result = require("./pageConfigFinder").find({
  web_root_dir: argv.web_root_dir
});
logger.profile("transformer");
require("./routeCreator").transform({
  appRootPath: result.appRootPath,
  pageConfigs: result.pageConfigs
});
logger.profile("transformer");