import { useDraggable } from '@dnd-kit/core';

type Props = {
  readonly id: string;
  readonly children: React.ReactNode;
};

export default function Draggable({ id, children }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </button>
  );
}
