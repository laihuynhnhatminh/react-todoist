import { clone } from 'ramda';
import { create } from 'zustand';

import { Project, Section, Task } from '@/entities';

type ProjectStore = {
  project: Project | null;
  sections: Section[];
  actions: {
    setProject: (projects: Project) => void;
    setSections: (sections: Section[]) => void;
    setSectionTasks: (sectionId: string, tasks: Task[]) => void;
    removeSection: (sectionId: string) => void;
  };
};

const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  sections: [],
  actions: {
    setProject: (project: Project) => set(() => ({ project: clone(project) })),
    setSections: (sections: Section[]) => set(() => ({ sections: clone(sections) })),
    setSectionTasks: (sectionId, tasks) =>
      set((state) => ({
        sections:
          state.sections.map((section) =>
            section.id === sectionId ? { ...section, tasks } : section,
          ) ?? [],
      })),
    removeSection: (sectionId) =>
      set((state) => ({ sections: state.sections.filter((section) => section.id !== sectionId) })),
  },
}));

export const useProjectStoreActions = () => useProjectStore((state) => state.actions);
export default useProjectStore;
