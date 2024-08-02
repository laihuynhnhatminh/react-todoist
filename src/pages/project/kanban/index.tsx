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

import {
  getProjectDetail,
  requestTodoistSyncApi,
  requestTodoistSyncApiWithTempId,
} from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { IconButton, SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { CreateSectionInput, RequiredIdParam, Section, Task, TodoistSyncRequest } from '@/entities';
import { ThemeLayout, TodoistCommandTypeEnum } from '@/enums';
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from '@/layouts/main/config';
import { useRequiredParams } from '@/router/hooks';
import { useProjectStore, useSettings } from '@/stores';
import { useProjectStoreActions } from '@/stores/projectStore';

import SectionColumn from './components/sectionColumn';
import TaskCard from './components/taskCard';

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
  const { sections, projects } = useProjectStore();
  const { setSections, setProject, setTasks } = useProjectStoreActions();
  /* Styling */
  const kanbanBoardStyle: CSSProperties = {
    maxWidth: `calc(100dvw - ${themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH}px)`,
  };

  /* Query/Muation fn */
  const { isLoading } = useQuery({
    queryKey: PROJECT_KEYS.project(id),
    queryFn: async () => {
      const projectDetail = await getProjectDetail(id);
      setProject(projectDetail.project);
      setSections(projectDetail.sections, projectDetail.items);
      setTasks(projectDetail.items);
      return projectDetail;
    },
  });

  const project = projects.get(id);
  const projectSections = useMemo(() => {
    return sections.get(id) || [];
  }, [sections, id]);
  const projectTasks = projectSections.map((s) => s.tasks).flat();

  const addSection = useMutation({
    mutationFn: (request: TodoistSyncRequest) =>
      requestTodoistSyncApiWithTempId(request.type, request.args),
  });

  const updateSectionOrder = useMutation({
    mutationFn: (request: TodoistSyncRequest) => requestTodoistSyncApi(request.type, request.args),
  });

  /* Dnd setup */
  const sectionIds = useMemo(() => projectSections.map((section) => section.id), [projectSections]);
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
    addSection.mutate(
      {
        type: TodoistCommandTypeEnum.SECTION_ADD,
        args: {
          name: sectionName,
          project_id: project?.id,
        },
      },
      {
        onSuccess: (data, variables) => {
          const newSectionId = Object.values(data.temp_id_mapping)[0];
          const newSection: Section = {
            id: newSectionId,
            project_id: project?.id as string,
            // eslint-disable-next-line no-unsafe-optional-chaining
            section_order: projectSections[projectSections.length - 1]?.section_order + 1 || 1,
            name: variables.args.name as string,
            tasks: [],
          };
          setSections([...projectSections, newSection], projectTasks);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  /* Events */
  const onSubmit: SubmitHandler<CreateSectionInput> = (data) => addANewSection(data.sectionName);

  const onCancel = () => {
    setEditMode(false);
    reset();
  };

  const onDragStart = (event: DragStartEvent) => {
    // Start with blank state
    setActiveSection(null);
    setActiveTask(null);
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

    const activeSectionIndex = projectSections.findIndex(
      (section) => section.id === activeSectionId,
    );
    const overSecitonIndex = projectSections.findIndex((section) => section.id === overSectionId);
    const updatedSections = arrayMove(projectSections, activeSectionIndex, overSecitonIndex);
    // Local state
    setSections(updatedSections, projectTasks);
    // Server state
    updateSectionOrder.mutate(
      {
        type: TodoistCommandTypeEnum.SECTION_REORDER,
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
      },
      {
        onError: (error) => {
          console.error(error);

          const defaultSections = arrayMove(updatedSections, overSecitonIndex, activeSectionIndex);
          setSections(defaultSections, projectTasks);
        },
      },
    );
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const activeTaskIndex = projectTasks.findIndex((t) => t.id === activeTaskId);
      const overTaskIndex = projectTasks.findIndex((t) => t.id === overTaskId);
      // Update section_id if change section
      projectTasks[activeTaskIndex].section_id = projectTasks[overTaskIndex].section_id;
      const updatedTasks = arrayMove(projectTasks, activeTaskIndex, overTaskIndex);

      const updatedSections = projectSections.map((section: Section) => {
        const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
        section.tasks = sectionTasks;
        return section;
      });

      setSections(updatedSections, updatedTasks);
      // API CALL TO UPDATE TASK ORDER
      return;
    }

    const isOverAColumn = over.data.current?.type === 'Section';

    if (isOverAColumn) {
      const activeTaskIndex = projectTasks.findIndex((t) => t.id === activeTaskId);
      projectTasks[activeTaskIndex].section_id = overTaskId as string;
      const updatedTasks = arrayMove(projectTasks, activeTaskIndex, activeTaskIndex);

      const updatedSections = projectSections.map((section: Section) => {
        const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
        section.tasks = sectionTasks;
        return section;
      });
      setSections(updatedSections, updatedTasks);
      // API CALL TO UPDATE TASK ORDER
    }
  };

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="flex max-h-min flex-col overflow-hidden" style={kanbanBoardStyle}>
      <div className="flex flex-row justify-between">
        <Typography.Title className="flex flex-grow" level={3}>
          {project?.name}
        </Typography.Title>
        <IconButton className="flex">
          <SvgIcon icon="ic-plus" size={20} />
        </IconButton>
      </div>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
        collisionDetection={pointerWithin}
      >
        <div className="m-4 flex flex-row justify-start gap-4 overflow-auto">
          <div className="flex h-full gap-6">
            <SortableContext strategy={horizontalListSortingStrategy} items={sectionIds}>
              {projectSections.map((section) => (
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
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
