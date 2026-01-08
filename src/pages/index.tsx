import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { EventsStripWidget, EventStripItem } from '@/widgets/EventsStripWidget';
import { EventMapWidget } from '@/widgets/EventMapWidget';
import { LatestNewsWidget } from '@/widgets/LatestNewsWidget';
import { LatestGalleryWidget } from '@/widgets/LatestGalleryWidget';
import { AboutWidget } from '@/widgets/AboutWidget';
import { ViewMoreDivider } from '@/components';
import { homeVariants } from '@/variants/index.variants';
import rawEvents from '@/data/events.json';
import { mapEventsJsonToStripItems, type EventJsonItem } from '@/lib/events.mapper';

type HomePageProps = {
  events: EventStripItem[];
};

const Home: NextPage<HomePageProps> = ({ events }) => {
  const styles = homeVariants({ theme: 'light' });
  return (
    <>
      <Head>
        <title>Ride Like a Pro | Home</title>
        <meta
          name="description"
          content="Experience the passion, dedication, and excellence of professional cycling."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout activePage="/">
        <div className={styles.container()}>
         

          <main className={styles.content()}>
            <section className="mt-8">
              <div className="w-full">
                <div className="container mx-auto px-[15px] sm:px-0">
                  <AboutWidget />
                </div>
              </div>
            </section>

            <section className="mt-14 events-strip-widget">
              <div className="w-full">
                <div className="container mx-auto px-[15px] sm:px-0">
                  <EventsStripWidget items={events} />
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="w-full">
                <div className="container mx-auto px-[15px] sm:px-0">
                  <LatestNewsWidget count={4} />
                  <ViewMoreDivider href="/news" />
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="w-full">
                <div className="container mx-auto px-[15px] sm:px-0">
                  <LatestGalleryWidget />
                  <ViewMoreDivider href="/gallery" />
                </div>
              </div>
            </section>

            <section className="mt-16 py-20 bg-gradient-to-br from-[#3a0f25] via-[#5a1633] to-[#b91c3d]">
              <div className="w-full">
                <div className="container mx-auto px-[15px] sm:px-0">
                  <EventMapWidget />
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const events = mapEventsJsonToStripItems(rawEvents as unknown as EventJsonItem[]);
  return {
    props: {
      events,
    },
  };
};
