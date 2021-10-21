import Head from 'next/head'
import AdminC from '@containers/Admin';
import { NextPage } from 'next';

const Admin: NextPage = () => {
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
