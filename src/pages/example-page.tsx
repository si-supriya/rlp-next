import React from 'react';
import { Layout } from '@/components/Layout';
import Head from 'next/head';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Ride Like a Pro | Home</title>
        <meta name="description" content="Experience the thrill of cycling like a professional" />
      </Head>

      <Layout
        headerProps={{
          navItems: [
            { title: 'Home', href: '/', active: true },
            { title: 'What It Means Riding Like A Pro', href: '/about-us' },
            { title: 'Events', href: '/events' },
            { title: 'News', href: '/news' },
            { title: 'Gallery', href: '/gallery' },
            { title: 'Be The Next Stage', href: '/contact-us' },
          ],
        }}
        variant="fullWidth"
      >
        <div className="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
                Ride Like a Pro
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Experience the passion, dedication, and excellence of professional cycling
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/events"
                  className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Events
                </a>
                <a
                  href="/about-us"
                  className="px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Elite Training</h3>
                <p className="text-neutral-600">
                  Train with professional techniques and methods used by world-class cyclists
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Community</h3>
                <p className="text-neutral-600">
                  Join a passionate community of cyclists who share your love for the sport
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Excellence</h3>
                <p className="text-neutral-600">
                  Achieve your cycling goals with guidance from experienced professionals
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;

