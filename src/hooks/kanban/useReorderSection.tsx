import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestTodoistSyncApi } from '@/api/services';
import { PROJECT_KEYS } from '@/api/shared/queryKeys';
import { TodoistReorderSectionDto } from '@/entities';
import { TodoistCommandTypeEnum } from '@/enums';

const reorderSection = (sectionReorderDto: TodoistReorderSectionDto) =>
  requestTodoistSyncApi(TodoistCommandTypeEnum.SECTION_REORDER, sectionReorderDto.args);

export function useReorderSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderSection,
    onMutate: async (sectionReorderDto: TodoistReorderSectionDto) => {
      await queryClient.cancelQueries({
        queryKey: PROJECT_KEYS.project(sectionReorderDto.project_id),
        exact: true,
      });

      // Change order locally here
    },
    onError: () => {
      // handle error
    },
    onSuccess: () => {
      // handle error if ok but is errored
    },
    onSettled: () => {
      // refetch data
    },
  });
}
