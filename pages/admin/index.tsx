import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const Admin: React.FC = () => {
  return (
    <div>
      Admin Page
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(Admin);
