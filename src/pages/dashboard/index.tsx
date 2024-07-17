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
import { useThemeToken } from '@/themes/hooks';

import DataCard from './dataCard';
import ProjectDashboard from './projectDashboard';
import TaskList from './taskList';

export default function Dashboard() {
  const { colorFillSecondary } = useThemeToken();
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
      <Row gutter={[16, 16]} className="my-2">
        <Col key="createdProject" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:briefcase"
            title="Created Project"
            style={{ background: colorFillSecondary }}
            currentValue={`${data?.length}`}
            maxValue="5"
          />
        </Col>
        <Col key="createdTask" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:briefcase"
            title="Created Project"
            style={{ background: colorFillSecondary }}
            currentValue={`${data?.length}`}
            maxValue="5"
          />
        </Col>
        <Col key="createdTask2" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:briefcase"
            title="Created Project"
            style={{ background: colorFillSecondary }}
            currentValue={`${data?.length}`}
            maxValue="5"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="my-2">
        <Col lg={18} md={24} span={24}>
          <ProjectDashboard />
        </Col>
        <Col lg={6} md={24} span={24}>
          <TaskList />
        </Col>
      </Row>
    </div>
  );
}
