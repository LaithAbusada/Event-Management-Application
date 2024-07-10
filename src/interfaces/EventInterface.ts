import { Timestamp } from "firebase/firestore";

export interface MyFormValues {
  name: string;
  location: string;
  description: string;
}

export interface Event {
  id: string;
  location: string;
  name: string;
  date: Timestamp;
  image: string;
  description: string;
}

export interface EventState {
  data: Event[] | null;
}
