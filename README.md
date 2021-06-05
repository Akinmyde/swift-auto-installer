# swift-auto-instaler

Auto watch and install dependencies when your teammate add changes to the package.json

## Install

```sh
npm install swift-auto-instaler --save-dev
```

## Usage
It can be used with node, react, angular e.t.c to check and automaitcally install new packages added/required for your application to work. Say bye to running npm i everytime.

### Hooking with your server
```js
"start": "./node_modules/swift-auto-instaler/src/check-cli.js && node server.js" // change to your start script
```

### Hooking with test

```js
"test": "/node_modules/swift-auto-instaler/src/check-cli.js && test server.js" // change this to your test script
```

### Using with husky 
```js
{
  "husky": {
    "hooks": {
      "post-checkout": "/node_modules/swift-auto-instaler/src/check-cli.js",
      "...": "..."
    }
  }
}
```

## Options
`--yarn`    Use [yarn](https://yarnpkg.com) instead of npm

## Show your support

:star: this repo
