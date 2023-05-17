import { formatDistance } from "date-fns";

const formattedDate = (time: Date) => {
  const date = new Date(time);

  const currentDate = new Date();

  return formatDistance(date, currentDate)
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("about", " ")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d")
    .replace("less than", " ");
};

export default formattedDate;
