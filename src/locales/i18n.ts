import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LocaleEnum, StorageEnum } from '@/enums';
import { getStorageStringItem } from '@/utils/storage';

import en_US from './lang/en_US';
import ja_JP from './lang/ja_JP';

const defaultLng = getStorageStringItem(StorageEnum.I18N) || LocaleEnum.en_US;

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: defaultLng,
    fallbackLng: LocaleEnum.en_US,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en_US: { translation: en_US },
      ja_JP: { translation: ja_JP },
    },
  });

export default i18n;
export const { t } = i18n;
