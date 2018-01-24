var config = {
  server: {
    contextPath: "",
    proxy: {
      "/ticket/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18080", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway",
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/pay/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18082", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/uaa/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18083", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/passenger/": { //matches paths starting with /api
        // target: "http://192.168.16.246:18083", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/order": { //matches paths starting with /api
        // target: "http://192.168.16.246:18081", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      },
      "/coordinator": { //matches paths starting with /api
        // target: "http://192.168.16.246:18084", // backend proxy target: protocal + host + port
        target: "http://localhost:18085/my12306-gateway", // backend proxy target: protocal + host + port
        changeOrigin: true,
        secure: false,
        host:'127.0.0.1',
        port:'3001'
      }
    }
  }
}
module.exports = config;