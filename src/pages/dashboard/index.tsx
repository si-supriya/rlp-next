import { NextPage } from 'next';
import Head from 'next/head';
import { dashboardVariants } from '../../variants/dashboard.variants';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Dashboard Page</h1>
      </main>
    </>
  );
};

export default Dashboard;
