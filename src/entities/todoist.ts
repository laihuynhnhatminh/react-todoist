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
  temp_id_mapping: { [uuid: string]: string };
};

/* Request */
export type TodoistSyncRequest = {
  type: TodoistCommandTypeEnum;
  args: TodoistArgsType;
};

export type TodoistArgs = {
  name?: string;
  project_id?: string;
};

export type TodoistSectionArg = {
  id?: string;
  name?: string;
  section_order?: number;
  project_id?: string;
};

export type TodoistArgsType = TodoistSectionArg & {
  sections?: TodoistSectionArg[];
};

export type TodoistCommand = {
  type: TodoistCommandTypeEnum;
  uuid: string;
  temp_id?: string;
  args: TodoistArgsType;
};
