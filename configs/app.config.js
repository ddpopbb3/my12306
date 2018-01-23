var config = {
  server: {
    contextPath: "",
    proxy: {
      "/ticket/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18080", // backend proxy target: protocal + host + port
        target: "http://localhost:18080/my12306-ticket",
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/pay/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18082", // backend proxy target: protocal + host + port
        target: "http://localhost:18082/my12306-pay", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/user/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18083", // backend proxy target: protocal + host + port
        target: "http://localhost:18083/my12306-user", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/passenger/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18083", // backend proxy target: protocal + host + port
        target: "http://localhost:18083/my12306-user", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/order": { //matches paths starting with /api
        // target: "http://192.168.16.246:18081", // backend proxy target: protocal + host + port
        target: "http://localhost:18081/my12306-order", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      }
    }
  }
}
module.exports = config;