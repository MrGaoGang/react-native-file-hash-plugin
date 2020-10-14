# react-native-img-hash-plugin

create image hash in react-native!

## Installation

**npm**

> npm install --save-dev react-native-img-hash-plugin

**metro**

Add `react-native-img-hash-plugin` to the list of assetPlugins in your `metro.config.js` file under the transformer section.

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
    assetPlugins: ["react-native-img-hash-plugin"],
  },
};
```

## Configuration

You can configure the plugin behaviour through the optional `imageHashPlugin` field in your `metro.config.js` file under the `transformer` section.

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
    assetPlugins: ["react-native-img-hash-plugin"],
  },
  imageHashPlugin: {
    // the image type to hash,default is png,jpeg,jpg,gif
    types: ["png", "jpeg", "jpg", "gif"],
    // the input params is image name and file path; the output is hash string
    hashFunction: (imageName, path) => {
      return "your hash";
    },
    // the  ignore image path regex
    ignoreRegex: null,
  },
};
```

## Output

example:

> react-native bundle --entry-file index.js --bundle-output ./bundle/ios.bundle --platform ios --assets-dest ./bundle --dev false

will output like this, and the image will add hash string.

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
