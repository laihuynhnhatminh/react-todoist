import { TodoistColor } from '@/enums';

import { Section } from './section';
import { Task } from './task';

export type ProjectStyle = 'board';

export type ProjectDetails = {
  items: Task[];
  sections: Section[];
  project: Project;
};

export type Project = {
  id: string;
  name: string;
  comment_count: number;
  order: number;
  color: TodoistColor;
  is_shared: boolean;
  is_favorite: boolean;
  is_inbox_project: boolean;
  is_team_inbox: boolean;
  view_style: ProjectStyle;
  parent_id: string | null;
};

export type CreateProjectRequest = {
  name: string;
  color?: TodoistColor;
  view_style?: ProjectStyle;
};
