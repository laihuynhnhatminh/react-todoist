// Main index page should contain List of project
// Components: Project cards
// Modal to create new project -> card
// Add a project button

import { useQuery } from '@tanstack/react-query';
import { Col, Row, Typography } from 'antd';

import { PROJECT_KEYS } from '@/api/reactQuery/keys';
import { getProjects } from '@/api/services/projectApi';
import { CircleLoading } from '@/components/loading';
import { Project } from '@/entities';

import ProjectCard from './projectCard';

export default function Dashboard() {
  const { isLoading, data } = useQuery<Project[]>({
    queryKey: PROJECT_KEYS.all,
    queryFn: getProjects,
  });

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="p-2">
      <Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
      <Row gutter={[16, 16]}>
        {data?.map((project) => (
          <Col key={project.id} lg={6} md={12} span={24}>
            <ProjectCard projectColor={project.color} projectName={project.name} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
