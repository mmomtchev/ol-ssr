# ol-ssr

This is a simple wrapper around *OpenLayers* using a monkey-patched jsdom that allows Server-Side Rendering in Node.js

It is meant to be used as a plugin for [rlayers](https://www.npmjs.com/package/rlayers)

A stand-alone test example is included in `render.test.js` and can be used as an inspiration for your own implementation.

If you want to run it, there is a transpiled version in the NPM package: `index.cjs`

## Usage

```
# Once you have rlayers installed
npm install --save ol-ssr jsdom canvas
```

It will enable the `RSSRender()` call in rlayers
