const assert = require("assert");
const NODES = [{
  id: "node-1",
  isLeaf: true,
  text: "节点1"
}, {
  id: "node-2",
  isLeaf: true,
  text: "节点2"
}];
const SERVICES = [{
  id: "service-users",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  text: "用户服务"
}, {
  id: "service-booking",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  text: "票务服务"
}, {
  id: "service-payment",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  text: "付款服务"
}];
const APPS = [{
  id: "app-booking",
  text: "订票应用",
  type: "app",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  pid: "apps"
}, {
  id: "app-borrow",
  text: "借书应用",
  type: "app",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  pid: "apps"
}, {
  id: "app-others",
  text: "其他应用",
  type: "app",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  pid: "apps"
}];

const DOMAINS = [{
  id: "domain-1",
  text: "域1",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  dataURL: "/api/domains/domain-1/apps",
  pid: "apps"
}, {
  id: "domain-2",
  text: "域2",
  expanded: false,
  asyncLoad: true,
  isLeaf: false,
  dataURL: "/api/domains/domain-2/sub-domains",
  pid: "apps"
}];
const createRandomKey = length => Math.random().toString(36).substr(2, length);
const governor = (router) => {

  router.route('/apps').get((req, res) => {
    const result = APPS.map(app => Object.assign({}, app, {
      url: `/app/apps/app-${createRandomKey(4)}`,
      dataURL: `/api/apps/${app.id}/services`
    }));
    res.json(result);
  });

  // router.route('/domains').get((req, res) => {
  //   res.json(DOMAINS);
  // });

  // router.route('/domains/:domainId/apps').get((req, res) => {
  //   const domainId = req.params.domainId;
  //   assert.ok(domainId);
  //   const result = APPS.map(app => Object.assign({}, app, {
  //     id: `${domainId}-${app.id}`,
  //     text: `${domainId}-${app.text}`,
  //     pid: domainId,
  //     url: `/home/apps/app-${createRandomKey(4)}`,
  //     dataURL: `/api/apps/${app.id}/services`
  //   }));
  //   res.json(result);
  // });

  // router.route('/domains/:domainId/sub-domains').get((req, res) => {
  //   const domainId = req.params.domainId;
  //   assert.ok(domainId);
  //   const result = DOMAINS.map(domain => Object.assign({}, domain, {
  //     id: `${domainId}-${domain.id}`,
  //     text: `${domainId}-${domain.text}`,
  //     pid: domainId
  //   }));
  //   res.json(result);
  // });

  router.route('/apps/:appId/services').get((req, res) => {
    const appId = req.params.appId;
    assert.ok(appId);
    const result = SERVICES.map(service => Object.assign({}, service, {
      id: `${appId}-${service.id}`,
      text: `${appId}-${service.text}`,
      pid: appId,
      url: `/app/services/service-${createRandomKey(4)}`,
      dataURL: `/api/services/${service.id}/nodes`
    }));
    res.json(result);
  });

  router.route('/services/:serviceId/nodes').get((req, res) => {
    const serviceId = req.params.serviceId;
    assert.ok(serviceId);
    const result = NODES.map(node => Object.assign({}, node, {
      id: `${serviceId}-${node.id}`,
      text: `${serviceId}-${node.text}`,
      url: `/app/nodes/node-${createRandomKey(4)}`,
      pid: serviceId
    }));
    res.json(result);
  });
}
module.exports = governor
