import React from 'react';
import { Select } from 'antd';
import "./editor.css";
import "whatwg-fetch";
const Option = Select.Option;
const EDITOR_OPTIONS = [{
  "id": "javascript",
  "text": "JavaScript"
}, {
  "id": "html",
  "text": "HTML"
}, {
  "id": "css",
  "text": "CSS"
}, {
  "id": "java",
  "text": "Java"
}, {
  "id": "go",
  "text": "Go"
}, {
  "id": "sql",
  "text": "SQL"
}, {
  "id": "typescript",
  "text": "TypeScript"
}]
const createEditor = () => {
  fetch("/static/data/editor/codeEditorDemo-java.txt")
    .then((response) => {
      return response.text();
    }).then((contentText) => {
    monaco.editor.create($('#js-manoco-editor')[0], {
      value: contentText,
      language: "java",
      theme: "vs-dark"
    });
  })

}
class DiffEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorThemeChanged = this.onEditorThemeChanged.bind(this);
    this.onEditorOptionChanged = this.onEditorOptionChanged.bind(this);
  }
  componentDidMount() {
    var onGotAmdLoader = () => {
      window.require.config({
        paths: {
          'vs': '/core/assets/lib/monaco-editor/min/vs'
        }
      });
      window.require(['vs/editor/editor.main'], () => {
        createEditor()
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
  onEditorOptionChanged(value) {
    fetch("/static/data/codeEditorDemo-" + value + ".txt").then((response) => {
      return response.text();
    }).then((contentText) => {
      var oldModel = displayEditor.getModel();
      var newModel = monacoEditor.createModel(contentText, value);
      displayEditor.setModel(newModel);
      if (oldModel) {
        oldModel.dispose();
      }
    });
  }
  render() {
    const languages = EDITOR_OPTIONS.map((option, id) => {
      return <Option key={ id } value={ option.id }>
               { option.text }
             </Option>
    })
    return (<div>
              <h3>Diff Editor</h3>
              <div>
                <span style={ { marginRight: "10px" } }>Language</span>
                <Select defaultValue="vs-dark" style={ { width: 200, marginRight: "10px" } } onChange={ this.onEditorOptionChanged }>
                  { languages }
                </Select>
                <span style={ { marginRight: "10px" } }>Theme</span>
                <Select defaultValue="vs-dark" style={ { width: 200, marginRight: "10px" } } onChange={ this.onEditorThemeChanged }>
                  <Option value="vs-dark">Visual Studio Dark</Option>
                  <Option value="vs">Visual Studio</Option>
                  <Option value="hc-black">High Contrast Dark</Option>
                </Select>
              </div>
              <div id="js-manoco-editor"></div>
            </div>);
  }
}

export default DiffEditor;
