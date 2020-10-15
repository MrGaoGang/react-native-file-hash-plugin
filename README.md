# react-native-file-hash-plugin

create file `hash` and `transform` asset  in react-native **bundle**! when you use `react-native run-ios/run-android`  it will not work, it is just use in `react-native bundle ...`

## Installation

**npm**

```bash
npm install --save-dev react-native-file-hash-plugin
```

**metro**

Add `react-native-file-hash-plugin` to the list of assetPlugins in your `metro.config.js` file under the transformer section.

for example :

```js
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    assetPlugins: ["react-native-file-hash-plugin"],
  },
};
```

## Configuration

You can configure the plugin behaviour through the optional `fileHashPlugin` field in your `metro.config.js` file under the `transformer` section.

For example:

```js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    assetPlugins: ["react-native-file-hash-plugin"],
  },
  fileHashPlugin: {
    // optional
    // the file type to hash,default is png,jpeg,jpg,gif
    types: ["png", "jpeg", "jpg", "gif"],
    // optional
    // the input params is file name and file path; the output is hash string ,default is react-native hash
    hashFunction: (fileName, path) => {
      return "your hash";
    },
    // optional
    // the  ignore file path regex
    ignoreRegex: null,
    // optional
    // add external options to asset, resturn must be object
    externalOptions: (fileName, path) => {
      return {
        key: "mrgaogang",
      };
    },
  },
};
```

## Output

example:

```bash
react-native bundle --entry-file index.js --bundle-output ./bundle/ios.bundle --platform ios --reset-cache --assets-dest ./bundle --dev false

```

**suggest to add `--reset-cache ` params.**

will output like this, and the file will add hash string.

```js
├─assets
│ ├─app.json
│ ├─img
│ │ └─success-c64ef9278d09de068787ded3a56ed560.png
│ └─node_modules
│   └─react-native
│     └─Libraries
└─ios.bundle

```
