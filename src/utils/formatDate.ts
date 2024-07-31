import { Timestamp } from "firebase/firestore";

export function formatDate(timestamp: Timestamp) {
  const date = timestamp?.toDate();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return date?.toLocaleDateString("en-US", options);
}

export function getTime(timestamp: Timestamp) {
  const date = timestamp?.toDate();
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return date?.toLocaleTimeString("en-US", options);
}
