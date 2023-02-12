import EventContent from "@/components/eventDetail/EventContent";
import EventLogistics from "@/components/eventDetail/EventLogistics";
import EventSummary from "@/components/eventDetail/EventSummary";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getDynamicPaths, getEventById } from "@/helpers/api-util";
// import { useRouter } from "next/router";
import { Fragment } from "react";

const EventDetailPage = (props) => {
  const { event } = props;
  // const router = useRouter();
  // const { eventId } = router.query;
  // const event = getEventById(eventId);
  if (!event)
    return (
      <div className="center">
        <p>No event found!</p>
      </div>
    );

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const paths = await getDynamicPaths();
  return {
    paths,
    fallback: "blocking",
  };
}
