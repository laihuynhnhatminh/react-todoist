import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { requestTodoistSyncApiWithTempId } from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { ProjectDetails, Section, TodoistAddSectionArgs } from '@/entities';
import { TodoistCommandTypeEnum } from '@/enums';

const addSection = (addSectionArgs: TodoistAddSectionArgs) =>
  requestTodoistSyncApiWithTempId(TodoistCommandTypeEnum.SECTION_ADD, addSectionArgs);

export function useAddSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSection,
    onMutate: async (addSectionArgs: TodoistAddSectionArgs) => {
      await queryClient.cancelQueries({
        queryKey: PROJECT_KEYS.project(addSectionArgs.project_id),
        exact: true,
      });

      const previousSections = queryClient.getQueryData<ProjectDetails>(
        PROJECT_KEYS.project(addSectionArgs.project_id),
      );
      const tempSectionId = uuidv4();
      queryClient.setQueryData<ProjectDetails>(
        PROJECT_KEYS.project(addSectionArgs.project_id),
        (prev: ProjectDetails | undefined) => {
          if (!prev) return undefined;

          const newSections: Section[] = [
            ...prev.sections,
            {
              id: tempSectionId,
              project_id: addSectionArgs.project_id,
              name: addSectionArgs.name,
              section_order:
                prev.sections.length > 0
                  ? prev.sections[prev.sections.length - 1].section_order + 1
                  : 1,
              tasks: [],
            },
          ];
          return { ...prev, sections: newSections };
        },
      );

      return { projectId: addSectionArgs.project_id, previousSections, tempSectionId };
    },
    onError: (error, _variables, context) => {
      console.error(error);

      if (context) {
        queryClient.setQueryData(PROJECT_KEYS.project(context.projectId), context.previousSections);
      }
    },
    onSuccess: (data, _variables, context) => {
      const newSectionId = Object.values(data.temp_id_mapping)[0];
      queryClient.setQueryData<ProjectDetails>(
        PROJECT_KEYS.project(context.projectId),
        (prev: ProjectDetails | undefined): ProjectDetails | undefined => {
          if (!prev) return undefined;

          const newSections: Section[] = prev.sections.map((section) => {
            if (section.id === context.tempSectionId) {
              section.id = newSectionId;
              return section;
            }
            return section;
          });
          return { ...prev, sections: newSections };
        },
      );
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.project(context.projectId) });
      }
    },
  });
}
