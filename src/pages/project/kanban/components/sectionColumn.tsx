import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useMemo, useState } from 'react';

import { IconButton, SvgIcon } from '@/components/icon';
import { Section, TodoistSyncRequest, UpdateSectionDto } from '@/entities';
import { ThemeMode, TodoistCommandTypeEnum } from '@/enums';
import { useSettings } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

import { useMutation } from '@tanstack/react-query';
import { requestTodoistSyncApi } from '@/api/services';

type Props = {
  readonly section: Section;
};

export default function SectionColumn({ section }: Props) {
  const [editMode, setEditMode] = useState(false);
  const { colorBgContainer, colorBgContainerDisabled } = useThemeToken();
  const { themeMode } = useSettings();
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: {
      type: 'Section',
      section,
    },
    disabled: editMode,
  });

  const handleSectionMutationRequest = useMutation({
    mutationFn: (request: TodoistSyncRequest) => requestTodoistSyncApi(request.type, request.args),
  });

  const sectionStyle: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    backgroundColor: themeMode === ThemeMode.Light ? colorBgContainer : 'rgba(145, 158, 171, 0.12)',
  };

  const titleStyle: CSSProperties = {
    backgroundColor:
      themeMode === ThemeMode.Light ? colorBgContainerDisabled : 'rgba(145, 158, 171, 0.12)',
    borderColor: themeMode === ThemeMode.Light ? colorBgContainer : 'rgba(145, 158, 171, 0.12)',
  };

  const titleInputStyle: CSSProperties = {
    backgroundColor:
      themeMode === ThemeMode.Light ? colorBgContainerDisabled : 'rgba(145, 158, 171, 0.12)',
  };

  const updateSection = (sectionId: string, updateSectionDto: UpdateSectionDto) => {
    if (section.name === updateSectionDto.name) return;

    console.log('Update Section');
  };

  const deleteSection = () => {
    console.log('Delete Section');
  };

  const createTask = () => {
    console.log('Created Task');
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={sectionStyle}
        className="flex w-[350px] flex-col rounded-2xl p-4 opacity-40"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={sectionStyle}
      className="flex h-[78dvh] max-h-[78dvh] w-[350px] flex-col rounded-2xl p-4"
    >
      {/* Section title */}
      <div
        onClick={() => setEditMode(true)}
        style={titleStyle}
        className="m-1 flex cursor-grab items-center justify-between rounded-xl border-4 p-3 text-sm font-bold"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2">
          {!editMode && section.name}
          {editMode && (
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              style={titleInputStyle}
              defaultValue={section.name}
              className="rounded p-2 text-sm outline-none focus:border focus:border-blue"
              onBlur={(e) => {
                updateSection(section.id, { name: e.target.value });
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <IconButton
          className="bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            deleteSection();
          }}
        >
          <SvgIcon icon="ic-trash" size={20} />
        </IconButton>
      </div>

      {/* Section task container */}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        {/* <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {section.tasks?.length > 0 &&
            section.tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext> */}
      </div>
      {/* Section footer */}
      <IconButton
        onClick={createTask}
        className="h-[40px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4"
      >
        <SvgIcon icon="ic-plus" size={20} /> Add Task
      </IconButton>
    </div>
  );
}
