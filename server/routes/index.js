const portal = require("./portal");
const governor = require("./governor");
const express = require("express");

const combineRoutes = (routes) => {
  const router = express.Router();
  Object.keys(routes).forEach((key) => {
    routes[key](router);
  })
  return router;
}
const router = combineRoutes({
  portal,
  governor
})

module.exports = router
