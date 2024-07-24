import { Row, Col } from 'antd';
import Color from 'color';

import { useThemeToken } from '@/themes/hooks';

export default function GreetingCard() {
  const themeToken = useThemeToken();
  const cardBackgroundColor = `linear-gradient(135deg, ${Color(themeToken.colorPrimaryHover).alpha(0.2)}, ${Color(themeToken.colorPrimary).alpha(0.2)}) rgb(255, 255, 255)`;

  return (
    <Row
      className="!mx-0 rounded-2xl p-7"
      gutter={[16, 16]}
      justify="space-between"
      style={{ background: cardBackgroundColor }}
    >
      <Col span={24} md={12} xl={16} className="flex-1 text-center md:text-left">
        <div
          className="mt-4 text-lg font-semibold md:text-xl"
          style={{ color: themeToken.colorPrimaryActive }}
        >
          <h4>Welcome to React Todoist</h4>
          <h4>User A</h4>
        </div>
        <div
          style={{ color: themeToken.colorPrimaryTextActive }}
          className="mx-auto mb-6 mt-4 max-w-sm text-sm opacity-80 md:mx-0"
        >
          This is a project created for me to learn more about React
        </div>
      </Col>
      <Col
        span={24}
        md={12}
        xl={8}
        className="!md:max-w-[320px] mx-auto !max-w-[270px] flex-none items-center justify-center"
      >
        <img
          src="/src/assets/images/logo/react.png"
          alt="react-logo"
          width={400}
          className="mx-10 flex"
        />
      </Col>
    </Row>
  );
}
