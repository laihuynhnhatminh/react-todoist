import { Typography } from 'antd';

import Card from '@/components/card';

export default function Project() {
  return (
    <div className="flex flex-col">
      <Typography.Title level={3}>This is Test Page</Typography.Title>
      <Card>
        <div>
          <Typography.Text>Click here to sign in</Typography.Text>
        </div>
      </Card>
    </div>
  );
}
