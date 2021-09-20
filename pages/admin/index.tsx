import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head'
import { css } from '@emotion/react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';
import axios from 'axios';

const Admin: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          alert(data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  };

  const isAdmin = useMemo((): boolean => {
    const groups = (user as any)?.signInUserSession?.accessToken?.payload["cognito:groups"] || [];
    return groups.includes('admin');
  }, [user]);

  const call = (Authorization: string) => {
    const instance = axios.create({
      baseURL: 'https://utcrpcgdq0.execute-api.ap-northeast-2.amazonaws.com/dev',
      headers: { Authorization }
    });
    setTimeout(async () => {
      try {
        const response = await instance.get('/vlogdev/request');
        console.log('===> ', response.data);
      } catch(e) {
        console.error(e);
      }
    }, 3000)
  };
  useEffect(() => {
    if (!user) return;
    call((user as any).signInUserSession.idToken.jwtToken);
  }, [user]);

  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
      `}>
        <Head>
          <title>VLOG admin</title>
        </Head>
        <div css={css`
        margin: 50px;
        `}>
          Admin Page
          { isAdmin ?
            <p>
              provider name: {JSON.parse((user as any)?.attributes?.identities || '[{}]')[0]?.providerName || 'none'}<br />
              username: {(user as any)?.username || ''}<br />
              email: {(user as any)?.attributes.email}
            </p> : 
            <p>
              This page is for admin.
            </p>
          }
          {user ? (
            <AmplifySignOut />
          ) : (
            <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
          )}
        </div>
    </div>
  );
};

export default withAuthenticator(Admin);
