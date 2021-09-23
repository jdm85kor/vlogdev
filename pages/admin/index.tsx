import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head'
import { css } from '@emotion/react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';
import { apiCall } from '@utils/apis';
import { colors } from '@styles/theme';
import { mq } from '@styles/theme';

const Admin: React.FC = () => {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [requestData, setRequestData] = useState<any[]>([]);

  useEffect((): void => {
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

  const fetch = async (Authorization: string) => {
    try {
      const res = await apiCall({
        method: 'get',
        url: '/vlogdev/request',
        headers: { Authorization },
      });
      setRequestData(res.data.items);;
    } catch(e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (!user) return;
    fetch((user as any).signInUserSession.idToken.jwtToken);
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
          ${mq({
            margin: ['10px', '40px', '50px'],
          })}
        `}>
          
          <h1>Admin Page</h1>
          { isAdmin ?
            <>
            <h2>
              Owner
            </h2>
              <p>
                provider name: {JSON.parse((user as any)?.attributes?.identities || '[{}]')[0]?.providerName || 'none'}<br />
                username: {(user as any)?.username || ''}<br />
                email: {(user as any)?.attributes.email}
              </p>
              <h2>Requests</h2>
              { requestData.length ?
                <ul css={css`
                  padding: 0;
                  list-style: none;
                  border-top: solid 1px ${colors.hermes}
                `}>
                  {
                    requestData.map(d => (
                      <li
                        key={d.id}
                        css={css`
                          padding: 20px;
                          border-bottom: solid 1px ${colors.hermes};
                          white-space: pre-line;
                        `}
                      >
                        <p>
                          { d.type }
                        </p>
                        <p>
                          { d.name }
                        </p>
                        <p>
                          { d.tel }
                        </p>
                        <p>
                          { d.email }
                        </p>
                        <p>
                          { d.contents }
                        </p>
                      </li>
                    ))
                  }
                </ul> :
                <></>
              }
            </> : 
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
