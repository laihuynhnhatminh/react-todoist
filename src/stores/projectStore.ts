import { create } from 'zustand';

import { Project, Section, Task } from '@/entities';

type ProjectStore = {
  projects: Map<string, Project>;
  sections: Map<string, Section[]>;
  tasks: Map<string, Task[]>;
  actions: {
    setProject: (project: Project) => void;
    setSections: (sections: Section[], tasks: Task[]) => void;
    setSection: (section: Section) => void;
    setTasks: (tasks: Task[]) => void;
    removeSection: (projectId: string, sectionId: string) => void;
  };
};

const useProjectStore = create<ProjectStore>((set) => ({
  projects: new Map<string, Project>(),
  sections: new Map<string, Section[]>(),
  tasks: new Map<string, Task[]>(),
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
        }, new Map<string, Section[]>());

        return { sections: new Map([...state.sections, ...newSections]) };
      }),
    setSection: (section) =>
      set((state) => {
        const projectSections = state.sections.get(section.project_id) || [];
        const newSections = [...projectSections, section]
          .map((section) => {
            const tasks = state.tasks.get(section.id);
            section.tasks = tasks || [];
            return section;
          })
          .sort((a, b) => a.section_order - b.section_order);

        state.sections.delete(section.project_id);
        state.sections.set(section.project_id, newSections || []);

        console.log(state.sections);

        return { sections: new Map([...state.sections]) };
      }),
    setTasks: (tasks) =>
      set((state) => {
        const taskMap = tasks.reduce((acc: Map<string, Task[]>, curr) => {
          const arr = state.tasks.get(curr.section_id);
          if (!arr) {
            acc.set(curr.section_id, [curr]);
          } else {
            acc.set(curr.section_id, [...arr, curr]);
          }

          return acc;
        }, new Map<string, Task[]>());

        return { tasks: new Map([...state.tasks, ...taskMap]) };
      }),
    removeSection: (projectId, sectionId) =>
      set((state) => {
        state.sections.forEach((sections, id) => {
          if (id === projectId) {
            const updatedSections = sections.filter((section) => section.id !== sectionId);
            state.sections.set(id, updatedSections);
          }
        });

        return { sections: new Map([...state.sections]) };
      }),
  },
}));

export const useProjectStoreActions = () => useProjectStore((state) => state.actions);
export default useProjectStore;
