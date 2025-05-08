# eslint-i18n-checker-plugin

## Installation

First, make sure you have [ESlint](https://www.npmjs.com/package/eslint) installed:
```bash
npm i --save-dev eslint
```

After that install `eslint-plugin-i18n-keys` plugin:
```bash
npm install --save-dev eslint-plugin-i18n-keys
```

## Usage

Example config:

```js
export default {
  plugins: ['i18n-keys'],
  rules: {
    'i18n-keys/no-missing-i18n-keys': ['error', {
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