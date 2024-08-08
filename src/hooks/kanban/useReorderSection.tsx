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

      const previousSections = queryClient.getQueryData<ProjectDetails>(
        PROJECT_KEYS.project(sectionReorderDto.project_id),
      );

      queryClient.setQueryData<ProjectDetails>(
        PROJECT_KEYS.project(sectionReorderDto.project_id),
        (prev: ProjectDetails | undefined) => {
          if (!prev) return undefined;

          const activeSectionIndex = prev.sections.findIndex(
            (section) => section.id === sectionReorderDto.args.sections[0].id,
          );
          const overSectionIndex = prev.sections.findIndex(
            (section) => section.id === sectionReorderDto.args.sections[1].id,
          );
          const newSections = arrayMove(prev.sections, activeSectionIndex, overSectionIndex);

          return { ...prev, sections: newSections };
        },
      );

      console.log('iscalled');

      return { projectId: sectionReorderDto.project_id, previousSections };
    },
    onError: (error, _variables, context) => {
      console.error(error);

      if (context) {
        queryClient.setQueryData(PROJECT_KEYS.project(context.projectId), context.previousSections);
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
