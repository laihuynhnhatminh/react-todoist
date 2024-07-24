import { Iconify } from '@/components/icon';
import { AppRouteObject } from '@/entities/route';
import BackLog from '@/pages/project/backlog';
import KanbanBoard from '@/pages/project/kanban';

const project: AppRouteObject = {
  order: 2,
  path: 'projects/:id',
  meta: {
    hideMenu: true,
    label: 'sys.menu.project.index',
    icon: <Iconify icon="fa6-solid:clipboard-list" size={24} />,
    key: '/projects/:id',
  },
  children: [
    {
      path: 'kanban',
      element: <KanbanBoard />,
    },
    {
      path: 'backlog',
      element: <BackLog />,
    },
  ],
};

export default project;
