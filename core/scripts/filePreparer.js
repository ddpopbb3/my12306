const argv = require('yargs').argv;
const logger = require('./logger');
const shell = require("shelljs");
const path = require("path").posix;
const appRootPath = argv.app_root_path;
logger.profile("File Preparation");
shell.cp("index.html", path.join(appRootPath, "index.html"));
shell.cp("-rf", "assets", appRootPath);
logger.profile("File Preparation");