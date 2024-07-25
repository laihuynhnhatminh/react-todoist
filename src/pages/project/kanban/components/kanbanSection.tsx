import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IconButton, Iconify } from '@/components/icon';
import { Section } from '@/entities';
import { ThemeMode } from '@/enums';
import { useSettings } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

type Props = {
  section: Section;
  deleteSection: (sectionId: string) => void;
};

export default function KanbanSection({ section, deleteSection }: Props) {
  const { colorBgContainer, colorBgContainerDisabled, colorPrimaryBgHover } = useThemeToken();
  const { themeMode } = useSettings();

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: {
      type: 'Section',
      section,
    },
  });

  const sectionStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: themeMode === ThemeMode.Light ? colorBgContainer : 'rgba(145, 158, 171, 0.12)',
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={sectionStyle}
        className="flex h-[500px] max-h-[350px] w-[350px] flex-col rounded-2xl p-4 opacity-40"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={sectionStyle}
      className="flex h-[500px] max-h-[350px] w-[350px] cursor-grab flex-col rounded-2xl p-4"
    >
      {/* Section title */}
      <div {...attributes} {...listeners}>
        <div
          style={{
            backgroundColor:
              themeMode === ThemeMode.Light
                ? colorBgContainerDisabled
                : 'rgba(145, 158, 171, 0.12)',
            borderColor:
              themeMode === ThemeMode.Light ? colorBgContainer : 'rgba(145, 158, 171, 0.12)',
          }}
          className="flex items-center justify-between rounded-lg rounded-b-none border-4 p-3 text-sm font-bold"
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                backgroundColor:
                  themeMode === ThemeMode.Light ? colorPrimaryBgHover : 'rgba(145, 158, 171, 0.12)',
              }}
              className="flex items-center justify-center rounded-full px-2 py-1 text-sm"
            >
              {section.order}
            </div>
            {section.name}
          </div>
          <IconButton className="bg-transparent" onClick={() => deleteSection(section.id)}>
            <Iconify icon="fa6-solid:trash" size={20} />
          </IconButton>
        </div>

        {/* Section task container */}
        <div className="flex flex-grow">Content</div>
        {/* Section footer */}
        <div>Footer</div>
      </div>
    </div>
  );
}
