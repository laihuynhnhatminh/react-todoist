import { Task } from './task';

export type Section = {
  id: string;
  project_id: string;
  section_order: number;
  name: string;
  tasks: Task[];
};

export type CreateSectionDto = {
  projectId: string;
  name: string;
};

export type UpdateSectionDto = {
  name: string;
};
