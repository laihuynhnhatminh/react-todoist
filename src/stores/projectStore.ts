import { clone } from 'ramda';
import { create } from 'zustand';

import { Project, Section, Task, UpdateSectionDto } from '@/entities';

type ProjectStore = {
  project: Project | null;
  sections: Section[];
  tasks: Task[];
  actions: {
    setProject: (projects: Project) => void;
    setSections: (sections: Section[]) => void;
    setTasks: (tasks: Task[]) => void;
    setSectionTasks: (sectionId: string, tasks: Task[]) => void;
    addNewSection: (section: Section) => void;
    updateSectionDetail: (sectionId: string, data: UpdateSectionDto) => void;
    removeSection: (sectionId: string) => void;
    addNewTask: (task: Task) => void;
  };
};

const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  sections: [],
  tasks: [],
  actions: {
    setProject: (project) => set(() => ({ project: clone(project) })),
    setTasks: (tasks) => set(() => ({ tasks: clone(tasks) })),
    setSections: (sections) => set(() => ({ sections: clone(sections) })),
    setSectionTasks: (sectionId, tasks) =>
      set((state) => ({
        sections:
          state.sections.map((section) =>
            section.id === sectionId ? { ...section, tasks: tasks || [] } : section,
          ) ?? state.sections,
      })),
    addNewSection: (section) =>
      set((state) => ({
        sections: [...state.sections, section],
      })),
    updateSectionDetail: (sectionId, data) =>
      set((state) => {
        const newSections = state.sections.map((section) => {
          if (section.id !== sectionId) return section;
          return { ...section, name: data.name };
        });
        return { sections: newSections };
      }),
    removeSection: (sectionId) =>
      set((state) => ({ sections: state.sections.filter((section) => section.id !== sectionId) })),
    addNewTask: (task) =>
      set((state) => ({
        sections:
          state.sections.map((section) =>
            section.id === task.section_id
              ? { ...section, tasks: [...section.tasks, task] }
              : section,
          ) ?? state.sections,
      })),
  },
}));

export const useProjectStoreActions = () => useProjectStore((state) => state.actions);
export default useProjectStore;
