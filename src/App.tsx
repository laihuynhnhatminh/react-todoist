import { App as AntdApp } from 'antd';
import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/logo.png';
import { MotionLazy } from '@/components/animations/motionLazy';
import Router from '@/router/index';

import AntdConfig from './themes/antd';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>React Todoist</title>
            <link rel="icon" href={Logo} />
          </Helmet>

          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
