import { useRouter } from "next/router";
import EventList from "@/components/events/EventList";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "@/components/events/ResultsTitle";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Button from "@/components/ui/Button";
import useSWR from "swr";
import Head from "next/head";

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedevents] = useState();
  const router = useRouter();
  const date = router.query.slug;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-prerendering-b21a1-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    const events = [];
    for (const key in data) {
      const event = {
        id: key,
        ...data[key],
      };
      events.push(event);
    }

    setLoadedevents(events);
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );
  if (!loadedEvents || loadedEvents.length === 0)
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );

  const year = +date[0];
  const month = +date[1];
  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1 ||
    error
  )
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your date!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || !filteredEvents.length)
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={new Date(year, month)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const date = context.params.slug;
//   const year = +date[0];
//   const month = +date[1];
//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month > 12 ||
//     month < 1
//   )
//     return {
//       props: {
//         hasError: true,
//       },
//     };

//   const filteredEvents = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       filteredEvents,
//       year,
//       month,
//     },
//   };
// }

export default FilteredEventsPage;
