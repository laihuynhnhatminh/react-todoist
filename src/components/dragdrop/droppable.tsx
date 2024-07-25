import { useDroppable } from '@dnd-kit/core';

type Props = {
  readonly id: string;
  readonly children: React.ReactNode;
};

export default function Droppable({ id, children }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
}
