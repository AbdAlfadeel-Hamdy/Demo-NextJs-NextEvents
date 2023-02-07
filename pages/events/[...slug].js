import { getFilteredEvents } from "@/data";
import { useRouter } from "next/router";
import EventList from "@/components/events/EventList";
import { Fragment } from "react";
import ResultsTitle from "@/components/events/ResultsTitle";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Button from "@/components/ui/Button";

const FilteredEventsPage = () => {
  const router = useRouter();
  const date = router.query.slug;
  if (!date) return <p className="center">Loading...</p>;
  const year = +date[0];
  const month = +date[1];
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1
  )
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your date!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  const filteredEvents = getFilteredEvents({ year, month });
  if (!filteredEvents || !filteredEvents.length)
    return (
      <Fragment>
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
      <ResultsTitle date={new Date(year, month)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
