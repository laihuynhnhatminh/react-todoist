import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Typography } from 'antd';
import { CSSProperties, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { getProjectDetail, requestTodoistSyncApi } from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { IconButton, SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { CreateSectionInput, RequiredIdParam, Section, Task, TodoistSyncRequest } from '@/entities';
import { ThemeLayout, TodoistCommandTypeEnum } from '@/enums';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from '@/layouts/main/config';
import { useRequiredParams } from '@/router/hooks';
import { useProjectStore, useSettings } from '@/stores';

import SectionColumn from './components/sectionColumn';
import TaskCard from './components/taskCard';
import { useAddSection, useReorderSection } from '@/hooks';

export default function KanbanBoard() {
  const { themeLayout } = useSettings();
  const [editMode, setEditMode] = useState(false);
  const { id } = useRequiredParams<RequiredIdParam>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateSectionInput>();
  /* Styling */
  const kanbanBoardStyle: CSSProperties = {
    maxWidth: `calc(100dvw - ${themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH}px)`,
  };

  /* Query/Muation fn */
  const addSection = useAddSection();
  const reorderSection = useReorderSection();
  const { isLoading, data } = useQuery({
    queryKey: PROJECT_KEYS.project(id),
    queryFn: () => getProjectDetail(id),
  });

  const sections = useMemo(() => data?.sections || [], [data]);

  /* Dnd setup */
  const sectionIds = useMemo(() => sections.map((section) => section.id) || [], [sections]);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  /* Api Events */
  const addNewSectionMode = () => {
    setEditMode(true);
  };

  const addANewSection = (sectionName: string) => {
    setEditMode(false);
    reset();
    addSection.mutate({
      name: sectionName,
      project_id: id,
    });
  };

  /* Events */
  const onSubmit: SubmitHandler<CreateSectionInput> = (data) => addANewSection(data.sectionName);

  const onCancel = () => {
    setEditMode(false);
    reset();
  };

  const onDragStart = (event: DragStartEvent) => {
    //   // Start with blank state
    setActiveSection(null);
    //   setActiveTask(null);
    setEditMode(false);
    reset();
    if (event.active.data.current?.type === 'Section') {
      setActiveSection(event.active.data.current?.section);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current?.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const isActiveASection = active.data.current?.type === 'Section';
    const isOverASection = over.data.current?.type === 'Section';
    const activeSectionId = active.id;
    const overSectionId = over.id;

    if (activeSectionId === overSectionId || !isActiveASection || !isOverASection) return;
    // Server state
    reorderSection.mutate({
      project_id: id,
      args: {
        sections: [
          {
            id: activeSectionId as string,
            section_order: over.data.current?.section?.section_order,
          },
          {
            id: overSectionId as string,
            section_order: active.data.current?.section?.section_order,
          },
        ],
      },
    });
  };

  // const onDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeTaskId = active.id;
  //   const overTaskId = over.id;

  //   if (activeTaskId === overTaskId) return;

  //   const isActiveATask = active.data.current?.type === 'Task';
  //   const isOverATask = over.data.current?.type === 'Task';

  //   if (!isActiveATask) return;

  //   if (isActiveATask && isOverATask) {
  //     const activeTaskIndex = projectTasks.findIndex((t) => t.id === activeTaskId);
  //     const overTaskIndex = projectTasks.findIndex((t) => t.id === overTaskId);
  //     // Update section_id if change section
  //     projectTasks[activeTaskIndex].section_id = projectTasks[overTaskIndex].section_id;
  //     const updatedTasks = arrayMove(projectTasks, activeTaskIndex, overTaskIndex);

  //     const updatedSections = projectSections.map((section: Section) => {
  //       const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
  //       section.tasks = sectionTasks;
  //       return section;
  //     });

  //     setSections(updatedSections, updatedTasks);
  //     // API CALL TO UPDATE TASK ORDER
  //     return;
  //   }

  //   const isOverAColumn = over.data.current?.type === 'Section';

  //   if (isOverAColumn) {
  //     const activeTaskIndex = projectTasks.findIndex((t) => t.id === activeTaskId);
  //     projectTasks[activeTaskIndex].section_id = overTaskId as string;
  //     const updatedTasks = arrayMove(projectTasks, activeTaskIndex, activeTaskIndex);

  //     const updatedSections = projectSections.map((section: Section) => {
  //       const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
  //       section.tasks = sectionTasks;
  //       return section;
  //     });
  //     setSections(updatedSections, updatedTasks);
  //     // API CALL TO UPDATE TASK ORDER
  //   }
  // };

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="flex max-h-min flex-col overflow-hidden" style={kanbanBoardStyle}>
      <div className="flex flex-row justify-between">
        <Typography.Title className="flex flex-grow" level={3}>
          {data?.project.name}
        </Typography.Title>
        <IconButton className="flex">
          <SvgIcon icon="ic-plus" size={20} />
        </IconButton>
      </div>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
        sensors={sensors}
        collisionDetection={pointerWithin}
      >
        <div className="m-4 flex flex-row justify-start gap-4 overflow-auto">
          <div className="flex h-full gap-6">
            <SortableContext strategy={horizontalListSortingStrategy} items={sectionIds}>
              {sections.map((section) => (
                <SectionColumn key={section.id} section={section} />
              ))}
            </SortableContext>
            {!editMode && (
              <IconButton
                onClick={addNewSectionMode}
                className="mt-4 flex h-[40px] w-[350px] min-w-[350px] cursor-pointer items-center justify-center gap-2 rounded-lg p-4"
              >
                <SvgIcon icon="ic-plus" size={20} /> Add Section
              </IconButton>
            )}
            {editMode && (
              <form
                className="flex h-[150px] w-[350px] min-w-[350px] flex-col gap-2 rounded-lg p-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  className="flex h-[40px] w-full rounded-lg p-2 outline-none focus:border focus:border-blue"
                  {...register('sectionName', {
                    required: true,
                  })}
                />
                {errors.sectionName && <span className="text-xs">This field is required</span>}

                <div className="flex flex-row gap-4 p-2">
                  <input
                    className="cursor-pointer rounded-lg bg-blue px-4 py-2 hover:opacity-70 disabled:cursor-default disabled:opacity-50"
                    type="submit"
                    disabled={!isValid}
                  />
                  <input
                    onClick={onCancel}
                    className="cursor-pointer rounded-lg border border-blue px-4 py-2 hover:bg-gray-200"
                    type="button"
                    value="Cancel"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeSection && <SectionColumn section={activeSection} />}
            {/* {activeTask && <TaskCard task={activeTask} />} */}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
