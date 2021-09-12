import Amplify from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../../awsconfig";

Amplify.configure(awsconfig);

const Playground: React.FC = () => {
  return (
    <main>
      <AmplifyAuthenticator>
        <div>loggedIn!!</div>
      </AmplifyAuthenticator>
      You can&apos;t access this page
    </main>
  );
};

export default Playground;
