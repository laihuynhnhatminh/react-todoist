import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { useQueryProjectDetail, useQuerySectionsOfProject } from '@/api/hooks';
import Card from '@/components/card';
import { CircleLoading } from '@/components/loading';

export default function KanbanBoard() {
  const { id } = useParams();
  const { isLoading: isProjectLoading, data: projectData } = useQueryProjectDetail(id as string);
  const { isLoading: isSectionsLoading, data: sectionsData } = useQuerySectionsOfProject(
    id as string,
  );

  if (isProjectLoading || isSectionsLoading) {
    return <CircleLoading />;
  }

  if (!projectData || !sectionsData) {
    return <div>Something went wrong! Unable to get project data.</div>;
  }

  console.log(projectData, sectionsData);

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
