import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { colors } from '@styles/theme';
import { apiCall } from '@utils/apis';

interface Props {
  user: any;
};

const Request = ({ user }: Props) => {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequest = async (Authorization: string) => {
    try {
      const res = await apiCall({
        method: 'get',
        url: '/vlogdev/request',
        headers: { Authorization },
      });
      setRequests(res.data.items);;
    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequest((user as any).signInUserSession.idToken.jwtToken);
  }, [user]);

  return (
    <>
      <h2>Requests</h2>
        { requests.length ?
          <ul css={css`
            padding: 0;
            list-style: none;
            border-top: solid 1px ${colors.hermes}
          `}>
            {
              requests.map(d => (
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
    </>
  );  
};

export default Request;
