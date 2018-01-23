const portal = (router) => {
  router.route('/captcha').get((req, res) => {
    res.json("" + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10));
  });

}
module.exports = portal
