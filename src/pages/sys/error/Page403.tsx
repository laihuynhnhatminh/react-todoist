import { useThemeToken } from '@/hooks';
import SimpleHeader from '@/layouts/common/simpleHeader';
import { Helmet } from 'react-helmet-async';

export default function Page403() {
  // const {
  //   colorBgBase,
  //   colorTextBase,
  //   colorPrimary,
  //   colorPrimaryActive,
  //   colorPrimaryTextActive,
  //   colorPrimaryHover,
  // } = useThemeToken();

  return (
    <>
      <Helmet>
        <title>403 No Permission</title>
      </Helmet>
      <div className="m-w-[400px] m-auto">403 ERROR</div>
    </>
  );
}
