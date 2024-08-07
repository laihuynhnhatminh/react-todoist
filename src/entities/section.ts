import { Task } from './task';

export type Section = {
  id: string;
  project_id: string;
  section_order: number;
  name: string;
  tasks: Task[];
};
