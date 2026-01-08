import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { Banner } from '@/components/Banner';
import { AboutWidget } from '@/widgets/AboutWidget';

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us | Ride Like a Pro</title>
        <meta
          name="description"
          content="Learn what it means to Ride Like a Pro."
        />
      </Head>

      <Layout activePage="/about-us">
        <Banner
          title="ABOUT"
          label="Giro d'Italia Ride Like A Pro"
          breadcrumb={[{ label: 'HOME', href: '/' }, { label: 'ABOUT' }]}
          backgroundImage="/images/common/banner.webp"
          backgroundAlt="About"
          height="lg"
        />

        <div className="container mx-auto py-10">
          <AboutWidget />
        </div>
      </Layout>
    </>
  );
};

export default AboutUsPage;


