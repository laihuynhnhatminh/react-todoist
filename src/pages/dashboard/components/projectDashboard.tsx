import { Typography } from 'antd';
import Color from 'color';
import { Link } from 'react-router-dom';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';
import { Project } from '@/entities';
import { TodoistColorCode } from '@/enums';

const { VITE_APP_ROOT_URL: ROOT_URL } = import.meta.env;

type Props = {
  readonly projects: Project[];
};

export default function ProjectDashboard({ projects }: Props) {
  return (
    <Card className="flex-col">
      <header>
        <Typography.Title level={3}>List of Projects</Typography.Title>
      </header>
      <main>
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex rounded-lg px-4 py-3"
              style={{
                background: `linear-gradient(135deg, ${Color(TodoistColorCode[project.color])
                  .alpha(0.2)
                  .toString()}, ${Color(TodoistColorCode[project.color]).alpha(0.2).toString()}) rgb(255, 255, 255)`,
              }}
            >
              <Link
                to={`/projects/${project.id}/kanban`}
                replace
                className="flex w-full flex-row justify-between"
              >
                <div className="flex">
                  <Typography.Title
                    style={{ margin: '0' }}
                    level={4}
                    className="overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {project.name}
                  </Typography.Title>
                </div>
                <div className="flex gap-4">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`${ROOT_URL}/projects/${project.id}/kanban`, '_blank');
                    }}
                    className="hover:bg-transparent"
                  >
                    <Iconify icon="fa6-solid:arrow-up-right-from-square" size={20} />
                  </IconButton>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </Card>
  );
}
