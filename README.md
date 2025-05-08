# @spichkens/eslint-plugin-i18n-keys

## Installation

First, make sure you have [ESlint](https://www.npmjs.com/package/eslint) installed:
```bash
npm i --save-dev eslint
```

After that install `@spichkens/eslint-plugin-i18n-keys` plugin:
```bash
npm install --save-dev @spichkens/eslint-plugin-i18n-keys
```

## Usage

Example config:

```js
export default {
  plugins: ['@spichkens/i18n-keys'],
  rules: {
    '@spichkens/i18n-keys/no-missing-i18n-key': ['error', {
      localesPath: 'public/locales',
      defaultLocale: 'en',
      defaultNamespace: 'common'
    }]
  }
};

```

`localesPath` - Path to your locales folder relative to the eslint config file (default: public/locales)

`defaultLocale` - Default translations files folder name (default: en)

`defaultNamespace` - Default namespace name (default: common)