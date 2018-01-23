import { Button, Radio, Icon } from 'antd';
import React from 'react';
import "./button.css";
class ButtonSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'default',
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }
  handleSizeChange(e) {
    this.setState({
      size: e.target.value
    });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <Radio.Group value={ size } onChange={ this.handleSizeChange }>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" shape="circle" icon="download" size={ size } />
        <Button type="primary" icon="download" size={ size }>Download</Button>
        <Button type="primary" size={ size }>Normal</Button>
        <br />
        <Button.Group size={ size }>
          <Button type="primary">
            <Icon type="left" />Backward
          </Button>
          <Button type="primary">
            Forward
            <Icon type="right" />
          </Button>
        </Button.Group>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      iconLoading: false,
      delayLoading: false,
    }
    this.enterLoading = this.enterLoading.bind(this);
    this.enterIconLoading = this.enterIconLoading.bind(this);
    this.delayLoading = this.delayLoading.bind(this);
  }

  enterLoading() {
    this.setState({
      loading: true
    });
  }

  enterIconLoading() {
    this.setState({
      iconLoading: true
    });
  }
  delayLoading() {
    this.setState({
      delayLoading: true,
    });

    setTimeout(() => this.setState({
      delayLoading: false,
    }), 150);
  }

  render() {
    return (
      <div>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={ this.state.loading } onClick={ this.enterLoading }>
          Click me!
        </Button>
        <Button type="primary" icon="poweroff" loading={ this.state.iconLoading } onClick={ this.enterIconLoading }>
          Click me!
        </Button>
        <Button type="primary" loading={ this.state.delayLoading } onClick={ this.delayLoading }>
          Won't show loading
        </Button>
        <br />
        <Button shape="circle" loading />
        <Button type="primary" shape="circle" loading />
      </div>
    );
  }
}

class ButtonSample extends React.Component {

  render() {
    return (
      <div>
        <h3>Normal Buttons</h3>
        <ButtonSize />
        <h3>Loading Buttons</h3>
        <App />
      </div>
    );
  }
}

export default ButtonSample