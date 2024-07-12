import { ThemeColorPresets, ThemeLayout, ThemeMode } from '@/enums';

export interface Settings {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  multiTab: boolean;
}
