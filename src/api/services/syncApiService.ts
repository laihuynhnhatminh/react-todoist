import { v4 as uuidv4 } from 'uuid';

import { TodoistArgsType, TodoistFullSyncedResources, TodoistSyncedResult } from '@/entities';
import { TodoistCommandTypeEnum } from '@/enums';

import apiClient from '../apiClient';

const SYNC_PATH = '/sync';

export const getTodoistSyncedResources = (syncToken: string, resourceTypes: string[]) =>
  apiClient.get<TodoistFullSyncedResources>({
    url: SYNC_PATH,
    params: new URLSearchParams({
      sync_token: syncToken,
      resource_types: JSON.stringify(resourceTypes),
    }),
  });

export const requestTodoistSyncApi = (type: TodoistCommandTypeEnum, args: TodoistArgsType) =>
  apiClient.get<TodoistSyncedResult>({
    url: SYNC_PATH,
    params: new URLSearchParams({
      commands: JSON.stringify([
        {
          type,
          uuid: uuidv4().toString(),
          args,
        },
      ]),
    }),
  });

export const requestTodoistSyncApiWithTempId = (
  type: TodoistCommandTypeEnum,
  args: TodoistArgsType,
) =>
  apiClient.get<TodoistSyncedResult>({
    url: SYNC_PATH,
    params: new URLSearchParams({
      commands: JSON.stringify([
        {
          type,
          temp_id: uuidv4().toString(),
          uuid: uuidv4().toString(),
          args,
        },
      ]),
    }),
  });
