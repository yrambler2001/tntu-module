module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "lambdas"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    quotes: [2, "single", "avoid-escape"]
    // avoidEscape: true
  }
};