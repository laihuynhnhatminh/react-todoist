export interface DueDate {
  date: string;
  is_recurring: boolean;
  datetime: string;
  string: string;
  timezone: string;
}

export interface Duration {
  amount: number;
  unit: "minute" | "day";
}

export interface Task {
  creator_id: string;
  created_at: string;
  assignee_id: string | null;
  assigner_id: string | null;
  id: string;
  content: string;
  description?: string;
  comment_count: number;
  is_completed: boolean;
  content: string;
  due: DueDate | null;
  duration: Duration | null;
  labels: string[];
  order: number;
  priority: number;
  project_id: string;
  section_id: string;
  parent_id: string;
  url: string;
}
