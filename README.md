# deps-loader

```js

// node build-levels.js # expected levels.json placed in root
const levelsDump = require('./levels.dump.json');

// ...
{
    test: /\.deps\.js$/,
    loader: 'deps-loader',
    options: {
        // resolve only techs
        techs: [
            'css'
        ],
        // array of paths all blocks of all levels
        levelsDump
    }
}
```
