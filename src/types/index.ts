export enum UserRole {
  ADMIN = "ADMIN",
  DIREKSI = "DIREKSI",
}

export interface User {
  [x: string]: string;
  avatar: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
