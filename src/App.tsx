import { App as AntdApp } from 'antd';
import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/logo.png';
import Router from '@/router';

import AntdConfig from './themes/antd';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <Helmet>
          <title>React Todoist</title>
          <link rel="icon" href={Logo} />
        </Helmet>
        <Router />
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
