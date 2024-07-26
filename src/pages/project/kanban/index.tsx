import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useQueries } from '@tanstack/react-query';
import { Typography } from 'antd';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { getProjectDetail, getSections } from '@/api/services';
import { PROJECT_KEYS, SECTION_KEYS } from '@/api/shared/queryKeys';
import { IconButton, SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { RequiredIdParam, Section, Task } from '@/entities';
import { useRequiredParams } from '@/router/hooks';
import { useProjectStore } from '@/stores';
import { useProjectStoreActions } from '@/stores/projectStore';

import SectionColumn from './components/sectionColumn';
import TaskCard from './components/taskCard';

export default function KanbanBoard() {
  const { id } = useRequiredParams<RequiredIdParam>();
  const { sections, project } = useProjectStore();
  const { setSections, setProject } = useProjectStoreActions();

  /* Query/Muation fn */
  const { isLoading } = useQueries({
    queries: [
      {
        queryKey: PROJECT_KEYS.project(id),
        queryFn: async () => {
          const projectDetail = await getProjectDetail(id);
          setProject(projectDetail);
          return projectDetail;
        },
      },
      {
        queryKey: SECTION_KEYS.sectionOfProject(id),
        queryFn: async () => {
          const sections = await getSections(id);
          setSections(sections);
          return sections;
        },
      },
    ],
    combine: (res) => ({
      sections: res[1].data ?? [],
      isLoading: res.some((r) => r.isLoading),
    }),
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

    const activeSectionId = active.id;
    const overSectionId = over.id;

    if (activeSectionId === overSectionId) return;

    const activeSectionIndex = sections.findIndex((section) => section.id === activeSectionId);
    const overSecitonIndex = sections.findIndex((section) => section.id === overSectionId);

    const updatedSections = arrayMove(sections, activeSectionIndex, overSecitonIndex);
    setSections(updatedSections);
  };

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="flex flex-col">
      <Typography.Title level={3}>{project?.name}</Typography.Title>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
        <div className="m-4 flex flex-row justify-start gap-4">
          <div className="flex gap-6">
            <SortableContext items={sectionIds}>
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
