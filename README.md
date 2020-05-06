# swift-auto-instaler

Auto watch and install dependencies when your teammate add changes to the package.json

## Install

```sh
npm install swift-auto-instaler --save-dev
```

## Usage

### Hooking with your server

It can be used with nodemon or node to check your packages before starting the server to do that add the following to your package.json
```js
// package.json
"start": "swift-check && node server.js"
```

### Hooking with test

```js
// package.json
"test": "swift-check && test server.js" // change this to your test script
```

### Using with husky
```js
// package.json
{
  "husky": {
    "hooks": {
      "hook": "swift-check",
      "...": "..."
    }
  }
}
```

## Options
`--yarn`    Use [yarn](https://yarnpkg.com) instead of npm

## Show your support

:star: this repo
