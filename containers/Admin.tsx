import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from '@emotion/react';
import { Auth, Hub } from 'aws-amplify';
import { mq, colors } from '@styles/theme';
import Request from '@components/admin/RequestInfo';
import Youtube from '@components/admin/YoutubeInfo';

type Tab = 'YoutubeChannel' | 'Request' | 'Vlog'
const tabs: Tab[] = ['YoutubeChannel', 'Request', 'Vlog'];

const Admin: React.FC = () => {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('YoutubeChannel');

  const handleClickTab = useCallback((id: Tab): void => {
    setCurrentTab(id);
  }, []);

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

  const getUser = useCallback(() => {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }, []);

  const isAdmin = useMemo((): boolean => {
    const groups = (user as any)?.signInUserSession?.accessToken?.payload["cognito:groups"] || [];
    return groups.includes('admin');
  }, [user]);

  return (
    <main css={css`
      margin: 0 auto;
      max-width: 1920px;
    `}>
      <div css={css`
        margin: 50px auto;
        ${mq({
          padding: ['0 30px 30px', '0 50px', '0 50px'],
        })}
        max-width: 1024px;
        word-break: break-word;
        box-sizing: border-box;
      `}>
        <div>
          <ul css={css`
            display: flex;
            margin: 0;
            padding: 0;
            list-style: none;
            flex-direction: row;
          `}>
            {
              tabs.map((c, id) => (
                <li
                  key={id}
                  css={css`
                    display: inline-block;
                    margin: 0 5px;
                    padding: 0;
                    border: 1px solid ${colors.hermes};
                    box-shadow: 2px 2px 2px grey;
                  `}
                >
                  <button
                    type="button"
                    onClick={() => handleClickTab(c)}
                    css={css`
                      cursor: pointer;
                      background: inherit;
                      border: none;
                      padding: 5px;
                      color: ${colors.hermes};
                    `}
                  >
                    { c }
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
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
            {
              currentTab === 'Request' ?
              <Request user={user} /> :
              currentTab === 'YoutubeChannel' ? 
              <Youtube user={user} /> :
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
    </main>
  );
};

export default withAuthenticator(Admin);
