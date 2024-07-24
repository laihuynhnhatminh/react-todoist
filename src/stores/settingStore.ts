import { create } from 'zustand';

import { Settings } from '@/entities';
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '@/enums';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/utils/storage';

type SettingStore = {
  settings: Settings;
  actions: {
    setSettings: (settings: Settings) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>((set) => ({
  settings: getStorageItem<Settings>(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeLayout: ThemeLayout.Vertical,
    themeMode: ThemeMode.Light,
  },
  actions: {
    setSettings: (settings) => {
      set({ settings });
      setStorageItem(StorageEnum.Settings, settings);
    },
    clearSettings: () => removeStorageItem(StorageEnum.Settings),
  },
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
