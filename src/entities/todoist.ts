import { TodoistCommandTypeEnum } from '@/enums';

import { Project } from './project';
import { Section } from './section';
import { Task } from './task';

export type TodoistFullSyncedResources = {
  full_sync: boolean;
  sync_token: string;
  projects?: Project[];
  items?: Task[];
  sections?: Section[];
};

export type TodoistSyncedError = { error_code: number; error: string };

export type TodoistSyncedResult = {
  sync_status: { [uuid: string]: string | TodoistSyncedError };
};

export type TodoistSectionArg = {
  id: string;
  section_order: number;
};

export type TodoistCommand = {
  type: TodoistCommandTypeEnum;
  uuid: string;
  args: {
    sections?: TodoistSectionArg[];
  };
};
