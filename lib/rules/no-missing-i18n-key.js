const { getTranslationKeys } = require('../utils/load-keys');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: `Предупреждает, если i18n-ключ в t(...) или <Trans i18nKey="..."> отсутствует в файлах переводов.`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          localesPath: { type: 'string' },
          defaultLocale: { type: 'string' },
          defaultNamespace: { type: 'string' },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const localesPath = options.localesPath || 'public/locales';
    const defaultLocale = options.defaultLocale || 'en';
    const defaultNamespace = options.defaultNamespace || 'common';

    const checkKey = (key, namespace, node) => {
      const keys = getTranslationKeys(localesPath, namespace, defaultLocale);
      if (!keys.has(key)) {
        context.report({
          node,
          message: `Отсутствует i18n-ключ '${key}' в namespace '${namespace}' для локали '${defaultLocale}'.`,
        });
      }
    };

    return {
      CallExpression(node) {
        if (
          node.callee.name === 't' &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'Literal'
        ) {
          let rawKey = node.arguments[0].value; // значение строки
          let namespace = defaultNamespace;
          let actualKey = rawKey;

          // Проверка: второй аргумент — объект с ns
          if (
            node.arguments[1] &&
            node.arguments[1].type === 'ObjectExpression'
          ) {
            const nsProp = node.arguments[1].properties.find(
              (p) => p.key?.name === 'ns' && p.value?.type === 'Literal'
            );

            if (nsProp) {
              namespace = nsProp.value.value;
            }
          } else {
            // Альтернатива: ключ содержит namespace в формате "namespace:key"
            const colonIndex = rawKey.indexOf(":");
            if (colonIndex !== -1) {
              namespace = rawKey.substring(0, colonIndex);    // часть до ":"
              actualKey = rawKey.substring(colonIndex + 1);   // часть после ":"
            }
          }

          checkKey(actualKey, namespace, node);
        }
      },


      JSXOpeningElement(node) {
        if (node.name.name !== 'Trans') return;

        const i18nKeyAttr = node.attributes.find(
          (attr) => attr.name?.name === 'i18nKey'
        );

        if (i18nKeyAttr?.value?.type === 'Literal') {
          const key = i18nKeyAttr.value.value;
          let namespace = defaultNamespace;

          const nsAttr = node.attributes.find(
            (attr) => attr.name?.name === 'ns'
          );

          if (nsAttr?.value?.type === 'Literal') {
            namespace = nsAttr.value.value;
          }

          checkKey(key, namespace, node);
        }
      },
    };
  },
};
