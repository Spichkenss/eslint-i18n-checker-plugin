# eslint-i18n-checker-plugin

## Installation

First, make sure you have [ESlint](https://www.npmjs.com/package/eslint) installed:
```bash
npm i --save-dev eslint
```

After that install `eslint-plugin-i18n-key-checker` plugin:
```bash
npm install --save-dev eslint-plugin-i18n-key-checker
```

## Usage

Example config:

```js
export default {
  plugins: ['i18n-checker'],
  rules: {
    'i18n-checker/json-key-exists': ['error', {
      localesPath: 'public/locales',
      defaultLocale: 'en',
      defaultNamespace: 'common'
    }]
  }
};

```

`localesPath` - Path to your locales folder relative to the eslint config file (default: public/locales) \
`defaultLocale` - Default translations files folder name (default: en) \
`defaultNamespace` - Default namespace name (default: common)