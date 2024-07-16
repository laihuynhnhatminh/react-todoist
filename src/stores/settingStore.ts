import { create } from 'zustand';

import { Settings } from '@/entities';
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '@/enums';
import { getItem, removeItem, setItem } from '@/utils/storage';

type SettingStore = {
  settings: Settings;
  actions: {
    setSettings: (settings: Settings) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>((set) => ({
  settings: getItem<Settings>(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeLayout: ThemeLayout.Vertical,
    themeMode: ThemeMode.Light,
  },
  actions: {
    setSettings: (settings) => {
      set({ settings });
      setItem(StorageEnum.Settings, settings);
    },
    clearSettings: () => removeItem(StorageEnum.Settings),
  },
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
