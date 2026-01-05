import React from 'react';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { Banner } from '@/components/Banner';
import { contactUsVariants } from '@/variants/contact-us.variants';

const ContactUsPage: React.FC = () => {
  const styles = contactUsVariants();

  return (
    <>
      <Head>
        <title>Contact Us | Ride Like a Pro</title>
        <meta
          name="description"
          content="Get in touch with Ride Like a Pro."
        />
      </Head>

      <Layout>
        <div className={styles.container()}>
          <Banner
            title="BE THE NEXT STAGE"
            label="Giro d'Italia Ride Like A Pro"
            breadcrumb={[
              { label: 'HOME', href: '/' },
              { label: 'BE THE NEXT STAGE' },
            ]}
            backgroundImage="/images/common/banner.webp"
            backgroundAlt="Be the next stage"
            height="lg"
          />
          <main className={styles.main()}>
            <div className={styles.formWrap()}>
              <form className={styles.form()} onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className={styles.label()} htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className={styles.textarea()}
                    placeholder="Enter your message"
                  />
                </div>

                <div className={styles.twoCol()}>
                  <div>
                    <label className={styles.label()} htmlFor="name">
                      Name*
                    </label>
                    <input
                      id="name"
                      className={styles.input()}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className={styles.label()} htmlFor="email">
                      Email*
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={styles.input()}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className={styles.buttonRow()}>
                  <button className={styles.button()} type="submit">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ContactUsPage;


