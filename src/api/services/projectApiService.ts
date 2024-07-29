import { CreateProjectRequest, Project, ProjectDetails } from '@/entities';

import apiClient from '../apiClient';

const PROJECT_PATH = '/projects';

/* Api Request using Axios */

export const getProjectDetail = (id: string) =>
  apiClient.get<ProjectDetails>({ url: `${PROJECT_PATH}/get_data`, params: { project_id: id } });
