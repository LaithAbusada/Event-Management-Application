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
