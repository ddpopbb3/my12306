var pages = [{
  id: "home",
  urlPath: "home",
  pages: [{
    id: "home-root1",
    urlPath: "",
    page: "pages/index.html",
    name: ""
  }]
}, {
  id: "login",
  urlPath: "login",
  pages: [{
    id: "login-root1",
    urlPath: "",
    page: "pages/login/login.html",
    name: ""
  }]
}, {
  id: "signup",
  urlPath: "signup",
  pages: [{
    id: "signup-root1",
    urlPath: "",
    page: "pages/signup/signup.html",
    name: ""
  }]
}, {
  id: "home_admin",
  urlPath: "admin",
  navbar: {
    layout: "tree"
  },
  pages: [{
    id: "admin_platform_buy_ticket",
    name: "车票预订",
    urlPath: "booktickets",
    page: "pages/admin/ticket/ticketList.html"
  }, {
    id: "admin_platform_query_ticket",
    name: "余票查询",
    urlPath: "querytickets",
    page: "pages/admin/ticket/ticketList.html"
  }, {
    id: "admin_platform_order",
    name: "订单管理",
    urlPath: "ordermgr",
    page: "pages/admin/ordermgr/orderList.html"
  }, {
    id: "admin_platform_passenger",
    name: "乘客管理",
    urlPath: "platformpassenger",
    page: "pages/admin/passenger/passengerList.html"
  },{
    id: "admin_platform_book_ticket",
    //nameme: "用户注册",
    urlPath: "bookticket",
    page: "pages/admin/ticket/bookTicket.html"
  }]
}];
var config = {
  pages: pages,
  defaultPage: 0
};
module.exports = config;
