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
}

export interface AttendeesData {
  attendees: Attendee[];
}

export interface RegisterFormProps {
  id: string;
}
