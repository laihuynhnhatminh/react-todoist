import { CreateSectionDto, Section, UpdateSectionDto } from '@/entities';

import apiClient from '../apiClient';

const SECTION_PATH = '/sections';

/* Api Request using Axios */

export const getSections = (projectId: string) =>
  apiClient.get<Section[]>({ url: `${SECTION_PATH}`, params: { project_id: projectId } });

export const createSection = (data: CreateSectionDto) =>
  apiClient.post<Section>({ url: `${SECTION_PATH}`, data });

export const updateSectionDetail = (sectionId: string, data: UpdateSectionDto) =>
  apiClient.post<Section>({ url: `${SECTION_PATH}/${sectionId}`, data });

export const removeSection = (sectionId: string) =>
  apiClient.delete<void>({ url: `${SECTION_PATH}/${sectionId}` });
