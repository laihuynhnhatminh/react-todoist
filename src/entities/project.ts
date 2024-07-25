import { TodoistColor } from '@/enums';

export type ProjectStyle = 'board';

export type Project = {
  id: string;
  name: string;
  comment_count: number;
  order: number;
  color: TodoistColor; // Change to colorEnum?
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
