import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { EventsStripWidget, EventStripItem } from '@/widgets/EventsStripWidget';
import { LatestNewsWidget } from '@/widgets/LatestNewsWidget';
import { homeVariants } from '@/variants/index.variants';
import rawEvents from '@/data/events.json';
import { mapEventsJsonToStripItems, type EventJsonItem } from '@/lib/events.mapper';
import type { NewsCardProps } from '@/components/NewsCard';

type HomePageProps = {
  events: EventStripItem[];
  latestNews: NewsCardProps[];
};

const Home: NextPage<HomePageProps> = ({ events, latestNews }) => {
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

      <Layout>
        <div className={styles.container()}>
         

          <main className={styles.content()}>
            <section className="mt-14 events-strip-widget">
              <div className="w-full">
              <div className="container mx-auto">
                <EventsStripWidget items={events} />
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="w-full">
                <div className="container mx-auto">
                  <LatestNewsWidget items={latestNews} />
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
      latestNews: [
        {
          id: 1,
          title: 'What a success for Giro d’Italia Ride Like a Pro brazil 2025',
          image: '/images/common/deafult.webp',
          category: 'News',
          date: 'April 30, 2025',
          href: '/news',
        },
        {
          id: 2,
          title: 'Giro d’Italia Ride Like A Pro Brasil is Almost Here!!',
          image: '/images/common/deafult.webp',
          category: 'News',
          date: 'February 25, 2025',
          href: '/news',
        },
        {
          id: 3,
          title: 'The sculptor A. Wargenbrant will be a sponsor for the upcoming Giro d’Italia Ride Like a Pro-USA event',
          image: '/images/common/deafult.webp',
          category: 'News',
          date: 'December 06, 2023',
          href: '/news',
        },
      ],
    },
  };
};
