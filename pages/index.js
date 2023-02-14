import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextEvents</title>
        <meta name="description" content="Find a lot of great events..." />
      </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
