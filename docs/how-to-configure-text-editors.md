## How to Configure Text Editors and IDEs for React.js

> Tips and tricks on how to configure your favorite text editor or IDE to work
> with React.js/ES6+/JSX.

### SublimeText

1. Install SublimeText 3[Download link](https://www.sublimetext.com/3)
2. Linter & Snippets   
Easiest with [Package Control](https://packagecontrol.io/) and then "Package Control: Install Package" (Ctrl+Shift+P)  
2.1 Install [Package Control](https://packagecontrol.io/installation)  
2.2 Install Packages  
    * [Babel](https://packagecontrol.io/packages/Babel)
    * [Sublimelinter](http://www.sublimelinter.com/en/latest/)
    * [SublimeLinter-contrib-eslint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)
    * [SublimeLinter-contrib-stylelint](https://packagecontrol.io/packages/SublimeLinter-contrib-stylelint)
    * [Babel Snippets](https://packagecontrol.io/packages/Babel Snippets)
3. [Formatters](./formatters.md)

Set Babel as default syntax for a particular extension:

* Open a file with that extension,
* Select `View` from the menu,
* Then `Syntax` `->` `Open all with current extension as...` `->` `Babel` `->` `JavaScript (Babel)`.
* Repeat this for each extension (e.g.: .js and .jsx).

Install local npm packages
```
npm install eslint@latest
npm install babel-eslint@latest
npm install eslint-plugin-react
npm install stylelint
```
You may need to restart sublime text for changes to take effect.

### Atom

Install atom packages

* [linter](https://atom.io/packages/linter)
* [linter-eslint](https://atom.io/packages/linter-eslint)
* [linter-stylelint](https://atom.io/packages/linter-stylelint)
* [react](https://atom.io/packages/react)

```shell
apm install linter linter-eslint react linter-stylelint
```

Install local npm packages

* [eslint](https://www.npmjs.com/package/eslint)
* [babel-eslint](https://www.npmjs.com/package/babel-eslint)
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
* [stylelint](https://www.npmjs.com/package/stylelint)

```shell
npm install --save-dev eslint babel-eslint eslint-plugin-react stylelint
```

*You may need to restart atom for changes to take effect*

