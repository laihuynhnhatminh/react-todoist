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
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { getProjectDetail, updateSectionOrders } from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { IconButton, SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { RequiredIdParam, Section, Task, TodoistSectionArg } from '@/entities';
import { TodoistCommandTypeEnum } from '@/enums';
import { useRequiredParams } from '@/router/hooks';
import { useProjectStore } from '@/stores';
import { useProjectStoreActions } from '@/stores/projectStore';

import SectionColumn from './components/sectionColumn';
import TaskCard from './components/taskCard';

export default function KanbanBoard() {
  const { id } = useRequiredParams<RequiredIdParam>();
  const { sections, project, tasks } = useProjectStore();
  const { setSectionTasks, setSections, setProject, setTasks } = useProjectStoreActions();

  /* Query/Muation fn */
  const { isLoading } = useQuery({
    queryKey: PROJECT_KEYS.project(id),
    queryFn: async () => {
      const projectDetail = await getProjectDetail(id);
      setProject(projectDetail.project);
      setTasks(projectDetail.items);
      setSections(projectDetail.sections);

      projectDetail.sections.forEach((section: Section) => {
        const sectionTasks = projectDetail.items.filter(
          (task: Task) => task.section_id === section.id,
        );
        setSectionTasks(section.id, sectionTasks);
      });
      return projectDetail;
    },
  });

  const updateSectionOrder = useMutation({
    mutationFn: (sectionsArgs: TodoistSectionArg[]) =>
      updateSectionOrders([
        {
          type: TodoistCommandTypeEnum.SECTION_REORDER,
          uuid: uuidv4().toString(),
          args: {
            sections: sectionsArgs,
          },
        },
      ]),
  });

  /* Dnd setup */
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
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
  const addNewSection = () => {
    console.log('Adding a new column');
  };

  /* Events */
  const onDragStart = (event: DragStartEvent) => {
    // Start with blank state
    setActiveSection(null);
    setActiveTask(null);

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
    const activeSectionId = active.id;
    const overSectionId = over.id;

    if (activeSectionId === overSectionId || !isActiveASection) return;

    const activeSectionIndex = sections.findIndex((section) => section.id === activeSectionId);
    const overSecitonIndex = sections.findIndex((section) => section.id === overSectionId);
    const updatedSections = arrayMove(sections, activeSectionIndex, overSecitonIndex);
    // Local state
    setSections(updatedSections);
    // Server state
    updateSectionOrder.mutate(
      [
        { id: activeSectionId as string, section_order: over.data.current?.section?.section_order },
        { id: overSectionId as string, section_order: active.data.current?.section?.section_order },
      ],
      {
        onError: (error) => {
          console.error(error);

          const defaultSections = arrayMove(updatedSections, overSecitonIndex, activeSectionIndex);
          setSections(defaultSections);
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
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeTaskId);
      const overTaskIndex = tasks.findIndex((t) => t.id === overTaskId);
      // Update section_id if change section
      tasks[activeTaskIndex].section_id = tasks[overTaskIndex].section_id;
      const updatedTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);

      setTasks(updatedTasks);
      sections.forEach((section: Section) => {
        const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
        setSectionTasks(section.id, sectionTasks);
      });

      return;
    }

    const isOverAColumn = over.data.current?.type === 'Section';

    if (isOverAColumn) {
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeTaskId);
      tasks[activeTaskIndex].section_id = overTaskId as string;
      const updatedTasks = arrayMove(tasks, activeTaskIndex, activeTaskIndex);

      setTasks(updatedTasks);
      sections.forEach((section: Section) => {
        const sectionTasks = updatedTasks.filter((task: Task) => task.section_id === section.id);
        setSectionTasks(section.id, sectionTasks);
      });
    }
  };

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="flex flex-col">
      <Typography.Title level={3}>{project?.name}</Typography.Title>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
        collisionDetection={pointerWithin}
      >
        <div className="m-4 flex flex-row justify-start gap-4">
          <div className="flex gap-6">
            <SortableContext strategy={horizontalListSortingStrategy} items={sectionIds}>
              {sections.map((section) => (
                <SectionColumn key={section.id} section={section} />
              ))}
            </SortableContext>
            <IconButton
              onClick={addNewSection}
              className="mt-4 flex h-[40px] w-[350px] min-w-[350px] cursor-pointer items-center justify-center gap-2 rounded-lg p-4"
            >
              <SvgIcon icon="ic-plus" size={20} /> Add Section
            </IconButton>
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
