import { TaskPriority } from '@/enums';

export type DueDate = {
  date: string;
  is_recurring: boolean;
  datetime: string;
  string: string;
  timezone: string;
};

export type Duration = {
  amount: number;
  unit: 'minute' | 'day';
};

export type Task = {
  creator_id: string;
  created_at: string;
  assignee_id: string | null;
  assigner_id: string | null;
  id: string;
  description?: string;
  comment_count: number;
  is_completed: boolean;
  content: string;
  due: DueDate | null;
  duration: Duration | null;
  labels: string[];
  child_order: number;
  priority: TaskPriority;
  project_id: string;
  section_id: string;
  parent_id: string;
  url: string;
  updated_at: string;
};

export type TaskParameters = {
  project_id?: string;
  section_id?: string;
  label?: string;
  ids?: number[];
};

export type CreateTaskDto = {
  content: string;
  description?: string;
  project_id: string;
  section_id: string;
  parent_id?: string;
  order?: number;
  priority?: TaskPriority;
  due_date?: DueDate;
  duration?: Duration;
};
