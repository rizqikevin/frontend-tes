export enum UserRole {
  ADMIN = 1,
  DIREKSI = 2,
}

export interface User {
  avatar: string;
  id: string;
  name: string;
  username: string;
  role: UserRole;
}
