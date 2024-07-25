import { ThemeMode } from "@/enums";
import { useSettings } from "@/stores";
import { CSSProperties } from "react";

type Props = {
  readonly index: number;
  readonly sectionId: string;
};

export default function KanbanColumn({ index, sectionId }: Props) {
  const { themeMode } = useSettings();

  const columnStyle: CSSProperties = {
    height: '100%',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor:
      themeMode === ThemeMode.Light ? 'rgb(244, 246, 248)' : 'rgba(145, 158, 171, 0.12)',
  }

  
}
