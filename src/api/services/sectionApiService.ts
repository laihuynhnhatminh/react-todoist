import { TodoistCommand, TodoistSyncedResult } from '@/entities';

import apiClient from '../apiClient';

const SYNC_PATH = '/sync';
const SECTION_PATH = '/sections';

/* Api Request using Axios */

export const updateSectionOrders = (commands: TodoistCommand[]) =>
  apiClient.get<TodoistSyncedResult>({
    url: SYNC_PATH,
    params: new URLSearchParams({
      commands: JSON.stringify(commands),
    }),
  });
