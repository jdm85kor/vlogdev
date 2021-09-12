import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth, Hub } from 'aws-amplify';

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

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div css={css`
      margin: 0 auto;
      max-width: 1920px;
      `}>
        <div css={css`
        margin: 50px;
        `}>
          Admin Page
          { user &&
            <p>
              provider name: {JSON.parse((user as any).attributes.identities)[0].providerName}<br />
              email: {(user as any).attributes.email}
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
