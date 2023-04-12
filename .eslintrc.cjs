module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules:{
    '@typescript-eslint/no-var-requires': 0,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  "globals": {
    "$": true,
    "require": true,
    "process": true
  },
  "env": {
    "browser": true,
    "amd": true,
    "node": true
},
};