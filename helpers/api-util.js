export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-prerendering-b21a1-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    const event = {
      id: key,
      ...data[key],
    };
    events.push(event);
  }
  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (eventId) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
};

export const getDynamicPaths = async () => {
  const allEvents = await getFeaturedEvents();
  return allEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
};
