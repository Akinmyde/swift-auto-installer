# swift-auto-installer

Auto watch and install dependencies when your teammate add changes to the package.json

# Install

```sh
npm install swift-auto-installer --save-dev
```

# Usage

## CLI Usage
```sh
run swift-watch from your terminal
```

## Hooking with your server

It can be used with nodemon or node to check your packages before starting the server to do that add the following to your package.json
```js
// package.json
"start": "swift-watch && node server.js"
```

## Hooking with test

```js
// package.json
"test": "swift-watch && test server.js" // change this to your test script
```

## Using with husky
```js
// package.json
{
  "husky": {
    "hooks": {
      "pre-push": "swift watch",
      "...": "..."
    }
  }
}
```

## Options
`--yarn`    Use [yarn](https://yarnpkg.com) instead of npm

#### Show your support

:star: this repo
