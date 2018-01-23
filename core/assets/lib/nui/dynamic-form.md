# Dynamic Form
  
## Usage
  
    ...

## Value Provider
  
For combobox, checkboxlist, radiobuttonlist
  
    {
        "multiSelect": false,
        "valueField": "value",
        "textField": "text",
        "url": "cd/deploy/environments"
    }

    {
        "multiSelect": false,
        "valueField": "value",
        "textField": "text",
        "data": "en_US, en_UK, zh_CN, zh_TW"
    }

    {
        "multiSelect": false,
        "valueField": "value",
        "textField": "text",
        "data": [{
            "value": "英文（美国）",
            "text": "en_US"
        }, {
            "value": "英文（英国）",
            "text": "en_UK"
        }, {
            "value": "中文（中国）",
            "text": "zh_CN"
        }, {
            "value": "中文（台湾）",
            "text": "zh_TW"
        }]
    }

### Simple Data (Value equals Text)
  
`en_US,en_UK,zh_CN,zh_TW`  
  
### JSON Data
  
    [{
        "value": "英文（美国）",
        "text": "en_US"
    }, {
        "value": "英文（英国）",
        "text": "en_UK"
    }, {
        "value": "中文（中国）",
        "text": "zh_CN"
    }, {
        "value": "中文（台湾）",
        "text": "zh_TW"
    }]
