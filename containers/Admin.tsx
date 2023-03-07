import React, { useState, useCallback } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { observer, inject } from 'mobx-react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from '@emotion/react';
import { mq, colors } from '@styles/theme';
import Request from '@components/admin/RequestInfo';
import Youtube from '@components/admin/YoutubeInfo';
import Daily from '@components/admin/Daily';
import Books from '@components/admin/Books';

type Tab = 'YoutubeChannel' | 'Request' | 'Vlog' | 'Daily' | 'Books';
const tabs: Tab[] = ['YoutubeChannel', 'Request', 'Vlog', 'Daily', 'Books'];

interface Props {
  user?: any;
}
const Admin = ({ user }: Props) => {
  const  { auth, isAdmin } = user;
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
        <h1>Admin Page</h1>
        { isAdmin ?
          <>
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
                        border: 1px solid ${colors.lusciousRed};
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
                          color: ${colors.lusciousRed};
                        `}
                      >
                        { c }
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
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
              currentTab === 'Daily' ? 
              <Daily user={auth} /> :
              currentTab === 'Books' ? 
              <Books user={auth} /> :
              <></> 
            }
          </> : 
          <p>
            This page is for admin.
          </p>
        }
        {!!auth && <AmplifySignOut />}
      </div>
    </main>
  );
};

export default withAuthenticator(inject('user')(observer(Admin)));
