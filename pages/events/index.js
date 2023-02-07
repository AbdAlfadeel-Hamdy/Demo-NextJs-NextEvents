import EventList from "@/components/events/EventList";
import { getAllEvents } from "@/data";

const AllEventsPage = () => {
  const events = getAllEvents();
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
