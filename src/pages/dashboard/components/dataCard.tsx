import Card from '@/components/card';
import { Iconify } from '@/components/icon';

type Props = {
  readonly className?: string;
  readonly icon: string;
  readonly iconColor: string;
  readonly title: string;
  readonly text: string;
};

export default function DataCard({ className = '', icon, iconColor, title, text }: Props) {
  return (
    <Card className={`flex-col items-start ${className}`}>
      <div
        className="flex rounded-full p-4"
        style={{
          background: iconColor,
        }}
      >
        <Iconify icon={icon} size={24} />
      </div>
      <div className="flex pt-4">
        <h6 className="text-sm text-gray-600">{title}</h6>
      </div>
      <div className="flex p-2">
        <span className="text-4xl font-bold">{text}</span>
      </div>
    </Card>
  );
}
