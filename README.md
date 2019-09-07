# KCD Watches
"Henry comes to see us!"

Kingdom Come: Deliverance inspired watches. 

Not affiliated with Warhorse Studios.

![KCD Watches screenshot](https://i.imgur.com/RIS5p7X.png)

Output is standalone inline ***public/index.html***.

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