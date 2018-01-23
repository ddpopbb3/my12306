#!/bin/bash

#
# Copyright (c) 2001-2017 Primeton Technologies, Ltd.
# All rights reserved.
#
# author: ZhongWen Li (mailto:lizw@primeton.com)
#

GIT_ROOT=$(cd $(dirname ${0})/..; pwd)

WAR_PATH="${GIT_ROOT}/devops-dailybuild/war/target/temp/war/devops"
CORE_PATH="${GIT_ROOT}/devops-fe-core"

echo "GIT_ROOT=${GIT_ROOT}"

ORIGIN_WAR="${GIT_ROOT}/devops-dailybuild/war/target/devops.war"
FINAL_WAR="${GIT_ROOT}/devops-dailybuild/war/target/devops-final.war"

#
# Use origin war if ${WAR_PATH} not exists.
#
if [ ! -d "${WAR_PATH}" ]; then
	echo "[WARN] ${WAR_PATH} not found."
	if [ -f ${ORIGIN_WAR} ]; then
		mkdir -p ${WAR_PATH}
		unzip ${ORIGIN_WAR} -d ${WAR_PATH}
	else
    	echo "WAR is not ready, ${ORIGIN_WAR} not found."
    	exit 1
	fi
fi

if [ -z "`which npm`" ]; then
    echo "Node env is wrong. Command 'npm' not found."
    exit 1
fi

npm -v

# clean fe build
if [ -f ${CORE_PATH}/build ]; then
	rm -rf ${CORE_PATH}/build
fi

#
# build fe-core
#
cd ${CORE_PATH}

# use taobao repository 
npm config set registry https://registry.npm.taobao.org
npm config get registry

npm install

export EOS_WEB_ROOT=${WAR_PATH}
echo "EOS_WEB_ROOT=${EOS_WEB_ROOT}"

npm run prod

#
# check build result
#
if [ ! -f ${CORE_PATH}/build/bundle.js ]; then
	echo "[ERROR] npm build failed."
	exit 1
fi

cp -rf ${CORE_PATH}/build/* ${WAR_PATH}

#
# Generate build.version
#
VERSION_FILE=${WAR_PATH}/build.version
if [ -f ${VERSION_FILE} ]; then
	rm -f ${VERSION_FILE}
fi
touch ${VERSION_FILE}
echo "version=1.0.0" >> ${VERSION_FILE}
echo "date=`date +%Y%m%d%H%M%S`" >> ${VERSION_FILE}

#
# Package final war file
#
if [ -f ${FINAL_WAR} ]; then
	rm -f ${FINAL_WAR}
fi
cd ${WAR_PATH}
if [ -n "`which jar`" ]; then
	#jar -cvf ${FINAL_WAR} .
	jar -cf ${FINAL_WAR} .
else
	zip -r ${FINAL_WAR} .
fi
echo "[INFO] DevOps new war has been released, see ${FINAL_WAR}"
