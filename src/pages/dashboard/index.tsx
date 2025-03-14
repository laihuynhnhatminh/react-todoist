import { Col, Row } from 'antd';

import { useTaskByParams } from '@/api/hooks';
import { useQueryProjects } from '@/api/hooks/projectHooks';
import { CircleLoading } from '@/components/loading';
import Scrollbar from '@/components/scrollbar';
import { useThemeToken } from '@/themes/hooks';

import DataCard from './components/dataCard';
import GreetingCard from './components/greetingCard';
import ImportantTaskLog from './components/importantTaskLog';
import ProjectDashboard from './components/projectDashboard';

export default function Dashboard() {
  const { blue3, pink3, orange3 } = useThemeToken();
  const { isLoading: isProjectLoading, data: projects } = useQueryProjects();

  const { isLoading: isTaskLoading, data: tasks } = useTaskByParams({ label: 'Important' });

  if (isProjectLoading || isTaskLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="p-2">
      <Row gutter={[16, 16]} className="my-4">
        <Col key="greetingCard" lg={24} md={24} span={24}>
          <GreetingCard />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="my-4">
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
      <Row gutter={[16, 16]} className="my-4">
        <Col lg={12} md={24} span={24}>
          <Scrollbar>
            <ProjectDashboard projects={projects || []} />
          </Scrollbar>
        </Col>
        <Col lg={12} md={24} span={24}>
          <Scrollbar>
            <ImportantTaskLog tasks={tasks || []} />
          </Scrollbar>
        </Col>
      </Row>
    </div>
  );
}
