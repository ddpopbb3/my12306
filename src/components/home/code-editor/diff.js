import React from 'react';
import { Select, Checkbox } from 'antd';
import "./editor.css";
import "whatwg-fetch";
const Option = Select.Option;
let diffEditor = "";
const createDiffEditor = () => {
  diffEditor = monaco.editor.createDiffEditor($('#js-manoco-diff-editor')[0], {
    theme: "vs-dark"
  });
  let _original;
  let _modified;
  fetch("/static/data/editor/codeEditorDemo-diff-original.txt")
    .then((response) => {
      return response.text();
    }).then((original) => {
    _original = original;
    return fetch("/static/data/editor/codeEditorDemo-diff-modified.txt");
  }).then((response) => {
    return response.text();
  }).then((modified) => {
    _modified = modified;
    diffEditor.setModel({
      original: monaco.editor.createModel(_original, 'javascript'),
      modified: monaco.editor.createModel(modified, 'javascript')
    })
  })

}
class DiffEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorThemeChanged = this.onEditorThemeChanged.bind(this);
    this.onInlineOptionChanged = this.onInlineOptionChanged.bind(this);
    this.state = {
      checked: false
    }
  }
  componentDidMount() {
    var onGotAmdLoader = () => {
      window.require.config({
        paths: {
          'vs': '/core/assets/lib/monaco-editor/min/vs'
        }
      });
      window.require(['vs/editor/editor.main'], () => {
        createDiffEditor()
      });
    };

    var loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = '/core/assets/lib/monaco-editor/min/vs/loader.js';
    loaderScript.addEventListener('load', onGotAmdLoader);
    document.body.appendChild(loaderScript);

  }
  onEditorThemeChanged(value) {
    diffEditor.updateOptions({
      'theme': value
    });
  }
  onInlineOptionChanged(e) {
    this.setState({
      checked: !this.state.checked
    }, () => {
      diffEditor.updateOptions({
        'renderSideBySide': e.target.checked ? false : true
      });
    })

  }
  render() {
    return (<div>
              <h3>Diff Editor</h3>
              <div>
                <span style={ { marginRight: "10px" } }>Theme</span>
                <Select defaultValue="vs-dark" style={ { width: 200, marginRight: "10px" } } onChange={ this.onEditorThemeChanged }>
                  <Option value="vs-dark">Visual Studio Dark</Option>
                  <Option value="vs">Visual Studio</Option>
                  <Option value="hc-black">High Contrast Dark</Option>
                </Select>
                <Checkbox checked={ this.state.checked } onChange={ this.onInlineOptionChanged }>
                  Inline
                </Checkbox>
              </div>
              <div id="js-manoco-diff-editor"></div>
            </div>);
  }
}

export default DiffEditor;
