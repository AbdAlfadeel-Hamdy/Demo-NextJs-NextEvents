import Link from "next/link";

const EventItem = ({ title, image, date, location, id }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedLocation = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li>
      <img src={"/" + image} alt={title} />
      <div>
        <h2>{title}</h2>
        <div>
          <time>{formattedDate}</time>
        </div>
        <div>
          <address>{formattedLocation}</address>
        </div>
      </div>
      <div>
        <Link href={exploreLink}>Explore Event</Link>
      </div>
    </li>
  );
};

export default EventItem;
