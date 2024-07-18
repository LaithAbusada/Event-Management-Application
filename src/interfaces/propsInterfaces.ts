import { Event } from "@/interfaces/EventInterface";
import { Attendee } from "./UserInterface";

export interface AlertProps {
  id: string;
}

export interface EditEventProps {
  event: Event;
}

export interface EventProps {
  event: Event;
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
  event?: Event | null;
}

export interface RegisterFormProps {
  id: string;
}

export interface ButtonProps {
  loading: boolean;
  message: string;
}

export interface EventListProps {
  events: Event[];
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
