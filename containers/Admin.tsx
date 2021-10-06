import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import { observer } from "mobx-react";
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Store from '@mobx/store'
import { css } from '@emotion/react';
import { mq, colors } from '@styles/theme';
import Request from '@components/admin/RequestInfo';
import Youtube from '@components/admin/YoutubeInfo';

type Tab = 'YoutubeChannel' | 'Request' | 'Vlog'
const tabs: Tab[] = ['YoutubeChannel', 'Request', 'Vlog'];

const Admin: React.FC = () => {
  const { user: { auth, isAdmin } } = useContext(Store);
  const [currentTab, setCurrentTab] = useState<Tab>('YoutubeChannel');

  const handleClickTab = useCallback((id: Tab): void => {
    setCurrentTab(id);
  }, []);

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
              provider name: {JSON.parse(auth ?.attributes?.identities || '[{}]')[0]?.providerName || 'none'}<br />
              username: {auth ?.username || ''}<br />
              email: {auth ?.attributes.email}
            </p>
            {
              currentTab === 'Request' ?
              <Request user={auth} /> :
              currentTab === 'YoutubeChannel' ? 
              <Youtube user={auth} /> :
              <></> 
            }
          </> : 
          <p>
            This page is for admin.
          </p>
        }
        {auth ? (
          <AmplifySignOut />
        ) : (
          <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
        )}
      </div>
    </main>
  );
};

export default observer(Admin);
