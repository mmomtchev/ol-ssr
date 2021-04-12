# ol-ssr

This is a simple wrapper around openlayers using a monkey-patched jsdom that allows Server-Side Rendering in Node.js

The current version requires that you add `"type": "module"` to `package.json` in `ol` and `ol-mapbox-style`. I am still looking for an elegant solution that does not involve transpiling.
