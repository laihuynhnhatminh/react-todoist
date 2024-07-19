import { Col, Row, Typography } from 'antd';

import { useTaskByParams } from '@/api/hooks';
import { useQueryProjects } from '@/api/hooks/projectHooks';
import { CircleLoading } from '@/components/loading';
import Scrollbar from '@/components/scrollbar';
import { useThemeToken } from '@/themes/hooks';

import DataCard from './dataCard';
import ImportantTaskLog from './importantTaskLog';
import ProjectDashboard from './projectDashboard';

export default function Dashboard() {
  const { blue3, pink3, orange3 } = useThemeToken();
  const { isLoading: isProjectLoading, data: projects } = useQueryProjects();

  const { isLoading: isTaskLoading, data: tasks } = useTaskByParams({ label: 'Important' });

  if (isProjectLoading || isTaskLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="p-2">
      <Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
      <Row gutter={[16, 16]} className="my-2">
        <Col key="signInDays" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:lock"
            iconColor={blue3}
            title="Days Sign-In In a Row"
            text="10 Days"
          />
        </Col>
        <Col key="createdProjects" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:briefcase"
            iconColor={pink3}
            title="Projects Created"
            text={`${projects?.length} /6 Projects`}
          />
        </Col>
        <Col key="importantTasks" lg={8} md={8} span={24}>
          <DataCard
            icon="fa6-solid:clipboard-list"
            iconColor={orange3}
            title="Important Tasks"
            text={`${tasks?.length} Tasks`}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="my-2">
        <Col lg={12} md={24} span={24}>
          <Scrollbar style={{ maxHeight: '50vh' }}>
            <ProjectDashboard projects={projects || []} />
          </Scrollbar>
        </Col>
        <Col lg={12} md={24} span={24}>
          <Scrollbar style={{ maxHeight: '50vh' }}>
            <ImportantTaskLog tasks={tasks || []} />
          </Scrollbar>
        </Col>
      </Row>
    </div>
  );
}
