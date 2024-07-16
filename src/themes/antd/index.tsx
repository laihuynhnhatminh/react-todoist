import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import { ThemeMode } from '@/enums';
import useLocale from '@/locales/useLocale';
import { useSettings } from '@/stores/settingStore';

import {
  colorPrimarys,
  customComponentConfig,
  customThemeTokenConfig,
  themeModeToken,
} from './theme';

type Props = {
  readonly children: React.ReactNode;
};

export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings();

  const { language } = useLocale();

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken[themeMode].token },
        components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        algorithm,
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
