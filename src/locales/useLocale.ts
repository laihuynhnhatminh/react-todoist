import en_US from 'antd/locale/en_US';
import ja_JP from 'antd/locale/ja_JP';
import { useTranslation } from 'react-i18next';

import { LocaleEnum } from '@/enums';

import type { Locale as AntdLocale } from 'antd/es/locale';

type Locale = keyof typeof LocaleEnum;
type Language = {
  locale: LocaleEnum;
  icon: string;
  label: string;
  antdLocal: AntdLocale;
};

// TODO: update with proper icon
export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocaleEnum.en_US]: {
    locale: LocaleEnum.en_US,
    label: 'English',
    icon: 'ic-locale-en-us',
    antdLocal: en_US,
  },
  [LocaleEnum.ja_JP]: {
    locale: LocaleEnum.ja_JP,
    label: 'Japanese',
    icon: 'ic-locale-ja-jp',
    antdLocal: ja_JP,
  },
};

export default function useLocale() {
  const { i18n } = useTranslation();

  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);
  };

  const locale = (i18n.resolvedLanguage || LocaleEnum.en_US) as Locale;
  const language = LANGUAGE_MAP[locale];

  return {
    locale,
    language,
    setLocale,
  };
}
