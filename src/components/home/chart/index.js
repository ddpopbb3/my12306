import React from 'react';
import Echarts from 'echarts';
import './chart.css';
import './china.js';
const initSamples = () => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = Echarts.init(document.getElementById('js-chart-line'));
  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    }, {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    }, {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410]
    }, {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320]
    }, {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart = Echarts.init(document.getElementById('js-chart-bar'));
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    series: [{
      name: '直接访问',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    }, {
      name: '邮件营销',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }, {
      name: '联盟广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    }, {
      name: '视频广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    }, {
      name: '搜索引擎',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }]
  };
  myChart.setOption(option);
  myChart = Echarts.init(document.getElementById('js-chart-pie'));
  option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
        value: 335,
        name: '直接访问'
      }, {
        value: 310,
        name: '邮件营销'
      }, {
        value: 234,
        name: '联盟广告'
      }, {
        value: 135,
        name: '视频广告'
      }, {
        value: 1548,
        name: '搜索引擎'
      }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  myChart.setOption(option);
  myChart = Echarts.init(document.getElementById('js-chart-radar'));
  option = {
    title: {
      text: '自定义雷达图'
    },
    legend: {
      data: ['图一', '图二', '张三', '李四']
    },
    radar: [
      {
        indicator: [{
          text: '指标一'
        }, {
          text: '指标二'
        }, {
          text: '指标三'
        }, {
          text: '指标四'
        }, {
          text: '指标五'
        }],
        center: ['25%', '50%'],
        radius: 120,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        name: {
          formatter: '【{value}】',
          textStyle: {
            color: '#72ACD1'
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(114, 172, 209, 0.2)', 'rgba(114, 172, 209, 0.4)',
              'rgba(114, 172, 209, 0.6)', 'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      }, {
        indicator: [{
          text: '语文',
          max: 150
        }, {
          text: '数学',
          max: 150
        }, {
          text: '英语',
          max: 150
        }, {
          text: '物理',
          max: 120
        }, {
          text: '化学',
          max: 108
        }, {
          text: '生物',
          max: 72
        }],
        center: ['75%', '50%'],
        radius: 120
      }],
    series: [{
      name: '雷达图',
      type: 'radar',
      itemStyle: {
        emphasis: {
          // color: 各异,
          lineStyle: {
            width: 4
          }
        }
      },
      data: [{
        value: [100, 8, 0.40, -80, 2000],
        name: '图一',
        symbol: 'rect',
        symbolSize: 5,
        lineStyle: {
          normal: {
            type: 'dashed'
          }
        }
      }, {
        value: [60, 5, 0.30, -100, 1500],
        name: '图二',
        areaStyle: {
          normal: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      }]
    }, {
      name: '成绩单',
      type: 'radar',
      radarIndex: 1,
      data: [{
        value: [120, 118, 130, 100, 99, 70],
        name: '张三',
        label: {
          normal: {
            show: true,
            formatter: function(params) {
              return params.value;
            }
          }
        }
      }, {
        value: [90, 113, 140, 30, 70, 60],
        name: '李四',
        areaStyle: {
          normal: {
            opacity: 0.9,
            color: new Echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
              color: '#B8D3E4',
              offset: 0
            }, {
              color: '#72ACD1',
              offset: 1
            }])
          }
        }
      }]
    }]
  }
  myChart.setOption(option);

  myChart = Echarts.init(document.getElementById('js-chart-china'));
  const locations = [{
    name: '上海',
    coord: [121.472644, 31.231706]
  }, {
    name: '北京',
    coord: [116.405285, 39.904989]
  }, {
    name: '广东',
    coord: [113.280637, 23.839463714285714]
  }];
  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    series: [{
      name: '中国',
      type: 'map',
      mapType: 'china',
      selectedMode: 'multiple',
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      }
    }]
  };
  myChart.setOption(option);

  myChart = Echarts.init(document.getElementById('js-chart-dashboard'));
  option = {
    backgroundColor: '#1b1b1b',
    tooltip: {
      formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    series: [{
      name: '速度',
      type: 'gauge',
      min: 0,
      max: 220,
      splitNumber: 11,
      radius: '50%',
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
          width: 3,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisLabel: { // 坐标轴小标记
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisTick: { // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      splitLine: { // 分隔线
        length: 25, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      pointer: { // 分隔线
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontSize: 20,
          fontStyle: 'italic',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      detail: {
        backgroundColor: 'rgba(30,144,255,0.8)',
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5,
        offsetCenter: [0, '50%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          color: '#fff'
        }
      },
      data: [{
        value: 40,
        name: 'km/h'
      }]
    }, {
      name: '转速',
      type: 'gauge',
      center: ['25%', '55%'], // 默认全局居中
      radius: '30%',
      min: 0,
      max: 7,
      endAngle: 45,
      splitNumber: 7,
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
          width: 2,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisLabel: { // 坐标轴小标记
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisTick: { // 坐标轴小标记
        length: 12, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      splitLine: { // 分隔线
        length: 20, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        width: 5,
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        offsetCenter: [0, '-30%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          fontStyle: 'italic',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      detail: {
        // backgroundColor: 'rgba(30,144,255,0.8)',
        // borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5,
        width: 80,
        height: 30,
        offsetCenter: [25, '20%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          color: '#fff'
        }
      },
      data: [{
        value: 1.5,
        name: 'x1000 r/min'
      }]
    }, {
      name: '油表',
      type: 'gauge',
      center: ['75%', '50%'], // 默认全局居中
      radius: '30%',
      min: 0,
      max: 2,
      startAngle: 135,
      endAngle: 45,
      splitNumber: 2,
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
          width: 2,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisTick: { // 坐标轴小标记
        length: 12, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisLabel: {
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        },
        formatter: function(v) {
          switch (v + '') {
            case '0':
              return 'E';
            case '1':
              return 'Gas';
            case '2':
              return 'F';
          }
        }
      },
      splitLine: { // 分隔线
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        width: 2,
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        show: false
      },
      detail: {
        show: false
      },
      data: [{
        value: 0.5,
        name: 'gas'
      }]
    }, {
      name: '水表',
      type: 'gauge',
      center: ['75%', '50%'], // 默认全局居中
      radius: '30%',
      min: 0,
      max: 2,
      startAngle: 315,
      endAngle: 225,
      splitNumber: 2,
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
          width: 2,
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      axisTick: { // 坐标轴小标记
        show: false
      },
      axisLabel: {
        textStyle: { // 属性lineStyle控制线条样式
          fontWeight: 'bolder',
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        },
        formatter: function(v) {
          switch (v + '') {
            case '0':
              return 'H';
            case '1':
              return 'Water';
            case '2':
              return 'C';
          }
        }
      },
      splitLine: { // 分隔线
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          width: 3,
          color: '#fff',
          shadowColor: '#fff', // 默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        width: 2,
        shadowColor: '#fff', // 默认透明
        shadowBlur: 5
      },
      title: {
        show: false
      },
      detail: {
        show: false
      },
      data: [{
        value: 0.5,
        name: 'gas'
      }]
    }]
  };
  myChart.setOption(option);
  setInterval(function() {
    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    option.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
    option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
    option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
    myChart.setOption(option);
  }, 2000)
}
class ChartSample extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    initSamples();
  }
  render() {
    return (
      <div>
        <h3>折线图</h3>
        <div id="js-chart-line"></div>
        <h3>柱状图</h3>
        <div id="js-chart-bar"></div>
        <h3>饼图</h3>
        <div id="js-chart-pie"></div>
        <h3>雷达图</h3>
        <div id="js-chart-radar"></div>
        <h1>高级</h1>
        <h3>中国地图</h3>
        <div id="js-chart-china"></div>
        <h3>仪表盘</h3>
        <div id="js-chart-dashboard"></div>
      </div>
    );
  }
}
export default ChartSample
