import fs from 'fs';
import path from 'path';

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flatten(value, fullKey));
    } else {
      acc[fullKey] = true;
    }
    return acc;
  }, {});
}

const cache = new Map();

/**
 * Загружает и кэширует ключи переводов для указанного namespace и locale.
 * @param {string} basePath - Базовый путь к папке locales.
 * @param {string} namespace - Название namespace (например, 'common').
 * @param {string} locale - Локаль (например, 'en').
 * @returns {Set<string>} - Множество ключей переводов.
 */
export function getTranslationKeys(basePath, namespace, locale) {
  const key = `${locale}:${namespace}`;
  if (cache.has(key)) return cache.get(key);

  const filePath = path.resolve(basePath, locale, `${namespace}.json`);
  if (!fs.existsSync(filePath)) {
    cache.set(key, new Set()); // Избегаем повторного чтения
    return new Set();
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const flat = flatten(raw);
  const keys = new Set(Object.keys(flat));

  cache.set(key, keys);
  return keys;
}
