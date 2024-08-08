import { arrayMove } from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestTodoistSyncApi } from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { ProjectDetails, ReorderSectionDto } from '@/entities';
import { TodoistCommandTypeEnum } from '@/enums';

const reorderSection = (sectionReorderDto: ReorderSectionDto) =>
  requestTodoistSyncApi(TodoistCommandTypeEnum.SECTION_REORDER, sectionReorderDto.args);

export function useReorderSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderSection,
    onMutate: async (sectionReorderDto: ReorderSectionDto) => {
      await queryClient.cancelQueries({
        queryKey: PROJECT_KEYS.project(sectionReorderDto.project_id),
        exact: true,
      });

      return { projectId: sectionReorderDto.project_id, prevProjectDetails: sectionReorderDto.prevProjectDetails };
    },
    onError: (error, _variables, context) => {
      console.error(error);

      if (context) {
        queryClient.setQueryData(PROJECT_KEYS.project(context.projectId), context.prevProjectDetails);
      }
    },
    onSuccess: () => {},
    onSettled: (_data, _error, _variables, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.project(context.projectId) });
      }
    },
  });
}
