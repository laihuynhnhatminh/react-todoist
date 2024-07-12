import { App as AntdApp } from 'antd';
import { Helmet } from 'react-helmet-async';

import Logo from '#/assets/images/logo.png';

function App() {
  return (
    <AntdApp>
      <Helmet>
        <title>React Todoist</title>
        <link rel="icon" href={Logo} />
      </Helmet>
    </AntdApp>
  );
}

export default App;
