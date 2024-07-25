import { Typography } from 'antd';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { Task } from '@/entities';

type Props = {
  readonly tasks: Task[];
};

export default function ImportantTaskLog({ tasks }: Props) {
  return (
    <Card className="flex-col">
      <header>
        <Typography.Title level={3}>Important Tasks</Typography.Title>
      </header>
      <main>
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <Card key={task.id} className="flex flex-row justify-between rounded-lg px-4 py-3">
              <div className="flex w-3/4">
                <Typography.Title
                  style={{ margin: '0' }}
                  level={5}
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {task.content}
                </Typography.Title>
              </div>
              <div className="flex gap-4">
                <Iconify icon="fa6-solid:arrow-up-right-from-square" size={20} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </Card>
  );
}
