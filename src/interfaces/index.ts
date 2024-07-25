import { Timestamp } from "firebase/firestore";
// Event Interfaces
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

export interface EventData {
  id: string;
  location: string;
  name: string;
  date: string;
  image: string;
  description: string;
  time: string;
}
export interface editEvent {
  id: string;
  location: string;
  name: string;
  date: Date;
  image: string;
  description: string;
}
export interface EventState {
  data: Event[] | null;
}

export interface RegisterFormValues {
  name: string;
  gender: string;
  phone: string;
  email: string;
}

// component props Interfaces

export interface AlertProps {
  id: string;
}

export interface EditEventProps {
  event: Event;
}

export interface EventProps {
  event: EventData;
}

export interface RegisterFormProps {
  id: string;
}
export interface ManageUsersProps {
  attendees: Attendee[];
  name: string;
}

export interface AttendeeListProps {
  attendees: Attendee[];
}

export interface EventFormProps {
  event?: EventData | null;
  withEdit: boolean;
}

export interface RegisterFormProps {
  id: string;
}

export interface ButtonProps {
  loading: boolean;
  message: string;
}

export interface EventListProps {
  events: EventData[];
  withEdit: boolean;
}

export interface FormFieldProps {
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  rows?: number;
  as?: string;
  label?: string;
  required?: boolean;
  FormChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InfiniteScrollerProps {
  events: EventData[];
  edit: boolean;
  limit: number;
}

// user Interfaces

export interface User {
  email: string;
  name: string;
  nickname: string;
  sid: string; // session id
}

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Attendee {
  eventID: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  id: string;
}
