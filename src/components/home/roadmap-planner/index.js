import Gantt from "core/assets/lib/euler-gantt/bundle";
import "core/assets/lib/euler-gantt/bundle.css";
import ReactDOM from "react-dom";
import React from 'react';


const initGantt = (dom) => {
  Gantt.init({
    el: dom,
    data: [{
      name: "M1",
      id: "m1",
      items: [{
        name: "M1-1",
        id: "m1_1",
        schedules: [{
          id: "m1_1_s1",
          name: "M1-1 Schedule 1",
          dates: ["2017-02-01", "2017-02-05"]
        }, {
          id: "m1_1_s2",
          name: "M1-1 Schedule 2",
          dates: ["2017-02-06", "2017-02-09"]
        }, {
          id: "m1_1_s3",
          name: "M1-1 Schedule 3",
          dates: ["2017-02-11", "2017-02-21"]
        }]
      }, {
        name: "M1-2",
        id: "m1_2",
        schedules: [{
          id: "m1_2_s1",
          name: "M1-2 Schedule 1",
          dates: ["2017-02-01", "2017-02-11"]
        }]
      }]
    }, {
      name: "M2",
      id: "m2",
      schedules: [{
        id: "m2_s1",
        name: "M2 Schedule 1",
        dates: ["2017-02-01", "2017-02-05"]
      }, {
        id: "m2_s2",
        name: "M2 Schedule 2",
        dates: ["2017-02-06", "2017-02-09"]
      }, {
        id: "m2_s3",
        name: "M2 Schedule 3",
        dates: ["2017-02-11", "2017-02-21"]
      }]
    }, {
      name: "M3",
      id: "m3",
      schedules: [{
        id: "m3_s1",
        name: "M3 Schedule 1",
        dates: ["2017-02-06", "2017-03-21"]
      }]
    }]
  });
}
class App extends React.Component {
  componentDidMount() {
    console.warn("App componentDidMount");
    initGantt(ReactDOM.findDOMNode(this));
  }
  componentDidUpdate(prevProps, prevState) {
    console.warn("App componentDidUpdate");
    initGantt(ReactDOM.findDOMNode(this));
  }
  render() {
    return <div></div>
  }
}

export default App
