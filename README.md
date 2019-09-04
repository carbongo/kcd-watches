# webpack-html-es6-less-boilerplate
Boilerplate (blank) project for HTML, JavaScript (ES6), CSS (Less). Output is standalone inline ***build/index.html***.

## Usage
### 1. Install dependencies
```npm i```
### 2. Start webpack dev server
```npm run start```
### or build 
```npm run build```

## Packaging
* ***src*** -- main source folder
* * ***scripts*** -- folder for *JavaScript*
* * * ***master.js*** -- *JavaScript* master-file
* * ***styles*** -- folder for styles (*css, less*)
* * * ***master.less*** -- *Less* master-file (imported in *JavaScript* master-file)
* * ***index.html*** -- *HTML* master-file
* ***package.json*** -- project info and dependencies list
* ***webpack.config.js*** -- webpack configuration

## To-Do
* Add ***ESLint***
* Implement automatic ***build/main.bundle.js*** disposal
