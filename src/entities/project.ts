export type Project = {
  id: string;
  name: string;
  comment_count: number;
  order: number;
  color: string; // Change to colorEnum?
  is_shared: boolean;
  is_favorite: boolean;
  is_inbox_project: boolean;
  is_team_inbox: boolean;
  view_style: string; // Change to enum?
  parent_id: string | null;
};
