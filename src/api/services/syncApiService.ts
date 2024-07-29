import { TodoistFullSyncedResources } from '@/entities';

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
