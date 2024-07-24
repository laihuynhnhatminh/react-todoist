import { Typography } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';
import { BasicStatus, Role } from '@/enums';
import { useUserActions } from '@/stores';

export default function TestPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { setUserInfo, setUserToken, clearUserInfoAndToken } = useUserActions();
  const tempUser = {
    id: '1',
    email: 'nhatminhngo11@gmail.com',
    username: 'Minh Lai',
    role: Role.ADMIN,
    status: BasicStatus.ENABLE,
  };
  const tempToken = {
    accessToken: 'ey123fsdfc1324312d41324c132',
    refreshToken: 'eysadfqwrqwr124c124214wqrt1356',
  };

  const onSignInClick = () => {
    setUserInfo(tempUser);
    setUserToken(tempToken);
    setIsSignedIn(true);
  };

  const onSignOutClick = () => {
    clearUserInfoAndToken();
    setIsSignedIn(false);
  };

  return (
    <div className="flex flex-col">
      <Typography.Title level={3}>This is Test Page</Typography.Title>
      <Card>
        {isSignedIn ? (
          <div>
            <Typography.Text>Hello user {tempUser.username}</Typography.Text>
            <div className="m-4 flex items-center justify-center rounded-2xl border-2 border-solid border-black p-4">
              <button onClick={onSignOutClick}>Sign Out</button>
            </div>
          </div>
        ) : (
          <div>
            <Typography.Text>Click here to sign in</Typography.Text>
            <div className="m-4 flex items-center justify-center rounded-2xl border-2 border-solid border-black p-4">
              <button onClick={onSignInClick}>Sign In</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
