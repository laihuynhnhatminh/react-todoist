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

export type TodoistSyncedError = {
  error_code: number;
  error: string;
  error_tag: string;
  http_code: number;
};

export type TodoistSyncedResult = {
  sync_status: { [uuid: string]: TodoistSyncedError };
  temp_id_mapping: { [uuid: string]: string };
};

/* Request */
export type TodoistSyncRequest = {
  type: TodoistCommandTypeEnum;
  uuid?: string;
  args: TodoistArgsType;
};

export type TodoistAddSectionArgs = {
  project_id: string;
  name: string;
};

export type TodoistReorderSectionArgs = {
  sections: {
    id: string;
    section_order: number;
  }[];
};

export type TodoistReorderSectionDto = {
  project_id: string;
  args: TodoistReorderSectionArgs;
};

export type TodoistArgsType = TodoistAddSectionArgs | TodoistReorderSectionArgs;
