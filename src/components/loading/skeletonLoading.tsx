import { Spin } from 'antd';

// TODO: to be done somehow
export default function SkeletonLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
