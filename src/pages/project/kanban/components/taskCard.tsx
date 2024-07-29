import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useState } from 'react';

import { IconButton, SvgIcon } from '@/components/icon';
import { Section, Task } from '@/entities';
import { ThemeMode } from '@/enums';
import { useProjectStore, useSettings } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

type Props = {
  readonly task: Task;
};

export default function TaskCard({ task }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { colorBgContainerDisabled } = useThemeToken();
  const { themeMode } = useSettings();
  const {
    sections,
    actions: { setSectionTasks },
  } = useProjectStore();
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  });

  const taskCardStyle: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    backgroundColor:
      themeMode === ThemeMode.Light ? colorBgContainerDisabled : 'rgba(145, 158, 171, 0.12)',
  };

  const currentSection = sections.find((section) => section.id === task.section_id) as Section;

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const updateTask = (taskId: string, data: Partial<Task>) => {
    const newTasks = currentSection?.tasks.map((task) => {
      if (task.id !== taskId) return task;

      return { ...task, ...data };
    });

    setSectionTasks(currentSection.id, newTasks);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = currentSection?.tasks.filter((task) => task.id !== taskId);

    setSectionTasks(currentSection.id, newTasks);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={taskCardStyle}
        className="relative h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-blue p-2.5 text-left opacity-50"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={taskCardStyle}
        {...attributes}
        {...listeners}
        className="relative h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue"
      >
        <textarea
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder="Enter task content here"
          value={task.content}
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, { content: e.target.value })}
          className="h-[90%] w-full resize-none rounded border-none bg-transparent focus:outline-none"
        />

        {mouseIsOver && (
          <IconButton
            onClick={() => deleteTask(task.id)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-transparent p-2 opacity-60 hover:opacity-100"
          >
            <SvgIcon icon="ic-trash" size={20} />
          </IconButton>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={taskCardStyle}
      {...attributes}
      {...listeners}
      className="relative h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-blue"
    >
      <p className="my-auto h-[90%] w-full overflow-x-hidden overflow-y-hidden whitespace-pre-wrap hover:overflow-y-auto">
        {task.content}
      </p>
      {mouseIsOver && (
        <IconButton
          onClick={() => deleteTask(task.id)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-transparent p-2 opacity-60 hover:opacity-100"
        >
          <SvgIcon icon="ic-trash" size={20} />
        </IconButton>
      )}
    </div>
  );
}
