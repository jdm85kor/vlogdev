import Head from 'next/head'
import AdminC from '@containers/Admin';

const Admin: React.FC = () => {
  return (
    <div>
      <Head>
        <title>VLOG admin</title>
      </Head>
      <AdminC />
    </div>
  );
};

export default Admin;
