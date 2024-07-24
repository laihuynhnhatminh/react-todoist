import { useQuery } from '@tanstack/react-query';

import { Section } from '@/entities';

import apiClient from '../apiClient';
import { SECTION_KEYS } from '../shared/queryKeys';

const SECTION_PATH = '/sections';

/* Api Request using Axios */

export const getSectionsOfProject = (projectId: string) =>
  apiClient.get<Section[]>({ url: `${SECTION_PATH}`, params: { project_id: projectId } });

/* React Query hook */

export const useQuerySectionsOfProject = (projectId: string) =>
  useQuery({
    queryKey: SECTION_KEYS.sectionOfProject(projectId),
    queryFn: () => getSectionsOfProject(projectId),
  });
