import { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { dashboardVariants } from '../../variants/dashboard.variants';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <h1>Dashboard Page</h1>
        </main>
      </Layout>
    </>
  );
};

export default Dashboard;
