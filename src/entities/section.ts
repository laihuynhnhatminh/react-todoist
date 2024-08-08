import { ProjectDetails } from './project';
import { Task } from './task';
import { TodoistReorderSectionArgs } from './todoist';

export type Section = {
  id: string;
  project_id: string;
  section_order: number;
  name: string;
  tasks: Task[];
};

export type ReorderSectionDto = {
  project_id: string;
  prevProjectDetails: ProjectDetails | undefined;
  args: TodoistReorderSectionArgs;
};
