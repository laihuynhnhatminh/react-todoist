// Main index page should contain List of tasks
// These task would be task due in 1 week tasks due by today

import { useQuery } from '@tanstack/react-query';
import { Col, Row, Typography } from 'antd';

import { TASK_KEYS } from '@/api/reactQuery/keys';
import { getTasks } from '@/api/services/taskApi';
import { CircleLoading } from '@/components/loading';
import { Task } from '@/entities';

import TaskRow from './taskRow';

export default function TaskLog() {
  const { isLoading, data } = useQuery<Task[]>({
    queryKey: TASK_KEYS.all,
    queryFn: getTasks,
  });

  if (isLoading) {
    return <CircleLoading />;
  }

  return (
    <div className="p-2">
      <Typography.Title level={2}>Hi, Welcome back 👋</Typography.Title>
      <Row gutter={[16, 16]}>
        {data?.map((task) => (
          <Col key={task.id} lg={6} md={12} span={24}>
            <TaskRow taskTitle={task.content} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
