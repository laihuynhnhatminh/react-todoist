import { create } from 'zustand';

import { Project, Section, Task } from '@/entities';

type ProjectStore = {
  projects: Map<string, Project>;
  sections: Map<string, Section[]>;
  actions: {
    setProject: (project: Project) => void;
    setSections: (sections: Section[], tasks: Task[]) => void;
  };
};

const useProjectStore = create<ProjectStore>((set) => ({
  projects: new Map(),
  sections: new Map(),
  actions: {
    setProject: (project) =>
      set((state) => ({ projects: state.projects.set(project.id, project) })),
    setSections: (sections, tasks) =>
      set((state) => {
        const newSections = sections.reduce((acc: Map<string, Section[]>, curr) => {
          const currTasks = tasks.filter((task) => task.section_id === curr.id);
          curr.tasks = currTasks;
          const arr = acc.get(curr.project_id);
          if (!arr) {
            acc.set(curr.project_id, [curr]);
          } else {
            acc.set(curr.project_id, [...arr, curr]);
          }

          return acc;
        }, new Map());

        return { sections: new Map([...state.sections, ...newSections]) };
      }),
  },
}));

export const useProjectStoreActions = () => useProjectStore((state) => state.actions);
export default useProjectStore;
