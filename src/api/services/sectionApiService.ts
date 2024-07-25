import { Section } from '@/entities';

import apiClient from '../apiClient';

const SECTION_PATH = '/sections';

/* Api Request using Axios */

export const getSectionsOfProject = (projectId: string) =>
  apiClient.get<Section[]>({ url: `${SECTION_PATH}`, params: { project_id: projectId } });
