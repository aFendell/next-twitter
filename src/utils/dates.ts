import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatTimeSince = (createdAt: Date) => {
  return dayjs(createdAt).fromNow();
};
